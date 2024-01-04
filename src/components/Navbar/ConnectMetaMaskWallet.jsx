import React from 'react';
import MetamaskIconIcon from '../../assets/metamask.png';
import '../../styles/connect-wallet.css';
import { Button } from '..';

const ConnectMetaMaskWallet = ({ onConnectClick, address, text }) => {
  if (address) {
    const firstHalf = address && address.substring(0, 5);
    const lastHalf = address && address.substring(address.length - 3, address.length - 1);
    const truncatedAddress = firstHalf + '........' + lastHalf;
    return (
      <Button
        className="!text-white-A700 cursor-pointer font-bold font-syne leading-[normal] rounded-[29px] text-base text-center px-8 sm:px-6 break-all md:w-max sm:w-full"
        color={`${text === 'Connect Wallets' ? 'deep_purple_A200_a3' : 'light_purple_A200_cc'}`}
        size="sm"
        variant="outline">
        <div className="min-w-full py-0 pt-0.5 mt-0.5 mb-0 mx-0 flex items-center gap-2 justify-start sm:text-[20px] font-syne">
          <img src={MetamaskIconIcon} style={{ width: '30px' }} alt="" /> {truncatedAddress}
        </div>
      </Button>
    );
  }

  if (!address) {
    return (
      <Button
        className="!text-white-A700 cursor-pointer py-3 font-bold font-syne leading-[normal] rounded-[29px] text-base text-center sx:text-3 sm:px-4 px-6"
        color={`${text === 'Connect Wallets' ? 'deep_purple_A200_a3' : 'light_purple_A200_cc'}`}
        size="sm"
        variant="outline"
        onClick={onConnectClick}>
        {text ? text : 'Connect Metamask'}
      </Button>
    );
  }
};

export default ConnectMetaMaskWallet;
