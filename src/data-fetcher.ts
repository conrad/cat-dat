import kittiesAPi from './api/cryptokitties'
import auctionsRepository from './data/repository/auctions'

const TOO_MANY_REQUESTS_ERROR: number = 429
const TIMEOUT_PERIOD_MS: number = 35000
const BATCH_SIZE: number = 19

const timeout = (time: number) => {
  return new Promise((resolve) => { 
      setTimeout(resolve, time)
  })
}

const DataFetcher = {
  getAllAuctions() {
    return this.getByBatches(
      kittiesAPi.getAuctions, 
      auctionsRepository.write, 
      100, 
      0, 
      BATCH_SIZE, 
      TIMEOUT_PERIOD_MS
    )
    .then(batch => {
      return batch
    })
    .catch(err => {
      if (err) {
        console.log('in getAllAuctions:', err)
      }
    })
  },

  getByBatches(
    requestCall,
    repoWriteCall,
    limit: number, 
    offset: number, 
    batchSize: number, 
    delay: number //, 
    // total: any|never[] = []
  ): Promise<Array<any>> {
    return this.getBatch(requestCall, limit, offset, batchSize)
    .then(batch => {
      const offsetIncrement: number = batch.length
      console.log('batch results:', batch.length)
      // const newTotal = total.concat(batch)
      
      // Write to storage with each batch.
      console.log('Writing to storage.')
      repoWriteCall(batch)
    
      // total = batch = null

      console.log(Date.now())
      if (offsetIncrement > 0) {
        return timeout(delay)
        .then(() => {
          console.log(Date.now())
          console.log('kicking off next batch...')
          return this.getByBatches(requestCall, repoWriteCall, limit, offset + offsetIncrement, batchSize) // , newTotal)
        })
      } else {
        return true // newTotal
      }
        
    })
    .catch(err => {
      if (err) {
        console.log('in getByBatches', err)
      }
    })
  },

  getBatch(
    requestCall, 
    limit: number, 
    offset: number, 
    requestsLeft: number, 
    batch: any|never[] = []
  ): Promise<Array<any>> {
    console.log('getting batch at offset', offset)
    let combined = []

    return requestCall(limit, offset)
    .then(data => {
      offset = offset + data.length
      combined = batch.concat(data)
      batch = data = null  // clear for garbage collection
      
      if (requestsLeft > 0) {
        return this.getBatch(requestCall, limit, offset, requestsLeft - 1, combined)
      } else {
        return combined
      }
    })
    .catch(err => {
      if (err) {
        console.log('in getBatch:', err.response)
        // if (err.response.status === TOO_MANY_REQUESTS_ERROR) {
          return timeout(TIMEOUT_PERIOD_MS)
          .then(() => {
            console.log('restarting batch...')
            return this.getBatch(requestCall, limit, offset, requestsLeft - 1, combined)
          })
        // }
      }
    })
  }

  // getKittiesByIds() {
  //   let allKitties: any|never = []

  //   this.getBatch(100, 0, 19)
  //     .then(kitties => {
  //       allKitties.push(kitties)
  //     })
  //     .catch((err) => {
  //       if (err) {
  //         console.log(err)
  //       }
  //     })
  // }
}

export default DataFetcher
