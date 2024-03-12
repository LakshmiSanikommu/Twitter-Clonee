// SPDX-License-Identifier: MIT
pragma solidity 0.8.8;
import "hardhat/console.sol";

contract Twitter {
    address public immutable i_owner;

    constructor() {
        i_owner = msg.sender;
    }
}
