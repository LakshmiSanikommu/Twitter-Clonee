import fs from "fs"
import {
    frontEndAbiFile,
    frontEndContractAddresses,
} from "../helper-hardhat.config"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const updateFrontEnd: DeployFunction = async (
    hre: HardhatRuntimeEnvironment,
) => {
    const { ethers, network, deployments } = hre
    const chainId = network.config.chainId || 31337

    if (process.env.UPDATE_FRONT_END) {
        console.log("updating front end contracts ")
        // const Twitter = await ethers.getContractFactory("Twitter")
        // fs.writeFileSync(frontEndAbiFile, Twitter.interface.formatJson())

        const twitter = await deployments.get("Twitter")
        const contractAddresses = JSON.parse(
            fs.readFileSync(frontEndContractAddresses, "utf8"),
        )
        console.log(twitter)
        contractAddresses[chainId] = twitter.address
        fs.writeFileSync(
            frontEndContractAddresses,
            JSON.stringify(contractAddresses),
        )
        fs.writeFileSync(frontEndAbiFile, JSON.stringify(twitter.abi))
        console.log(contractAddresses)
    }
}

export default updateFrontEnd
updateFrontEnd.tags = ["all", "updateFE"]
