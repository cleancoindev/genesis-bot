const dotenv = require('dotenv')
dotenv.config() // make sure this is called first

import {
  MessageAttachment,
  WebhookClient,
  WebhookMessageOptions,
} from 'discord.js'
import svg2img from 'svg2img'
import { Message } from './types'

const url = process.env.DISCORD_WEBHOOK_URL

if (!url) {
  throw new Error('Missing `DISCORD_WEBHOOK_URL`')
}

const webhookClient = new WebhookClient({ url: url })

function shortenAddress(address: string) {
  return address.slice(0, 6) + '…' + address.slice(-4)
}

// Discord doesn’t support data URI nor SVG files,
// so we need to convert the data URI SVG into a PNG buffer.
async function imageBuffer(svg: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    svg2img(svg, { width: 1000, height: 1000 }, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

export const sendDiscordMessage = async ({
  from,
  to,
  itemName,
  tokenId,
  image,
}: Message) => {
  const attachment = new MessageAttachment(
    await imageBuffer(image),
    'genesisitem.png',
  )

  const message: WebhookMessageOptions = {
    username: 'Genesis Bot',
    avatarURL:
      'https://genesisproject.xyz/genesis-icon.png',
    embeds: [
      {
        title: `${itemName} #${tokenId}`,
        url: `https://opensea.io/assets/${process.env.CONTRACT_ADDRESS}/${tokenId}`,
        color: 0x000000,
        description: `**${process.env.DISCORD_DESCRIPTION}**`,
        image: { url: 'attachment://genesisitem.png' },
        footer: {
          text: `by ${to}`,
        },
      },
    ],
    files: [attachment],
  }

  webhookClient.send(message).catch((error) => {
    console.error('Error while sending Discord message', error)
  })
}
