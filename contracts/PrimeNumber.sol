//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

// This is the main building block for smart contracts.
contract PrimeNumber {
    function isPrimeNumber(int16 _number) public pure returns (bool) {
        if (_number < 2) {
            return false;
        }
        int16 j = 2;
        while (j < _number) {
            if (_number % j == 0) {
                return false;
            }
            j++;
        }
        return true;
    }
}
