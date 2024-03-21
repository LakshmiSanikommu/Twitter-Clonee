// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./FundMe.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

error Twitter_NotOwner();

contract Twitter {
    using FundMe for uint256;
    address public immutable i_owner;
    uint256 public constant PER_TWEET = 10 * 10 ** 18; // per tweet 10 dollars
    AggregatorV3Interface internal priceFeed;
    uint256 public constant DONATE_AMT = 100 * 10 ** 18;
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    string[] public msgStore;

    modifier onlyOwner() {
        if (msg.sender != i_owner) revert Twitter_NotOwner();
        _;
    }

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function tweet() public payable {
        require(msg.value > PER_TWEET, " U need to pay 0.02 ETH for Tweet");
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function storeMsg(string memory _input) public {
        msgStore.push(_input);
    }

    function retriveMessages() public view returns (string[] memory) {
        return msgStore;
    }

    function perTweetCost() public pure returns (uint256) {
        return PER_TWEET;
    }

    function withdraw() public onlyOwner {
        // const res = ether.tr
    }

    function fund() public payable {
        require(msg.value.getConversitionRate(priceFeed) > DONATE_AMT);
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }
}
