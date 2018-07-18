pragma solidity ^0.4.18;

contract SimpleStorage {
    uint storedData;

    function set(uint x) public {
        storedData = x + 7;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}
