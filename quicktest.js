var Web3 = require('web3');
var SimpleStorageContract= require ('./build/contracts/SimpleStorage.json')
const contract = require('truffle-contract')

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545')); //ganache

const simpleStorage = contract(SimpleStorageContract)

simpleStorage.setProvider(web3.currentProvider)
if (typeof simpleStorage.currentProvider.sendAsync !== "function") {
  simpleStorage.currentProvider.sendAsync = function() {
      return simpleStorage.currentProvider.send.apply(
        simpleStorage.currentProvider, arguments
      );
  };
}

    // Get accounts.
let coinbase; 
let simpleStorageInstance
    web3.eth.getAccounts()
.then((accounts)=>{
  coinbase = accounts[0]
  console.log(coinbase)
  //console.log(simpleStorage.deployed())
  return  simpleStorage.deployed()
})

  .then((instance) => {
          simpleStorageInstance = instance
  
          console.log("it worked")
          // Stores a given value, 5 by default.
          console.log(`first account at deploy stage is ${coinbase}`)
          return simpleStorageInstance.set(5, {from: coinbase})
        }).then((result) => {
          // Get the value from the contract to prove it worked.
          //console.log(result)
          return simpleStorageInstance.get.call()
        })
        .then((result)=>{
          const answer =  result.constructor.name
          console.log(answer)
        })
        //console.log(result.toNumber()))

    // web3.eth.getAccounts((error, accounts) => {
       
    //     simpleStorage.deployed().then((instance) => {
    //       simpleStorageInstance = instance
  
    //       // Stores a given value, 5 by default.
    //       console.log(`first account at deploy stage is ${accounts[0]}`)
    //       return simpleStorageInstance.set(5, {from: accounts[0]})
    //     }).then((result) => {
    //       // Get the value from the contract to prove it worked.
    //       return simpleStorageInstance.get.call(accounts[0])
    //     }).then((result) => {
    //       // Update state with the result.
    //       //return this.setState({ storageValue: result.c[0] })
    //       console.log(`the contract value is ${result.c[0]}`)
    //     })
    //   })

