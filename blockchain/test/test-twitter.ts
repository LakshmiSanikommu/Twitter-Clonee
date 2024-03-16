import { ethers } from "hardhat"
import { assert, expect } from "chai"

describe("running Twitter tests ", async () => {
    let twitter: any
    beforeEach(async () => {
        const Twitter = await ethers.getContractFactory("Twitter")
        twitter = await Twitter.deploy()
    })

    it(" checks the perTweet cost", async () => {
        const perTweetCost = await twitter.perTweetCost()
        const expectedCost = ethers.parseEther("0.02")
        assert.equal(perTweetCost, expectedCost)
        expect(perTweetCost).to.equal(expectedCost)
    })
})
