import { useReadContract } from "wagmi";
import { useState } from "react";
import MyTokenJSON from "./abi/MyToken.json";
import { formatEther } from "viem";
export function GetBalance() {
  const [value, setValue] = useState("");
  const [data, setData] = useState(0);
  const balanceOf = useReadContract({
    address: "0x31403b1e52051883f2Ce1B1b4C89f36034e1221D",
    abi: MyTokenJSON.abi,
    functionName: "balanceOf",
    args: [value],
  });

  const getBalance = async () => {
    const { data } = await balanceOf.refetch(value);
    setData(formatEther(data));
  };
  return (
    <div>
      <h1>查询Token余额</h1>
      <input
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <button onClick={getBalance}>查询</button>
      <span>余额：{data}</span>
    </div>
  );
}
