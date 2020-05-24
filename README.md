# xETH wallet for NFC

Example of simple Ethereum API server with endpoints, and a client NFC app.

* `/createWallet` create an ethereum wallet
* `/getBalance` checking wallet balance
* `/transaction` making a transaction

## Getting started with the server-side:

```sh
# Go to https://infura.io/ and get your ETH API key.
# It looks like this: 
# https://rinkeby.infura.io/v3/3fe7c90a4ec34aae900a7900d3fb48dc
# Put your key in 'src/config.json' under 'ethereumNetwork'
```

```sh
# Install dependencies
npm install
```

```sh
# Start developing
npm run dev
```

```sh
# Start production server
npm start
```

### Config

```js
{
  "port": 8080, // port to launch app to
  "bodyLimit": "1kb", // max size of request json object
  "ethereumNetwork": "" // Infura API key
}
```

## Endpoints

`/createWallet`

```sh
GET localhost:8080/createWallet
```

```js
# response
{
  "address": CREATED_WALLET,
  "privateKey": PRIVATE_KEY
}
```

`/getBalance/SOME_ETH_ADDRESS`

```sh
GET localhost:8080/getBalance/SOME_ETH_ADDRESS
```

```js
# response
{
  "ethAddress": SOME_ETH_ADDRESS,
  "balance": BALANCE
}
```

`/transaction`

```sh
POST to localhost:8080/transaction
BODY
{
	"privateKey": YOUR_PRIVATE_KEY,
	"amount": AMOUNT,
	"destination": DESTINATION_WALLET
}
```

```js
# response
{
  "txHash": TRANSACTION_HASH
}
```
## Getting started with the client:

As a client we are using NFC Tools Pro to program and write the wallet "app" on the NFC chip.

The "app" has 25 tasks and total 828 bytes.

```sh
# Download 'xETH_profile.json' and save it on your phone somewhere.

# This file is the main app file needed.
```

```sh
# Open NFC Tasks app and go to Settings/User variables and create next important five variables and fill in with your details:

- ADDRESS # put your public address on ETH here
- PRIVATEKEY # put private key here encrypted with password
- BALANCEURL # put balance endpoint here, eg.: https://<your-host>/getBalance/<your-eth-public-address>
- TRANSACTURL # put transaction endpoint here, eg.: https://<your-host>/transaction
- CREATEURL # put your create endpoin here, eg.: https://<your-host>/createWallet

# Now create next empty variables:

- AMOUNT # temp store for sending amount
- BALANCE # temp store for showing balance
- CHOICE # temp store for menu choice acions
- DESTINATION # temp store address that we want to send ETH
- TXHASH # temp store for showing 
- WALLET # temp store created address info 
```

### Installing the app and writing it to the NFC chip:

- Turn on NFC on your phone
- Open NFC Tools PRO 
- Go to TASKS/More options
- Tap 'Import task profiles' and select the downloaded xETH_profile.json file
- Go back to Task screen and you should see all commands listed
- Put your chip near your phone and tap 'Write/828 Bytes'
- Tip: If ou want to test the app without NFC chip, you can go to 'TASKS/More options', a the bottom of the list you have 'Execute your tasks profile' and select the imported profile. It will execute the app and it can be tested if it functions as specified, before writing to a chip.

## Video demo

[![xETH demo](https://img.youtube.com/vi/k4gaIoJ8-uo/0.jpg)](https://www.youtube.com/watch?v=k4gaIoJ8-uo)


## License

MIT
