import {
  useAccount,
  useWriteContract,
  useReadContract,
  useConfig,
} from "wagmi";
import { useState } from "react";
import MyTokenJSON from "./abi/MyToken.json";

export function Transfer() {
  const [value, setValue] = useState("");
  const config = useConfig();

  const { address } = useAccount();
  const [to, setTo] = useState();
  const [data, setData] = useState(0);
  const [amount, setAmount] = useState(0);
  const { writeContract } = useWriteContract();

  const { data: decimals } = useReadContract({
    address: "0x31403b1e52051883f2Ce1B1b4C89f36034e1221D",
    abi: MyTokenJSON.abi,
    functionName: "decimals",
  });
  const transfer = async () => {
    try {
      const res = await writeContract({
        address: "0x31403b1e52051883f2Ce1B1b4C89f36034e1221D",
        abi: MyTokenJSON.abi,
        functionName: "transfer",
        args: [to, amount * Math.pow(10, decimals)],
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const { data: symbol } = useReadContract({
    address: "0x31403b1e52051883f2Ce1B1b4C89f36034e1221D",
    abi: MyTokenJSON.abi,
    functionName: "symbol",
  });

  return (
    <div>
      <h1>转账</h1>
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
      <button onClick={transfer}>转账</button>
    </div>
  );
}
