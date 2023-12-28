import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/sidemenu.css';
import ConnectMetaMaskWallet from './Navbar/ConnectMetaMaskWallet';
import ConnectUnisatWallet from './Navbar/ConnectUnisatWallet';
import Text from './Text';

const SideMenu = ({
  handleSideMenu,
  type,
  unisatAddress,
  connectUnisatWallet,
  metaMaskAddress,
  connectMetamaskWallet,
  setPendingEntryPopup,
  setStep
}) => {
  const navigate = useNavigate();
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
              className="text-white text-lg cursor-pointer !mb-0 sm:block hidden font-syne font-normal"
              onClick={() => {
                handleSideMenu();
                setStep(0);
              }}>
              Home
            </Text>
            <Text
              className="text-white text-lg cursor-pointer !mb-0 sm:block hidden font-syne font-normal"
              onClick={() => {
                window.open(
                  'https://ordbridge-organization.gitbook.io/ordbridge-a-2-way-bridge-between-brc20-and-erc20/',
                  '_blank'
                );
              }}>
              Docs
            </Text>
            <Text
              className="text-white text-lg cursor-pointer !mb-0 sm:block hidden font-syne font-normal"
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
