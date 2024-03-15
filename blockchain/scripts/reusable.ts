import { run } from "hardhat"

export const verify = async (contractAddress, args) => {
    console.log(" verifying smart contract " + contractAddress)
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorAguments: args,
        })
    } catch (err) {
        console.log("Error ")
        if (err.message.toLowerCase().includes("already been verified")) {
            console.log(" Already Verified smart contract " + contractAddress)
        } else {
            console.log(" Error : " + err)
        }
    }
}
