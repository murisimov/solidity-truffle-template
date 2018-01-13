"use strict";

const Reverter = require('./helpers/reverter');
const { asserts, reverts, equal } = require('./helpers/asserts');

const Example = artifacts.require('./Example');


contract('Example', function(accounts) {

    // And this thing is used to make snapshots of test network state
    // and return to the latest `snapshot` with `revert` method, to keep
    // things clear afterEach test.
    // It's not related to the Solidity revert!
    const reverter = new Reverter(web3);

    const OWNER = accounts[0];
    const NON_OWNER = accounts[1];

    let example;

    afterEach('revert', reverter.revert);  // Reset test network state to the latest `snapshot`

    before('setup', async () => {
        example = await Example.deployed();
        await reverter.snapshot();  // Create first `snapshot` before all tests
    });


    describe("Negative", () => {

        it("should NOT allow to call main function by non-owner", async () => {
            const result = await example.main.call(1, {from: NON_OWNER});
            assert.isFalse(result);
        });

        it("should NOT change state when calling main function by non-owner", async () => {
            const initialState = await example.state();
            equal(initialState, 0);

            await example.main(2, {from: NON_OWNER});
            const currentState = await example.state();
            equal(currentState, 0);
        });

        it("should NOT emit event about state changes when calling main function by non-owner, should emit error event instead", async () => {
            const tx = await example.main(3, {from: NON_OWNER});
            equal(tx.logs.length, 1);
            equal(tx.logs[0].address, example.address);
            equal(tx.logs[0].event, "Error");
            equal(tx.logs[0].args.msg, "You are not the owner");
        });

        it("should revert transaction when calling other function by contract owner", async () => {
            const initialState = await example.state();
            equal(initialState, 0);

            reverts(example.other(5, {from: OWNER}));
            const currentState = await example.state();
            equal(currentState, 0);
        });

    });


    describe("Positive", () => {

        it("should allow contract owner to call main function", async () => {
            const result = await example.main.call(1, {from: OWNER});
            assert.isTrue(result);
        });

        it("should change state when calling main function by contract owner", async () => {
            const initialState = await example.state();
            equal(initialState, 0);

            await example.main(2, {from: OWNER});
            const currentState = await example.state();
            equal(currentState, 2);
        });

        it("should emit event about state changes when calling main function by contract owner", async () => {
            const tx = await example.main(3, {from: OWNER});
            equal(tx.logs.length, 1);
            equal(tx.logs[0].address, example.address);
            equal(tx.logs[0].event, "StateChanged");
            equal(tx.logs[0].args.changedTo, 3);
        });

        it("should change state when calling other function by non-owner", async () => {
           const initialState = await example.state();
           equal(initialState, 0);

           await example.other(4, {from: NON_OWNER});
           const currentState = await example.state();
           equal(currentState, 4);
        });

        // TODO
        it("should emit event about state changes when calling other function by non-owner");

    });

});
