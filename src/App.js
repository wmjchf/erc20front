import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi.config";

import { WalletOptions } from "./wallet-options";
import { GetBalance } from "./getBalance";
import { Transfer } from "./transfer";
import { Approve } from "./approve";
import { Allowance } from "./allowance";

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletOptions></WalletOptions>
        <GetBalance></GetBalance>
        <Transfer></Transfer>
        <Approve></Approve>
        <Allowance></Allowance>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
