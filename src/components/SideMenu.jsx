import React from 'react';
import '../styles/sidemenu.css';
import { AiOutlineClose } from 'react-icons/ai';
import ConnectUnisatWallet from './Navbar/ConnectUnisatWallet';
import ConnectMetaMaskWallet from './Navbar/ConnectMetaMaskWallet';
import { toast } from 'react-toastify';
import Text from './Text';

const SideMenu = ({
  handleSideMenu,
  type,
  unisatAddress,
  connectUnisatWallet,
  metaMaskAddress,
  connectMetamaskWallet,
  setPendingEntryPopup
}) => {
  return (
    <>
      <div id="side_menu" className=" navbar-sidemenu-container ">
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
