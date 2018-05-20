# Ethereum wallet API example

A basic example of an ethereum wallet API with endpoints:

* `/createWallet` create an ethereum wallet
* `/getBalance` checking wallet balance
* `/transaction` making a transaction

## Getting Started

```sh
# clone repo
git clone git@github.com:wingleung/ethereum-wallet-api-example.git
cd ethereum-wallet-api-example
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
# Start server
npm start
```

## Config

```js
{
  "port": 8080, // port to launch app to
  "bodyLimit": "1kb", // max size of request json object
  "ethereumNetwork": "" // url of your ethereum network
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

## License

MIT
