const dotenv = require('dotenv')
dotenv.config() // make sure this is called first

if (!process.env.ITEM_ABBR) {
  throw new Error('Missing `ITEM_ABBR`')
}

if (!process.env.PROVIDER_URL) {
  throw new Error('Missing `PROVIDER_URL`')
}

if (!process.env.CONTRACT_ADDRESS) {
  throw new Error('Missing `CONTRACT_ADDRESS`')
}

if (!process.env.ITEM_NAME) {
  throw new Error('Missing `ITEM_NAME`')
}

if (!process.env.METHOD_NAMES) {
  throw new Error('Missing `METHOD_NAMES`')
}

import { BigNumber, Contract, Event, providers, utils } from 'ethers'
import fetch from 'node-fetch'
import erc20abi from './erc20abi.json'
import { sendDiscordMessage } from './discord'
import { Message } from './types'

const abi = require (`./${process.env.ITEM_ABBR}-abi.json`)

let rpc = new providers.JsonRpcProvider(process.env.PROVIDER_URL)
const contract = new Contract(process.env.CONTRACT_ADDRESS, abi, rpc)


async function main () {
  return new Promise(async (_, reject) => {
    try {
      let result

      console.log('🚀 Listening for sales...')
      result = await contract.totalSupply()
      console.log('Contract Total Supply:',result.toString())

      contract.on(
        'Transfer',
        async (
          from: string,
          to: string,
          tokenIdBN: BigNumber,
          eventLog: Event,
        ) => {
          const { data } = await eventLog.getTransaction();
          let methodId = data.substring(0,10);
          let contractInterface = new utils.Interface(abi);
          let methodName
          try {
            methodName = contractInterface.getFunction(methodId).name;
          }
          catch {
            methodName = "Method not in ABI - " + methodId;
          }
          console.log("Contract Transfer Event:", methodName)
          const tokenId = tokenIdBN.toString()
          const event = eventLog.toString()
          const itemName = process.env.ITEM_NAME;
	  const ensName =  await rpc.lookupAddress(to);

	  // if address doesn't have an ens name
	  if (ensName == null) {
		// use address but shorten it
		to = shortenAddress(to)
	  } else {
		// if it has an ens name, use it
		to = ensName
	  }

          let methods = process.env.METHOD_NAMES.split(',');
          for(let i=0; i < methods.length; i++) {
            let image
            if ((methods[i] == methodName)||(methods[i] == methodId)) {
              try {
                let base64Token = await contract.tokenURI(tokenIdBN);
                image = tokenURIToSVG(base64Token);
              }
              catch {
                throw new Error("No Image in TokenURI")
              }

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
          }
        },
      )
    } catch (err) {
      reject(err)
    }
  })
}

const tokenURIToSVG = (base64Token:string) => {
  let result;
  result = base64Token.split(",")[1];
  result = JSON.parse(atob(result));
  return atob(result.image.split(",")[1]);
}

;(async function run() {
  try {
    await main()
  } catch (e) {
    console.error('Error in main', e)
    console.log('Restarting...')
    run()
  }
})()

function shortenAddress(address: string) {
	  return address.slice(0, 6) + '...' + address.slice(-4)
}
