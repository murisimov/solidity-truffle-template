"use strict";


const assert = require('chai').assert;


function equal(actual, expected) {
   assert.equal(actual.valueOf(), expected.valueOf());
}

function reverts(promise) {
    return promise.then(
        assert.fail,
        (error) => {
            assert.include(error.message, "revert");
            return true;
        }
    );
}

function asserts(promise) {
    return promise.then(
        assert.fail,
        (error) => {
            assert.include(error.message, "assert");
            return true;
        }
    );
}

module.exports = {
    equal: equal,
    asserts: asserts,
    reverts: reverts
}
