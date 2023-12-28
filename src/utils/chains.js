import AvalancheIcon from '../assets/avalanche.png';
import BrcIcon from '../assets/brc.png';
import EthereumIcon from '../assets/ethereum.png';

export const appChains = [
  {
    isEvm: true,
    name: 'ETHEREUM',
    key: 'ethchain',
    value: 'ETHEREUM',
    tag: 'ETH',
    tokenTag: 'ERC20',
    chainId: '0x1',
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
    name: 'AVALANCHE',
    key: 'avaxchain',
    value: 'AVALANCHE',
    tokenTag: 'ARC20',
    tag: 'AVAX',
    chainId: '0xa86a',
    factoryAddress: '0x5f880678320A9445824bB15d18EF67b5ECbAA42a',
    contractAddress: '0xD45De358A33e5c8f1DC80CCd771ae411C3fBd384',
    icon: AvalancheIcon
  }
];
