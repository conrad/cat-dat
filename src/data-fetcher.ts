import kittiesAPi from './api/cryptokitties'

const timeout = (time: number) => {
  return new Promise((resolve) => { 
      setTimeout(resolve, time)
  })
}

const DataFetcher = {
  getAllAuctions() {
    return this.getByBatches(kittiesAPi.getAuctions, 100, 0, 19, 35000)
    .then(batch => {
      return batch
    })
    .catch(err => {
      if (err) {
        console.log(err)
      }
    })
  },

  getByBatches(requestCall, limit: number, offset: number, batchSize: number, delay: number, total: any|never[] = []): Promise<Array<any>> {
    return this.getBatch(requestCall, limit, offset, batchSize)
    .then(batch => {
      const offsetIncrement: number = batch.length
      console.log('batch results:', batch.length)
      const newTotal = total.concat(batch)
      total = batch = null

      console.log(Date.now())
      if (offsetIncrement > 0) {
        return timeout(delay)
        .then(() => {
          console.log('kicking off next batch...')
          console.log(Date.now())
          return this.getByBatches(requestCall, limit, offset + offsetIncrement, batchSize, newTotal)
        })
      } else {
        return newTotal
      }
        
    })
    .catch(err => {
      if (err) {
        console.log(err)
      }
    })
  },

  getBatch(requestCall, limit: number, offset: number, requestsLeft: number, batch: any|never[] = []): Promise<Array<any>> {
    console.log('getting batch at offset', offset)    
    return requestCall(limit, offset)
    .then(data => {
      const offsetIncrement: number = data.length
      console.log('data returned from ' + requestCall.name + ':', data.length)
      let combined = batch.concat(data)
      batch = data = null  // clear for garbage collection
      
      if (requestsLeft > 0) {
        return this.getBatch(requestCall, limit, offset + offsetIncrement, requestsLeft - 1, combined)
      } else {
        return combined
      }
    })
    .catch(err => {
      if (err) {
        console.log(err)
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
