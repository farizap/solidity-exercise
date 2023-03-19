//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

// This is the main building block for smart contracts.
contract FundManager is Ownable {
    using SafeMath for uint256;
    using ECDSA for bytes32;

    enum Status {
        Running,
        Completed
    }

    struct Funding {
        string name;
        address recipient;
        uint256 amount;
        uint256 amountTarget;
        uint256 unlockedAt;
        Status status;
    }

    mapping(uint256 => Funding) public fundings;
    mapping(address => uint256) public userDonations;
    mapping(address => uint256) private signatureNonce;

    event FundingCreated(
        uint256 indexed fundingID,
        string name,
        uint256 amountTarget
    );
    event FundingDonated(uint256 indexed fundingID, string name, uint256 value);
    event FundingCompleted(
        uint256 indexed fundingID,
        string name,
        uint256 amount
    );

    // Check if funding exist
    modifier isExist(uint256 _fundingID) {
        require(fundings[_fundingID].amountTarget != 0, "Funding not exist");
        _;
    }

    // Check if funding not exist
    modifier isNotExist(uint256 _fundingID) {
        require(
            fundings[_fundingID].amountTarget == 0,
            "Funding already exist"
        );
        _;
    }

    // Check if funding need access
    modifier isStillRunning(uint256 _fundingID) {
        require(
            fundings[_fundingID].status == Status.Running,
            "Funding is closed"
        );
        _;
    }

    function createFunding(
        uint256 _fundingID,
        string memory _name,
        address _recipient,
        uint256 _amountTarget,
        uint256 _duration
    ) public onlyOwner isNotExist(_fundingID) {
        require(_amountTarget > 0, "Amount <= 0");
        require(_duration > 30, "Duration <= 30");
        Funding storage funding = fundings[_fundingID];
        funding.name = _name;
        funding.recipient = _recipient;
        funding.amount = 0;
        funding.amountTarget = _amountTarget;
        funding.unlockedAt = block.timestamp.add(_duration);

        emit FundingCreated(_fundingID, _name, _amountTarget);
    }

    function getFunding(
        uint256 _fundingID
    ) public view returns (Funding memory) {
        return fundings[_fundingID];
    }

    function donate(
        uint256 _fundingID
    ) public payable isExist(_fundingID) isStillRunning(_fundingID) {
        require(msg.value > 0, "Amount cannot be empty");
        Funding storage funding = fundings[_fundingID];

        funding.amount = funding.amount.add(msg.value);

        userDonations[msg.sender] = userDonations[msg.sender].add(msg.value);
        emit FundingDonated(_fundingID, funding.name, msg.value);
    }

    function completeFunding(
        uint256 _fundingID
    ) public isExist(_fundingID) isStillRunning(_fundingID) {
        Funding storage funding = fundings[_fundingID];

        // validate if caller is recipient or owner
        require(
            msg.sender == funding.recipient || msg.sender == owner(),
            "Forbidden to complete funding"
        );

        // Validate if funding amount surpassed target / unlockedAt
        require(
            funding.amount >= funding.amountTarget ||
                block.timestamp > funding.unlockedAt,
            "Funding cannot be completed"
        );

        // Transfer
        address payable recipient = payable(funding.recipient);
        recipient.transfer(funding.amount);
        funding.status = Status.Completed;

        emit FundingCompleted(_fundingID, funding.name, funding.amount);
    }

    // Owner can complete funding using signature from recipient wallet
    function completeFundingByOwner(
        uint256 _fundingID,
        bytes memory _signature
    ) public onlyOwner isExist(_fundingID) isStillRunning(_fundingID) {
        Funding storage funding = fundings[_fundingID];

        bytes memory encoded = abi.encodePacked(
            funding.recipient,
            _fundingID,
            signatureNonce[funding.recipient]
        );
        bytes32 hash = keccak256(encoded).toEthSignedMessageHash();
        address addressCheck = hash.recover(_signature);
        
        require(
            addressCheck == funding.recipient,
            "Forbidden to complete funding"
        );

        // Transfer
        address payable recipient = payable(funding.recipient);
        recipient.transfer(funding.amount);
        funding.status = Status.Completed;
        signatureNonce[funding.recipient]++;

        emit FundingCompleted(_fundingID, funding.name, funding.amount);
    }

    function _verify(bytes32 data, bytes memory signature, address account) internal pure returns (bool) {
    return data
        .toEthSignedMessageHash()
        .recover(signature) == account;
    }

  
}
