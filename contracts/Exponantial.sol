//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

// This is the main building block for smart contracts.
contract Exponantial {
    function getExponantial(int8 _x, int8 _n) public pure returns (int256) {
        return _x ** uint8(_n);
    }
}
