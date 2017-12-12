import * as fs from 'fs'
import * as path from 'path'

const FILEPATH: string = '../../../../store/'

const AuctionsRepository = {
  write(data: Array<any>): boolean {
    try {
      const date: string = (new Date()).toISOString().substring(0, 10)
      const filename: string = 'auctions_' + date + '.txt'
      for (let i = 0; i < data.length; i++) {
        let dataString: string = '[ '
        for (let key in data) {
          dataString += key + ': ' + JSON.stringify(data[key]) + '\n'  
        }
        fs.appendFileSync(path.join(__dirname, FILEPATH, filename), dataString)
      }
    } catch (err) {
      console.log(err)
      return false
    }
    return true
  },

  read() {
    return fs.readFileSync(path.join(__dirname, FILEPATH), 'utf8')
  }
}

export default AuctionsRepository 