var Web3 = require('web3');
var axios = require('axios');
var timebucket = require('timebucket');
var fs = require('fs');

var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/" + process.env.INFURA_ENDPOINT));
var contractAddress = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"

var fsCache = 'files/sales.json';
var salesData = {}
if (fs.existsSync(fsCache)) {
  fs.readFile(fsCache, 'utf8', function(err, content) {
    var sales = JSON.parse(content);
    salesData = buildSalesData(sales)
  });
} else {
  axios.get('http://api.etherscan.io/api?module=contract&action=getabi&address=' + contractAddress).then(function (data) {
    contractABI = JSON.parse(data.data.result)
    if (contractABI != '') {
      var KittyAuctionContract = new web3.eth.Contract(contractABI, contractAddress);
      var events = KittyAuctionContract.getPastEvents("AuctionSuccessful", {
        fromBlock: 4697049,
        toBlock: 4711060
      }).then(function (sales) {
        var json = JSON.stringify(sales);
        fs.writeFile('files/sales.json', json, 'utf8', function () {});
      });
      salesData = buildSalesData(sales)
    }
  });
}

function buildSalesData(sales) {
  var salesData = {};
  for (var i = 0; i < sales.length; i++) {
    salesData[sales[i]['returnValues']['tokenId']] = sales[i]['returnValues']
  }
}

// Reference code

var searchQuery = "gen:2"
axios.get("https://api.cryptokitties.co/auctions", {
  params: {
    offset: 2000,
    limit: 100,
    type: "sale",
    status: "closed",
    search: searchQuery,
    sorting: "cheap",
    orderBy: "currentPrice",
    parents: false
  }
}).then(function(response) {
  var auctions = response.data.auctions
  for (var i = 0; i < auctions.length; i++) {
    var saleStart = timebucket(parseInt(auctions[i].start_time))
    saleStart = saleStart.resize('h')
    var saleEnd = timebucket(parseInt(auctions[i].start_time))
    saleEnd = saleEnd.resize('d')
    console.log(saleEnd + "")
  }
});
