import { HardhatUserConfig, task } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "dotenv/config"
import "@nomicfoundation/hardhat-verify"
import "./tasks/show-balance"
import "./tasks/block-number"
import "hardhat-gas-reporter"
import "solidity-coverage"
import "hardhat-deploy"

task("accounts", "prints the list of the accounts ", async (taskargs, hre) => {
    const accounts = await hre.ethers.getSigners()
    accounts.forEach((account) => console.log(account.address))
})

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const SEPOLIA_URL = process.env.SEPOLIA_URL
const MAINNET_URL = process.env.MAINNET_URL
const ETHER_SCAN_API = process.env.ETHER_SCAN_API
const COINMARKET_CAP_API = process.env.COINMARKET_CAP_API

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: SEPOLIA_URL,
            accounts: PRIVATE_KEY != undefined ? [PRIVATE_KEY] : [],
            chainId: 11155111,
        },
        mainnet: {
            chainId: 1,
            url: MAINNET_URL,
            accounts: PRIVATE_KEY != undefined ? [PRIVATE_KEY] : [],
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337, // same as hardhat node
            // accounts will be provided by harhat
        },
    },
    solidity: {
        compilers: [
            { version: "0.8.8" },
            { version: "0.8.2" },
            { version: "0.8.0" },
        ],
    },
    etherscan: {
        apiKey: ETHER_SCAN_API,
    },
    sourcify: {
        enabled: false,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gasReport.txt",
        currency: "USD",
        noColors: true,
        coinmarketcap: COINMARKET_CAP_API,
        token: "MATIC",
    },
}

export default config
