//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

// This is the main building block for smart contracts.
contract AltaBook {
    struct Book {
        string title;
        string author;
        uint year;
    }
    Book myBook;

    function setBuku(
        string memory _title,
        string memory _author,
        uint _year
    ) public {
        myBook = Book(_title, _author, _year);
    }

    function getBuku() public view returns (Book memory) {
        return myBook;
    }
}
