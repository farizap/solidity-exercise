//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

// This is the main building block for smart contracts.
contract StudentScore {
    function getStudentScore(int8 _score) public pure returns (string memory) {
        if (_score < 0 || _score > 100) {
            return "Nilai Invalid";
        }
        if (_score >= 80) {
            return "A";
        } else if (_score >= 65) {
            return "B";
        } else if (_score >= 50) {
            return "C";
        } else if (_score >= 35) {
            return "D";
        }
        return "E";
    }
}
