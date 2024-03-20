import { ethers } from "hardhat"

module.exports = async () => {
    if (process.env.UPDATE_FE) {
        console.log(" updating address and abi in frontend")
    }
}

async function updateContractAddresses() {
    // const Twitter = ethers.getContractAt("Twitter");
}

module.exports.tags = ["all", "updateFE"]
