//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

// This is the main building block for smart contracts.
contract Vehicle {
    string name;
    string withEngine;

    constructor() {
        name = "Vehicle";
        withEngine = "don't have Engine";
    }

    function identityMyself() public view returns (string memory) {
        return string.concat("I'm ", name, ", I ", withEngine);
    }
}

contract Car is Vehicle {
    constructor() {
        name = "Car";
        withEngine = "have Engine";
    }
}

contract Bike is Vehicle {
    constructor() {
        name = "Bike";
    }
}
