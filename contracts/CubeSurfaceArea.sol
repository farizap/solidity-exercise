//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;


// This is the main building block for smart contracts.
contract CubeSurfaceArea {
   function getCubeSurfaceArea(uint256 _s) public pure returns (uint256) {
        return 6 * _s * _s;
   }
}
