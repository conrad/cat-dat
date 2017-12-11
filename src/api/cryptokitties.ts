import * as path from 'path'
import * as request from 'request-promise'
import axios from 'axios'
import * as timebucket from 'timebucket'

const BASE_URL: string = 'https://api.cryptokitties.co'
const KITTIES_PATH: string = '/kitties'
const AUCTIONS_PATH: string = '/auctions'

const API = {
  getKitties(limit: number, offset: number): Promise<any> {
    let url: string = BASE_URL + KITTIES_PATH + '?limit=' + limit + '&offset=' + offset

    return request(url)
    .then((res) => {
      return JSON.parse(res)
    })
    .catch((err) => {
      return console.log(err) 
    })
  },

  getAuctions(limit: number, offset: number): Promise<Array<any>> {
    let params: object = {
      offset,
      limit,
      type: "sale",
      status: "closed",
      sorting: "cheap",
      orderBy: "currentPrice",
      parents: false
    }

    return axios.get(BASE_URL + AUCTIONS_PATH, { params })
    .then(response => {
      return response.data.auctions
    })
    .catch(err => {
      if (err) {
        console.log(err)
      }
    })
  }
}

export default API


// for (var i = 0; i < auctions.length; i++) {
//   var saleStart = timebucket(parseInt(auctions[i].start_time))
//   saleStart = saleStart.resize('h')
//   var saleEnd = timebucket(parseInt(auctions[i].start_time))
//   saleEnd = saleEnd.resize('d')
//   console.log('here' + saleEnd + "")
// }