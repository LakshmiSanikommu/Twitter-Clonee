import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { network } from "hardhat"
import { networkConfig } from "../helper-hardhat.config.ts"

module.exports = async ({
    getNamedAccounts,
    deployments,
}: HardhatRuntimeEnvironment) => {
    const { deploy, log } = deployments
    const { lucky, kiran } = await getNamedAccounts()
    const chainId = network.config.chainId
    console.log(chainId)

    if (chainId) {
        const ethPriceFeedAddress = networkConfig[chainId]?.ethUsdPriceFeed
        console.log(ethPriceFeedAddress)
    }
}
