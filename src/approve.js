import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { useState } from "react";
import MyTokenJSON from "./abi/MyToken.json";

export function Approve() {
  const [value, setValue] = useState("");
  const { address } = useAccount();
  const [to, setTo] = useState();
  const [data, setData] = useState(0);
  const [amount, setAmount] = useState(0);
  const { writeContract } = useWriteContract();

  const { data: decimals } = useReadContract({
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: MyTokenJSON.abi,
    functionName: "decimals",
  });
  const approve = async () => {
    writeContract({
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: MyTokenJSON.abi,
      functionName: "approve",
      args: [to, amount * Math.pow(10, decimals)],
    });
    // console.log(result);
  };

  const { data: symbol } = useReadContract({
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: MyTokenJSON.abi,
    functionName: "symbol",
  });

  return (
    <div>
      <h1>授权</h1>
      <div>
        <label>from：</label>
        <input value={address} disabled />
      </div>
      <div>
        <label>to：</label>
        <input
          value={to}
          onChange={(event) => {
            setTo(event.target.value);
          }}
        />
      </div>
      <div>
        <label>金额：</label>
        <input
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
          }}
        />
        <span>{symbol}</span>
      </div>
      <button onClick={approve}>授权</button>
    </div>
  );
}
