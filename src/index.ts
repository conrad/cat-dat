import kittiesApi from './api/cryptokitties'

console.log('running')
kittiesApi.getKitties(100, 0)
  .then(kitties => {
    console.log('kitties', kitties)
  })
  .catch((err) => {
    if (err) {
      console.log(err)
    }
  })
  
