//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

// This is the main building block for smart contracts.
contract Palindrome {
    function isPalindrome(string memory _keyword) public pure returns (bool) {
        bytes memory b = bytes(_keyword);

        if (b.length < 2) {
            return false;
        }

        bytes memory reversedKeyword = new bytes(b.length);
        for (uint i; i < b.length; i++) {
            reversedKeyword[b.length - 1 - i] = b[i];
        }

        return
            keccak256(abi.encodePacked(_keyword)) ==
            keccak256(abi.encodePacked(reversedKeyword));
    }
}
