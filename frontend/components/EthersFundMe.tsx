import React, { useEffect, useState } from "react";
import { ethers, TransactionResponse } from "ethers";
import abi from "../constants/abi.json";
import contractAddresses from "../constants/contractAddresses.json";

type DataType = {
  contractBalance: number;
  contractOwner: string;
  connectedAccounts: Array<string>;
  contractAddress: string;
};

type MeatamaskType = {
  contract: ethers.Contract;
  signer: ethers.Signer;
  provider: ethers.Provider;
};

function FundMe() {
  const [fundAmt, setFundAmt] = useState("");
  const [addressToAmtFunded, setAddressToAmtFunded] = useState([]);
  const [metamask, setMetamask] = useState<MeatamaskType>({});
  const [update, setUpdate] = useState(0);
  const [data, setData] = useState<DataType>({
    contractBalance: 0,
    contractOwner: "",
    connectedAccounts: [],
    contractAddress: "",
  });
  let { contractBalance, contractOwner, connectedAccounts, contractAddress } =
    data;
  const { provider, signer, contract } = metamask;

  useEffect(() => {
    if (window.ethereum) {
      (async () => {
        const { ethereum } = window;
        const connectedAccounts = (await ethereum.request({
          method: "eth_requestAccounts",
        })) as Array<string>;
        setData((prev) => ({ ...prev, connectedAccounts }));
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
      })();
    }
  }, [window.ethereum]);

  useEffect(() => {
    (async function () {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const networkConfig = await provider.getNetwork();
        const chainId = networkConfig.chainId;
        contractAddress = contractAddresses[Number(chainId)];
        setData((prev) => ({ ...prev, contractAddress }));
        const signer = await provider.getSigner();
        if (contractAddress) {
          let contract = new ethers.Contract(contractAddress, abi, signer);
          setMetamask((prev) => ({ ...prev, contract, provider, signer }));
          let tempOwner = await contract.getOwner();
          let tempBalance = Number(await provider.getBalance(contractAddress));
          setData((prev) => ({ ...prev, contractBalance: tempBalance }));
          setData((prev) => ({ ...prev, contractOwner: tempOwner }));
        }
      } else {
        console.log("install metamask extension");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let allFunders = await contract?.getAllFunders();
      console.log({ allFunders });
      if (allFunders) {
        let temp1 = await Promise.all(
          allFunders.map(async (funder) => {
            let fundedAmt = await contract.s_addressToAmountFunded(funder);
            return { [funder]: fundedAmt };
          })
        );
        console.log({ temp1 });
      }
    })();
  }, [update, contract]);

  async function Fund() {
    try {
      const transactionResponse: TransactionResponse = await contract?.fund({
        value: ethers.parseEther(fundAmt),
      });
      await transactionResponse.wait(1);
      const newbalance = Number(await provider.getBalance(contractAddress));
      setData((prev) => ({ ...prev, contractBalance: newbalance }));
    } catch (err) {
      console.log({ err });
      alert(err.shortMessage);
      // if (err.shortMessage.inclues("coavlence")) {
      //   console.log(" delete activity data in the metamask advanced settings");
      // }
    }
    setUpdate(update + 1);
  }
  async function Withdraw() {
    const transactionResponse = await contract?.withdraw();
    await transactionResponse.wait(1);
    const newbalance = Number(await provider.getBalance(contractAddress));
    setData((prev) => ({ ...prev, contractBalance: newbalance }));
  }

  return (
    <div className=" flex flex-col gap-4">
      <p className=" text-end ">connectedAccount : {connectedAccounts[0]}</p>
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
