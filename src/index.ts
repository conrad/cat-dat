// import api from './api/cryptokitties'
import DataFetcher from './data-fetcher'

console.log('running')
// api.getAuctions(30, 0).then(val => {
//   console.log('auctions:', val.length)
// })
DataFetcher.getAllAuctions().then(val => {
  console.log('auction batch', val.length)
})
