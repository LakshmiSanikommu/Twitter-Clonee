// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./FundMe.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

error Twitter_NotOwner();

/**
 * @title integrating twitter clone with blockchain
 * @author lucky
 * @notice This a smaple testing project
 */

contract Twitter {
    using FundMe for uint256;
    address public immutable i_owner;
    uint256 public constant PER_TWEET = 10 * 10 ** 18; // per tweet 10 dollars
    AggregatorV3Interface internal s_priceFeed;
    address[] public s_funders;
    mapping(address => uint256) public s_addressToAmountFunded;
    string[] public s_msgStore;

    modifier onlyOwner() {
        if (msg.sender != i_owner) revert Twitter_NotOwner();
        _;
    }

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function tweet() public payable {
        require(msg.value > PER_TWEET, " U need to pay 0.02 ETH for Tweet");
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function storeMsg(string memory _input) public {
        s_msgStore.push(_input);
    }

    function retriveMessages() public view returns (string[] memory) {
        return s_msgStore;
    }

    function perTweetCost() public pure returns (uint256) {
        return PER_TWEET;
    }

    function withdraw() public payable onlyOwner {
        // payable(msg.sender).transfer(address(this).balance);
        (bool success, bytes memory data) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success, " withdraw failed ");
    }

    function fund() public payable {
        uint256 MIN_DONATE_AMT = 100 * 10**18;
        require(
            msg.value.getConversitionRate(s_priceFeed) > MIN_DONATE_AMT,
            " Minimum donation amount is 100 dollars"
        );
        s_funders.push(msg.sender);
        s_addressToAmountFunded[msg.sender] = msg.value;
    }
}
