const dotenv = require('dotenv')
dotenv.config() // make sure this is called first

import { BigNumber, Contract, Event, providers, utils } from 'ethers'
import fetch from 'node-fetch'
import gmAbi from './gm_abi.json'
import gaAbi from './ga_abi.json'
import erc20abi from './erc20abi.json'
import { sendDiscordMessage } from './discord'
import { Message } from './types'

if (!process.env.PROVIDER_URL) {
  throw new Error('Missing `PROVIDER_URL`')
}

if (!process.env.GM_CONTRACT_ADDRESS) {
  throw new Error('Missing `GM_CONTRACT_ADDRESS`')
}

if (!process.env.GA_CONTRACT_ADDRESS) {
  throw new Error('Missing `GA_CONTRACT_ADDRESS`')
}

let rpc = new providers.JsonRpcProvider(process.env.PROVIDER_URL)
const gmContract = new Contract(process.env.GM_CONTRACT_ADDRESS, gmAbi, rpc)
const gaContract = new Contract(process.env.GA_CONTRACT_ADDRESS, gaAbi, rpc)

async function main () {
  return new Promise(async (_, reject) => {
    try {
      let result

      console.log('🚀 Listening for sales...')
      result = await gmContract.totalSupply()
      console.log('Genesis Mana Supply:',result.toString())
      result = await gaContract.totalSupply()
      console.log('Genesis Adventurer Supply:',result.toString())
      gmContract.on(
        'Transfer',
        async (
          from: string,
          to: string,
          tokenIdBN: BigNumber,
          eventLog: Event,
        ) => {

          const { data } = await eventLog.getTransaction();
          let methodId = data.substring(0,10);
          let gmInterface = new utils.Interface(gmAbi);
          let methodName
          try {
            methodName = gmInterface.getFunction(methodId).name;
          }
          catch {
            methodName = "unknown - " + methodId;
          }
          console.log("GM Transfer Event:", methodName)

          const tokenId = tokenIdBN.toString()
          const event = eventLog.toString()
          const itemName = "Genesis Mana"
          let image
          try {
            image = await gmContract.tokenURI(tokenIdBN);
            image = image.split(",")[1];
            image = JSON.parse(atob(image));
            image = atob(image.image.split(",")[1]);
          }
          catch {
            throw "No Image"
          }

          if ((methodName == "claimByLootId")||(methodName == "daoMint")) {
            const message: Message = {
              from,
              to,
              itemName,
              tokenId,
              image
            }
            console.log('Message: ', message);
            sendDiscordMessage(message);
          }
        },
      )
      gaContract.on(
        'Transfer',
        async (
          from: string,
          to: string,
          tokenIdBN: BigNumber,
          eventLog: Event,
        ) => {
          const { data } = await eventLog.getTransaction();
          let methodId = data.substring(0,10);
          let gaInterface = new utils.Interface(gaAbi);
          let methodName
          try {
            methodName = gaInterface.getFunction(methodId).name;
          }
          catch {
            methodName = "unknown - " + methodId;
          }
          console.log("GA Transfer Event:", methodName)
          const tokenId = tokenIdBN.toString()
          const event = eventLog.toString()
          const itemName = "Genesis Adventurer"
          let image
          try {
            image = await gaContract.tokenURI(tokenIdBN);
            image = image.split(",")[1];
            image = JSON.parse(atob(image));
            image = atob(image.image.split(",")[1]);
          }
          catch {
            throw "No Image"
          }

          if ((methodName == "resurrectGA")||(methodName == "execTransaction")) {
            const message: Message = {
              from,
              to,
              itemName,
              tokenId,
              image
            }
            console.log('Message: ', message);
            sendDiscordMessage(message);
          }
        },
      )
    } catch (err) {
      reject(err)
    }
  })
}
//
// const getEthUsd = async (eth: number) => {
//   const response = await fetch('https://api.coinbase.com/v2/prices/ETH-USD/buy')
//   const {
//     data: { amount },
//   }: CoinbaseData = await response.json()
//   return (eth * parseInt(amount)).toLocaleString()
// }
//
// const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
//
// // try to extract weth transfer from logs
// // example txs: https://etherscan.io/tx/0xd7efc5e28f495234815c79848e73265e92b5dbfed50e7127719cd19a9046fa08
// const getWethTransfer = async (
//   receipt: providers.TransactionReceipt,
// ): Promise<BigNumber> => {
//   try {
//     const { from, to, logs } = receipt
//     const iface = new utils.Interface(erc20abi)
//     let amount = BigNumber.from(0)
//     for (const log of logs) {
//       // only WETH support for now
//       if (log.address === WETH) {
//         const transaction = iface.parseLog(log)
//         const [f, t, value] = transaction.args
//
//         // only look for the seller -> buyer txs
//         // (ignore additional fee split transfers)
//         if (from == t) amount = value
//       }
//     }
//     // console.log(transfers)
//     return amount
//   } catch (error) {
//     return BigNumber.from(0)
//   }
// }

;(async function run() {
  try {
    await main()
  } catch (e) {
    console.error('Error in main', e)
    console.log('Restarting...')
    run()
  }
})()
