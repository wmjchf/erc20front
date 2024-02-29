import { useReadContract } from "wagmi";
import { useState } from "react";
import MyTokenJSON from "./abi/MyToken.json";
import { formatEther } from "viem";
export function Allowance() {
  const [owner, setOwner] = useState("");
  const [spender, setSpender] = useState("");
  const [data, setData] = useState(0);
  const contract = useReadContract({
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: MyTokenJSON.abi,
    functionName: "allowance",
    args: [owner, spender],
  });

  const getBalance = async () => {
    // contract.balanceOf(value).then((result) => {
    //   console.log(result);
    // });
    const { data } = await contract.refetch(owner, spender);
    console.log(data, "rewrew");
    setData(formatEther(data));
  };
  return (
    <div>
      <h1>查询授权信息</h1>
      <div>
        <label>owner：</label>
        <input
          value={owner}
          onChange={(event) => {
            setOwner(event.target.value);
          }}
        />
      </div>
      <div>
        <label>spender：</label>
        <input
          value={spender}
          onChange={(event) => {
            setSpender(event.target.value);
          }}
        />
      </div>
      <button onClick={getBalance}>查询</button>
      <span>授权：{data}</span>
    </div>
  );
}
