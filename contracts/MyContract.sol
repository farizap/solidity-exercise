//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

// This is the main building block for smart contracts.
contract MyContract {
    uint256[] result;

    function setArrayUnique(
        uint256[] memory _dataA,
        uint256[] memory _dataB
    ) public {
        uint256[] memory newArr;
        result = newArr;
        for (uint i; i < _dataA.length; i++) {
            uint256 a = _dataA[i];
            if (!include(_dataB, a)) {
                result.push(a);
            }
        }
    }

    function getArrayUnique() public view returns (uint256[] memory) {
        return result;
    }

    function include(
        uint256[] memory _arr,
        uint256 _val
    ) internal pure returns (bool) {
        for (uint i; i < _arr.length; i++) {
            if (_arr[i] == _val) {
                return true;
            }
        }
        return false;
    }
}
