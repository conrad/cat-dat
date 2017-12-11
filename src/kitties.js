var Web3 = require('web3');
var axios = require('axios');

var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/" + process.env.INFURA_ENDPOINT));
var contractAddress = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"

axios.get('http://api.etherscan.io/api?module=contract&action=getabi&address=' + contractAddress).then(function (data) {
  contractABI = JSON.parse(data.data.result)
  if (contractABI != ''){
    var KittyAuctionContract = new web3.eth.Contract(contractABI, contractAddress );
    var events = KittyAuctionContract.getPastEvents("AuctionSuccessful", {fromBlock: 4711040, toBlock: 4711060}).then(function(sales) {
      console.log(sales);
    });
  }
});