import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import '../styles/sidemenu.css';
import ConnectMetaMaskWallet from './Navbar/ConnectMetaMaskWallet';
import ConnectPhantomWallet from './Navbar/ConnectPhantomWallet';
import ConnectUnisatWallet from './Navbar/ConnectUnisatWallet';
import Text from './Text';
import { Link, useNavigate } from 'react-router-dom';
import { appChains } from '../utils/chains';

const SideMenu = ({
  handleSideMenu,
  unisatAddress,
  connectUnisatWallet,
  metaMaskAddress,
  connectMetamaskWallet,
  phantomAddress,
  connectPhantomWallet,
  setPendingEntryPopup,
  navToHome,
  setStep,
  fromChain,
  setFromChain,
  setToChain
}) => {
  const navigate = useNavigate();
  const [walletsSet, setWalletsSet] = useState(false);

  useEffect(() => {
    if (unisatAddress && unisatAddress !== '' && metaMaskAddress && metaMaskAddress !== '') {
      setWalletsSet(true);
    } else if (unisatAddress && unisatAddress !== '' && phantomAddress && phantomAddress !== '') {
      setWalletsSet(true);
    } else {
      setWalletsSet(false);
    }
  }, [unisatAddress, metaMaskAddress, phantomAddress]);
  return (
    <>
      <div id="side_menu" className=" navbar-sidemenu-container closed">
        {/* <div className="side_overlay"></div> */}
        <div className="">
          <div className="side_header">
            <AiOutlineClose onClick={handleSideMenu} />
          </div>
          <div className="flex flex-col gap-4">
            <Text
              className="text-white text-lg cursor-pointer !mb-0 sm:block hidden font-syne font-normal"
              onClick={() => {
                handleSideMenu();
                navigate('/');
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
              className="text-white-A700 text-lg cursor-pointer !mb-0 sm:block hidden font-syne font-normal"
              size="txtSyneBold20"
              onClick={() => {
                if (!walletsSet) {
                  toast.error('Please connect wallets first');
                } else {
                  navigate('/');
                  if (fromChain.tag === 'BRC') {
                    setFromChain(appChains?.filter((ele) => ele.tag === 'ETH')[0]);
                    setToChain(appChains?.filter((ele) => ele.tag === 'BRC')[0]);
                  }
                  setPendingEntryPopup((prev) => !prev);
                }
              }}>
              Pending Entries
            </Text>

            <Link to="/dashboard">
              <Text className="text-white text-lg cursor-pointer !mb-0 sm:block hidden font-syne font-normal">
                Dashboard
              </Text>
            </Link>

            <ConnectUnisatWallet onConnectClick={connectUnisatWallet} address={unisatAddress} />
            <ConnectMetaMaskWallet
              onConnectClick={connectMetamaskWallet}
              address={metaMaskAddress}
            />
            <ConnectPhantomWallet onConnectClick={connectPhantomWallet} address={phantomAddress} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
