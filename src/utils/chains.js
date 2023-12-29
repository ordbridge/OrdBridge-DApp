import AvalancheIcon from '../assets/avalanche.png';
import BrcIcon from '../assets/bitcoin.webp';
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
    contractAddress: '0xa237f89cb12bff9932c7503f854ad881dcead73a',
    factoryAddress: '0x6602e9319f2c5ec0ba31ffcdc4301d7ef03b709e',
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
    factoryAddress: '0xa237f89Cb12bfF9932C7503F854ad881Dcead73a',
    contractAddress: '0x8422446a7602DFF5EE44056B01B69Dc677ff17E7',
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
    factoryAddress: '0xa237f89Cb12bfF9932C7503F854ad881Dcead73a',
    contractAddress: '0xD278357569307313328C067A4e65d85897CE07dd',
    chainListId: 8453,
    icon: BaseIcon
  }
];

export const getChainByTag = (tag) => {
  return appChains.find((chain) => chain.tag === tag);
};
