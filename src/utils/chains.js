import AvalancheIcon from '../assets/avalanche.png';
import BrcIcon from '../assets/bitcoin.png';
import EthereumIcon from '../assets/ethereum.png';
import ArbitrumIcon from '../assets/arbitrum.png';
import BaseIcon from '../assets/base.svg';

export const appChains = [
  {
    isEvm: true,
    name: 'Ethereum',
    key: 'ethchain',
    value: 'ETHEREUM',
    tag: 'ETH',
    tokenTag: 'ERC20',
    chainId: '0x1',
    infuraTag: 'mainnet',
    factoryAddress: '0x6602e9319f2c5ec0ba31ffcdc4301d7ef03b709e',
    contractAddress: '0xa237f89cb12bff9932c7503f854ad881dcead73a',
    icon: EthereumIcon
  },
  {
    isEvm: false,
    name: 'BRC',
    value: 'BRC',
    tokenTag: 'BRC20',
    tag: 'BRC',
    contractAddress: '',
    icon: BrcIcon
  },
  {
    isEvm: true,
    name: 'Avalanche',
    key: 'avaxchain',
    value: 'AVALANCHE',
    tokenTag: 'ARC20',
    tag: 'AVAX',
    chainId: '0xa86a',
    infuraTag: 'avalanche-mainnet',
    factoryAddress: '0x5f880678320A9445824bB15d18EF67b5ECbAA42a',
    contractAddress: '0xD45De358A33e5c8f1DC80CCd771ae411C3fBd384',
    chainListId: 43114,
    icon: AvalancheIcon
  },
  {
    isEvm: true,
    name: 'Arbitrum',
    key: 'arbichain',
    value: 'ARBITRUM',
    tokenTag: 'ARB-ERC20',
    infuraTag: 'arbitrum-mainnet',
    tag: 'ARBI',
    chainId: '0xa4b1',
    factoryAddress: '0x5f880678320A9445824bB15d18EF67b5ECbAA42a',
    contractAddress: '0xa237f89Cb12bfF9932C7503F854ad881Dcead73a',
    chainListId: 42161,
    icon: ArbitrumIcon
  },
  {
    isEvm: true,
    name: 'Base',
    key: 'basechain',
    value: 'BASE',
    tokenTag: 'BASE-ERC20',
    tag: 'BASE',
    infuraTag: 'base-goerli',
    chainId: '0x2105',
    factoryAddress: '0x5f880678320A9445824bB15d18EF67b5ECbAA42a',
    contractAddress: '0xa237f89Cb12bfF9932C7503F854ad881Dcead73a',
    chainListId: 8453,
    icon: BaseIcon
  }
];

export const getChainByTag = (tag) => {
  const tagToLower = tag.toLowerCase();
  return appChains.find((chain) => chain.tag.toLowerCase() === tagToLower);
};

export const getWeb3UrlByTag = (tag) => {
  const requestedChain = getChainByTag(tag);

  return tag.toLowerCase() !== 'base'
    ? `https://${requestedChain.infuraTag}.infura.io/v3/18b346ece35742b2948e73332f85ad86`
    : 'https://base-mainnet.g.alchemy.com/v2/MiFWZXgXz9fVhntEMJ3qZzti8RCGh9bP';
};
