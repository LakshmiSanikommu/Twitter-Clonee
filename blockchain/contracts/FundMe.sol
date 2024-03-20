// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FundMe {
    AggregatorV3Interface internal dataFeed;
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;
    uint256 public constant DONATE_AMT = 100 * 10 ** 18;

    constructor() {
        dataFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
    }

    function getPrice() public view returns (uint256) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int answer,  /* 319077267081 */
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        // return price in 18 decimals
        return uint256(answer * 10 ** 10);
    }

    function getConversitionRate(
        uint256 ethAmount
    ) public view returns (uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUSD = (ethAmount * ethPrice) / 10e18;
        return ethAmountInUSD;
    }

    function fund() public payable {
        require(msg.value > getConversitionRate(DONATE_AMT));
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }
}
