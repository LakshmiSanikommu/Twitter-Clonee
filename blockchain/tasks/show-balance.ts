import { task } from "hardhat/config"

task("show-balance", "show current user balance ", async (_, { ethers }) => {
    const signer = await ethers.getSigner()
    const address = await signer.getAddress()
    const balance = await ethers.provider.getBalance(address)
    console.log(balance)
})

module.exports = {}
