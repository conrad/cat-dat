import DataFetcher from '../../src/data-fetcher'

console.log('running')
DataFetcher.getAllAuctions().then(val => {
  console.log('auction batch', val.length)
})
