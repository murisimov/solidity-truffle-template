'use strict';

const TruffleContract = require('truffle-contract');


window.addEventListener('load', function() {

    /**
     * Create TruffleContract instance based on contract abi and address,
     * make it use given provider and interact with the contract from the
     * given sender address by default.
     *
     * @param abi
     * @param provider
     * @param defaultSender
     * @param defaultGas
     */
    function loadContract(abi, provider, contractAddress, defaultSender, defaultGas=4500000) {
        const contract = TruffleContract({abi: abi});
        contract.setProvider(provider);
        contract.defaults({ from: defaultSender, gas: defaultGas });
        return contract.at(contractAddress);
    }

    // we assume that we're using MetaMask provider, otherwise there should be a check for injected web3 instance
    const sender = web3.eth.accounts[0];
    const provider = web3.currentProvider;

    // TODO: import all ABIs, use contracts by their names
    const abi = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_newState",
                    "type": "uint256"
                }
            ],
            "name": "other",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_newState",
                    "type": "uint256"
                }
            ],
            "name": "main",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "state",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "changedTo",
                    "type": "uint256"
                }
            ],
            "name": "StateChanged",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "msg",
                    "type": "string"
                }
            ],
            "name": "Error",
            "type": "event"
        }
    ];

    const app = new Vue({
        el: '#app',
        data: {
            address: '',
            //name: '',

            method: '',
            args: '',
        },
        methods: {
            callMethod: function () {
                if (this.address !== '') {
                    const contract = loadContract(abi, provider, this.address, sender);

                    const call = this.args === '' ?
                        contract[this.method]() :
                        contract[this.method](...this.args.split(', '));

                    call.then(console.log).catch(console.error);
                }
                else {
                    console.warn("specify contract address first");
                }
            }
        }
    })

});
