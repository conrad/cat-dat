import * as path from 'path'
import * as request from 'request-promise'

const BASE_URL: string = 'https://api.cryptokitties.co/kitties'

const API = {
  getKitties(limit: number, offset: number) {
    let url: string = BASE_URL + '?limit=' + limit + '&offset=' + offset

    console.log('url', url)
    return request(url)
      .then((res) => {
        return JSON.parse(res)
      })
      .catch((err) => {
        return console.log(err) 
      })
  }
}

export default API