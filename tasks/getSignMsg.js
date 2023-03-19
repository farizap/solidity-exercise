const Web3 = require("web3")
const web3 = new Web3()

function signMessage() {
  const nonce = 0
  const recipient = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2"
  const fundingID = 2

  var hash = web3.utils
    .soliditySha3({ type: "string", value: recipient }, { type: "uint256", value: fundingID }, { type: "uint256", value: nonce })
    .toString("hex")
  console.log(hash)
}

signMessage()
