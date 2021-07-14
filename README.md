# appetizer
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Marketplace](https://vsmarketplacebadge.apphb.com/version/naruhiyo.apps.appetizer.svg)](https://marketplace.visualstudio.com/items/naruhiyo.apps.appetizer)
[![Lang: NodeJS](https://img.shields.io/badge/Lang-NodeJS_14.15.4-blue.svg)]()
[![Lang: TypeScript](https://img.shields.io/badge/Lang-TypeScript%204.1.2-blue.svg)]()

At lunchtime and dinnertime, *Appetizer* introduce you to a restaurant near the station you specify.

<img src="https://user-images.githubusercontent.com/28133383/125632081-7d469949-adce-4232-8266-cead89e580db.gif" width="80%">

## Getting Started
1. Modify the settings to suit your requirements.

| key | value | example
| -- | -- | -- |
| appetizerConf.general.prefecture | Prefecture where the restaurant is located | 豊洲 |
| appetizerConf.general.nearStation | Near station to the restaurant | 東京都 |
| appetizerConf.general.minPrice | Minimum price | 500 |
| appetizerConf.general.maxPrice | Maximum price | 1800 |

2. At 11:30/17:30, the following message will be displayed.

3. If you pressed "する!" button, you will be presented with up to four restaurants that match your needs.

## For Developers

<!-- TODO: .envのコピーとか書く？それかConfluenceにかいて消しちゃう？ -->
### Getting Started

* Copy `package.example.json` to `package.json`.
* Press `F5` to open a new window with your extension loaded.
* Run your command from the command palette by pressing (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and typing `Hello World`.


## Develop Environment
- Node.js v14.15.4
- npm v6.14.10

## Use API

- Hotpepper

    Food Pictures: 【画像提供：ホットペッパー グルメ】
    Powered by [ホットペッパー Webサービス](http://webservice.recruit.co.jp/)

- HeartRails Express

    Powered by [HeartRails Express](http://express.heartrails.com/)
