// SPDX-License-Identifier: MIT
pragma solidity 0.8.8;
import "hardhat/console.sol";

contract Twitter {
    address public immutable i_owner;
    uint256 public constant PER_TWEET = 0.02 * 10 ** 8;

    constructor() {
        i_owner = msg.sender;
    }

    function tweet() public payable {
        require(msg.value > PER_TWEET, " U need to pay 0.02 ETH for Tweet");
    }

    function getOwner() public view returns(address) {
        return i_owner;
    }
}
