pragma solidity 0.4.18;


contract Example {

    // NOTE: All of the content here is just to provide some test examples

    address owner;

    // Storage variable must be public if we want automatically have a getter for it
    uint256 public state;

    event StateChanged(uint256 changedTo);
    event Error(string msg);

    function Example() {
        owner = msg.sender;
    }

    // Function to test return value, state changes and event emission
    function main(uint256 _newState) public returns(bool) {
        if (msg.sender != owner) {
            Error("You are not the owner");
            return false;
        }
        state = _newState;
        StateChanged(_newState);
        return true;
    }

    // Function to test VM exception
    function other(uint256 _newState) public returns(bool) {
        state = _newState;
        StateChanged(_newState);
        // Require goes after state changes in order to demonstrate changes reversion
        require(msg.sender != owner);
        return true;
    }

}
