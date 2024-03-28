import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../constants/abi.json";
import contractAddresses from "../constants/contractAddresses.json";

type dataType = {
  contract: ethers.Contract;
  contractBalance: number;
  contractOwner: string;
  connectedAccount: string;
};

function FundMe() {
  const [fundAmt, setFundAmt] = useState("");
  const [addressToAmtFunded, setAddressToAmtFunded] = useState([]);
  const [data, setData] = useState<dataType>({
    contract: null,
    contractBalance: 0,
    contractOwner: "",
    connectedAccount: "",
  });
  const { contract, contractBalance, contractOwner, connectedAccount } = data;

  // useEffect(() => {
  //   if (window.ethereum) {
  //     (async () => {
  //       const { ethereum } = window;
  //       const connectedAccount = await ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       connectedAccount && setData({ ...data, connectedAccount });
  //     })();
  //   }
  // }, [window.ethereum]);

  useEffect(() => {
    (async function () {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const networkConfig = await provider.getNetwork();
        const chainId = networkConfig.chainId;
        const contractAddress = contractAddresses[Number(chainId)];
        const signer = await provider.getSigner();
        if (contractAddress) {
          let contract = new ethers.Contract(contractAddress, abi, signer);
          setData((prev) => ({ ...prev, contract }));
          let tempOwner = await contract.getOwner();
          let tempBalance = Number(await provider.getBalance(contractAddress));
          setData({ ...data, contractBalance: tempBalance });
          setData({ ...data, contractOwner: tempOwner });
          let allFunders = await contract.getAllFunders();
          let temp1 = await Promise.all(
            allFunders.map(async (funder) => {
              let fundedAmt = await contract.s_addressToAmountFunded(funder);
              return { [funder]: fundedAmt };
            })
          );
        }
      } else {
        console.log("install metamask extension");
      }
    })();
  }, []);
  console.log(data);

  async function Fund() {
    try {
      const transactionResponse = await contract.fund({
        value: ethers.parseEther(fundAmt),
      });
    } catch (err) {
      console.log({ err });
      alert(err.shortMessage);
    }
  }
  async function Withdraw() {
    const transactionResponse = await contract.withdraw();
    console.log(transactionResponse);
  }

  return (
    <div className=" flex flex-col gap-4">
      <p className=" text-end ">connectedAccount : {connectedAccount}</p>
      <h1 className=" text-center font-bold text-green-600 "> FundMe </h1>
      <p> contract Balance : {contractBalance}</p>
      <p> contract Owner : {contractOwner}</p>
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
        {addressToAmtFunded?.forEach((obj) => (
          <p> {Object.keys(obj)[0]}</p>
        ))}
      </div>
    </div>
  );
}

export default FundMe;
