import { ethers } from "hardhat"
import { assert, expect } from "chai"
import { Twitter, Twitter__factory } from "../typechain-types"

describe("running Twitter tests ", async () => {
    let Twitter: Twitter__factory
    let twitter: Twitter

    beforeEach(async () => {
        Twitter = await ethers.getContractFactory("Twitter")
        twitter = await Twitter.deploy()
    })

    it(" checks the perTweet cost", async () => {
        const perTweetCost = await twitter.perTweetCost()
        const expectedCost = ethers.parseEther("0.02")
        assert.equal(perTweetCost, expectedCost)
        expect(perTweetCost).to.equal(expectedCost)
    })
})
