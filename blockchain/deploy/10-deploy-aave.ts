import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { ethers, network } from "hardhat"
import { networkConfig } from "../helper-hardhat.config"

const deployAave: DeployFunction = async ({
    deployments,
    getNamedAccounts,
}: HardhatRuntimeEnvironment) => {
    console.log(`Deploying deployAave `)
    const AMOUNT = ethers.parseEther("0.1").toString()
    const { lucky } = await getNamedAccounts()
    const chainId = network.config.chainId
    console.log(lucky)
    if (!chainId) throw new Error(" Could not able to get the chainId")
    const signer = await ethers.getSigner(lucky)
    const IWeth = await ethers.getContractAt(
        "IWeth",
        networkConfig[chainId].wethAddress,
        signer,
    )
    const txResponse = await IWeth.deposit({ value: AMOUNT })
    await txResponse.wait(1)
    const balance = await IWeth.balanceOf(lucky)
    console.log("Balance of lucky wallet : " + balance)
}

export default deployAave
deployAave.tags = ["deployAave"]

// https://staging.aave.com/
