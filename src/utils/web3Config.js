import { configureChains, createConfig, mainnet, sepolia } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import Web3Modal from 'web3modal';
import { http, createPublicClient } from 'viem';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [publicProvider()]
);
const config = createConfig({
  autoConnect: true,
  webSocketPublicClient,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  })
});
const providerOptions = {};
const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions
});

export { config, web3Modal };
