const dotenv = require('dotenv')
dotenv.config() // make sure this is called first

import { sendDiscordMessage } from './discord'

//if (!process.env.PROVIDER_URL) {
//  throw new Error('Missing `PROVIDER_URL`')
//}

//if (!process.env.CONTRACT_ADDRESS) {
//  throw new Error('Missing `CONTRACT_ADDRESS`')
//}


sendDiscordMessage({
  from: '0xd8C5b21d28101E482c68B54d0D5ED62D9C3B824d',
  to: '0xf480935955D38A332CF40c65adD722D46b922462',
  itemName: 'Genesis Mana',
  tokenId: '1579',
  image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IHdpZGh0OiAzNTBweH0gLml0YWxpYyB7Zm9udC1zdHlsZTogaXRhbGljfTwvc3R5bGU+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFGQUQ5NCIgLz48dGV4dCB4PSIxMCIgeT0iMjAiIGNsYXNzPSJiYXNlIj5PcmRlcjogU2tpbGw8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjQwIiBjbGFzcz0iYmFzZSI+RXF1aXBtZW50IFR5cGU6IEhlYWQgQXJtb3I8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjMyMCIgY2xhc3M9ImJhc2UgaXRhbGljIj5EaXN0aWxsZWQgZnJvbSBMb290IEJhZyAjMTQ1PC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIzNDAiIGNsYXNzPSJiYXNlIGl0YWxpYyI+RGVtb24gQ3Jvd24gb2YgU2tpbGw8L3RleHQ+PC9zdmc+',
})
sendDiscordMessage({
  from: '0xd8C5b21d28101E482c68B54d0D5ED62D9C3B824d',
  to: 'LootHero.eth',
  itemName: 'Genesis Mana',
  tokenId: '1579',
  image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IHdpZGh0OiAzNTBweH0gLml0YWxpYyB7Zm9udC1zdHlsZTogaXRhbGljfTwvc3R5bGU+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFGQUQ5NCIgLz48dGV4dCB4PSIxMCIgeT0iMjAiIGNsYXNzPSJiYXNlIj5PcmRlcjogU2tpbGw8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjQwIiBjbGFzcz0iYmFzZSI+RXF1aXBtZW50IFR5cGU6IEhlYWQgQXJtb3I8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjMyMCIgY2xhc3M9ImJhc2UgaXRhbGljIj5EaXN0aWxsZWQgZnJvbSBMb290IEJhZyAjMTQ1PC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIzNDAiIGNsYXNzPSJiYXNlIGl0YWxpYyI+RGVtb24gQ3Jvd24gb2YgU2tpbGw8L3RleHQ+PC9zdmc+',
})

// from, to, itemName, tokenId, image

