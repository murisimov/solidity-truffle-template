"use strict";

const Example = artifacts.require('./Example');


/**
 * @param deployer object : The thing that can deploy contracts
 * @param network  string : Network name, e.g. "live" or "development"
 * @param accounts  array : Array with accounts addresses
 */
module.exports = async (deployer, network, accounts)=> {
    await deployer.deploy(Example);

    const example = await Example.deployed();
    console.log(`Example contract address: ${Example.address}`);

    const state = await example.state.call();
    console.log(`Initial Example contract state: ${state}`);

    console.log("\nUsing following accounts:");
    console.log(accounts);
};
