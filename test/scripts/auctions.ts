import DataFetcher from '../../src/data-fetcher'
import AuctionsRepository from '../../src/data/repository/auctions'

console.log('running')
const auctions = DataFetcher.getAllAuctions().then(val => {
  console.log('auction batch', val.length)
  return val
})

AuctionsRepository.write(auctions)