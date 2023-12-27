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
      <div id="side_menu" className="side_menu closed">
        <div className="side_overlay"></div>
        <div className="new_menu ">
          <div className="side_header">
            <AiOutlineClose onClick={handleSideMenu} />
          </div>
          <div className="right_section">
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
            <div
              className="pending_button sm:block hidden"
              onClick={() => {
                if (!unisatAddress || !metaMaskAddress) {
                  toast.error('Please Connect Wallets First');
                } else {
                  setPendingEntryPopup((prev) => !prev);
                }
              }}>
              Pending Entries
            </div>
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
