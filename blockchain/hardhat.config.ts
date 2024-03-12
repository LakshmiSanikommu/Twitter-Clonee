import { HardhatUserConfig, task } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"

task(
    "accounts",
    "prints the list of the accounts ",
    async (taskargs, hre) => {
        const accounts = await hre.ethers.getSigners()
        accounts.forEach((account) => console.log(account.address))
    },
)

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.8.2" }],
    },
}

export default config
