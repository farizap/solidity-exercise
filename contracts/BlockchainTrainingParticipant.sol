//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

// This is the main building block for smart contracts.
contract BlockchainTrainingParticipant {
    string[] participantNames;

    function addParticipantName(string memory _name) public {
        participantNames.push(_name);
    }

    function getParticipantName() public view returns (string[] memory) {
        return participantNames;
    }
}
