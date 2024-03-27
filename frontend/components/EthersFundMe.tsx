import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../constants/abi.json";
import contractAddresses from "../constants/contractAddresses.json";

function FundMe() {
  let contractBalance = 0;
  // let contractOwner = "asdf";
  const [fundAmt, setFundAmt] = useState("");
  const [funders, setFunders] = useState("");
  let contract: ethers.Contract;

  useEffect(() => {
    (async function () {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const networkConfig = await provider.getNetwork();
        const chainId = networkConfig.chainId;
        const contractAddress = contractAddresses[Number(chainId)];
        console.log(contractAddress);
        const signer = await provider.getSigner();
        if (contractAddress) {
          contract = new ethers.Contract(contractAddress, abi, signer);
          // contractOwner = await contract.getOwner();
          contractBalance = Number(await provider.getBalance(contractAddress));
          console.log(
            await contract.s_addressToAmountFunded(
              "0xE959A2c1c3F108697c244b98C71803b6DcD77764"
            )
          );
          // setFunders(await contract.s_addressToAmountFunded);
          console.log({ chainId, contractAddress, contractBalance });
        }
      } else {
        console.log("install metamask extension");
      }
    })();
  });

  async function Fund() {
    const transactionResponse = await contract.fund({
      value: ethers.parseEther(fundAmt),
    });
    console.log(Number(ethers.parseEther(fundAmt)) / 10 ** 18);
  }
  async function Withdraw() {
    const transactionResponse = await contract.withdraw();
    console.log(transactionResponse);
  }

  return (
    <div className=" flex flex-col gap-3">
      <h1 className=" text-center font-bold text-green-600 "> FundMe </h1>
      <p> contract Balance : {contractBalance}</p>
      {/* <p> contract Owner : {contractOwner}</p> */}
      <div className="flex gap-3  align-middle">
        <input
          type="text"
          className=" rounded-md border-2 p-1 outline-none "
          placeholder="enter USD  "
          onChange={(e) => setFundAmt(e.target.value)}
          value={fundAmt}
        ></input>
        <div
          onClick={Fund}
          className=" cursor-default rounded-lg bg-blue-500 p-1 px-4 font-bold "
        >
          Fund
        </div>
        <div
          onClick={Withdraw}
          className=" cursor-default rounded-lg bg-green-500 p-1 px-4 font-bold "
        >
          Withdraw
        </div>
      </div>
      <div>
        {" "}
        <h1>Funders History</h1> <p></p>
      </div>
    </div>
  );
}

export default FundMe;
