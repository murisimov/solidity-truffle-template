# Basic template for smart contracts development

---
### Environment setup

**NodeJS 8.x+ must be installed along with build-essential as a prerequisite.**
```
$ npm install
```

### Running test blockchain (other terminal)
```
$ npm run ganache-cli
```

### Running tests

```
$ npm run compile
$ npm run test
```

---
### Network
In this example Truffle uses "development" network, your local ganache-cli instance.
Usually it is used for testing purposes. Except for testing you also can use other
networks to deploy your contracts elsewhere, e.g. kovan, rinkeby, ropsten and main networks
(although you will need to have some additional configuration in order to do that).
More on Truffle networks:
http://truffleframework.com/docs/advanced/networks

---
### Migrations
Your contracts are being deployed to the network using files in `migrations` folder.
More on Truffle migrations:
http://truffleframework.com/docs/getting_started/migrations

---
### Tests
You can find tests in `tests` folder.
More on Truffle testing:
http://truffleframework.com/docs/getting_started/testing


---
### Interact with your contracts through MetaMask
- Run your `ganache-cli` instance, copy the private key of the first account
- Select "Localhost 8545" network at your MetaMask extension
- Select "Import account" in account management section at your MetaMask extension, paste the private key you copied at first step
- Do `npm run webpack` at project root at the terminal
- Open `index.html` at the browser
- Do `truffle migrate`, find the address of the deployed `Example.sol`, paste the address to the form
- Specify method names and arguments accordingly, click `call`
- Check out the way how `TruffleContract` uses injected MetaMask web3 instance at `script.js`
