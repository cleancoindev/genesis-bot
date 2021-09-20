# Genesis Project Bot

Code & credit from [jpgboi](https://github.com/jpgboi/loot-nft-sales-bot).

This bot sends claiming and resurrecting data to [@genesisloot](https://twitter.com/genesisloot)'s [Discord server](https://discord.gg/YUYyPSuwfU).

<br />

## Usage

1. Create an `.env` file and set the following secrets:

```sh
GM_CONTRACT_ADDRESS= # Smart contract address (0x...)
GA_CONTRACT_ADDRESS= # Smart contract address (0x...)
PROVIDER_URL= # Provider URL
DISCORD_GM_WEBHOOK_URL= # Discord Webhook URL (Server Settings -> Integrations -> Webhooks)
DISCORD_GA_WEBHOOK_URL= # Discord Webhook URL (Server Settings -> Integrations -> Webhooks)
```

2. Install dependencies:

```
npm install
```

3. Run:

```
npm start
```

<br />

## How it works

This bot works by listening to the `Transfer` event on a smart contract.
This approach has the following advantages:

- provides a near real-time experience (events are emitted after a block is created)
- doesn't abuse the OpenSea API by periodically fetching it
- relying on a simple callback results in cleaner code

<br />

## Notes


# Known Errors

```
/workspace/node_modules/@ethersproject/logger/src.ts/index.ts:225
        const error: any = new Error(message);
                           ^
Error: could not detect network (event="noNetwork", code=NETWORK_ERROR, version=providers/5.4.5)
```
