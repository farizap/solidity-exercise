//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

// This is the main building block for smart contracts.
contract AltaBank {
    mapping (address => uint256) public balanceOf;

    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor() {                 
        balanceOf[msg.sender] = 100;
    }

    modifier requireMinimumTransfer() {
        require(balanceOf[msg.sender] >= 10, "Too few tokens");
        _;
    }

    function transfer(address _to, uint256 _value) requireMinimumTransfer() public {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
    }
}
