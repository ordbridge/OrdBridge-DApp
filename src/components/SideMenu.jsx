import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import '../styles/sidemenu.css';
import ConnectMetaMaskWallet from './Navbar/ConnectMetaMaskWallet';
import ConnectUnisatWallet from './Navbar/ConnectUnisatWallet';
import Text from './Text';

const SideMenu = ({
  handleSideMenu,
  unisatAddress,
  connectUnisatWallet,
  metaMaskAddress,
  connectMetamaskWallet,
  setPendingEntryPopup
}) => {
  return (
    <>
      <div id="side_menu" className=" navbar-sidemenu-container closed">
        <div className="side_overlay"></div>
        <div className="">
          <div className="side_header">
            <AiOutlineClose onClick={handleSideMenu} />
          </div>
          <div className="flex flex-col gap-4">
            <Text
              className="text-white-A700 text-lg cursor-pointer !mb-0 sm:block hidden"
              size="txtSyneBold20">
              Home
            </Text>
            <Text
              className="text-white-A700 text-lg cursor-pointer !mb-0 sm:block hidden"
              size="txtSyneBold20"
              onClick={() => {
                window.open(
                  'https://ordbridge-organization.gitbook.io/ordbridge-a-2-way-bridge-between-brc20-and-erc20/',
                  '_blank'
                );
              }}>
              Docs
            </Text>
            <Text
              className="text-white-A700 text-lg cursor-pointer !mb-0 sm:block hidden"
              size="txtSyneBold20"
              onClick={() => {
                if (!unisatAddress || !metaMaskAddress) {
                  toast.error('Please Connect Wallets First');
                } else {
                  setPendingEntryPopup((prev) => !prev);
                }
              }}>
              Pending Entries
            </Text>
            <ConnectUnisatWallet onConnectClick={connectUnisatWallet} address={unisatAddress} />
            <ConnectMetaMaskWallet
              onConnectClick={connectMetamaskWallet}
              address={metaMaskAddress}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
