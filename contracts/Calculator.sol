//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

// This is the main building block for smart contracts.
contract Calculator {
    function add(int256 _a, int256 _b) public pure returns (int256) {
        return _a + _b;
    }

    function subtract(int256 _a, int256 _b) public pure returns (int256) {
        return _a - _b;
    }

    function multiply(int256 _a, int256 _b) public pure returns (int256) {
        return _a * _b;
    }

    function divide(int256 _a, int256 _b) public pure returns (int256) {
        return _a / _b;
    }
}
