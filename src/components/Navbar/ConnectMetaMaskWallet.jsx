import '../../styles/connect-wallet.css';
// import EthererumIcon from "../../assets/ethereum.png"
import MetamaskIconIcon from "../../assets/metamask.png"

import React from 'react';
import { Button, Text } from '..';

const ConnectMetaMaskWallet = ({ onConnectClick, address, text }) => {
  if (address) {
    const firstHalf = address && address.substring(0, 5);
    const lastHalf = address && address.substring(address.length-3, address.length-1);
    const truncatedAddress = firstHalf + '........' + lastHalf;
    return (
      <Button
        className="!text-white-A700 cursor-pointer font-bold font-syne leading-[normal] rounded-[29px] text-base text-center px-8 w-max sm:px-6 sm:text-xs break-all"
        color={`${text === 'Connect Wallets' ? 'deep_purple_A200_a3' : 'deep_purple_A200_cc'}`}
        size="sm"
        variant="outline">
        <div className="min-w-full py-0 pt-0.5 mt-0.5 mb-0 mx-0 flex items-center gap-2 justify-start"><img src={MetamaskIconIcon} style={{width:'30px'}}/> {truncatedAddress}</div>
      </Button>
    );
  }

  if (!address) {
    return (
      <Button
        className="!text-white-A700 cursor-pointer p-[12px] font-bold font-syne leading-[normal] rounded-[29px] text-base text-center w-max px-6"
        color={`${text === 'Connect Wallets' ? 'deep_purple_A200_a3' : 'deep_purple_A200_cc'}`}
        size="sm"
        variant="outline"
        onClick={onConnectClick}>
        {text ? text : 'Connect Metamask'}
      </Button>
    );
  }
};

export default ConnectMetaMaskWallet;
