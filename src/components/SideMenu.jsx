import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import "../styles/sidemenu.css";
import ConnectMetaMaskWallet from "./Navbar/ConnectMetaMaskWallet";
import ConnectPhantomWallet from './Navbar/ConnectPhantomWallet';
import ConnectUnisatWallet from "./Navbar/ConnectUnisatWallet";
import Text from "./Text";
import { Link, useNavigate } from "react-router-dom";
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
  const LinkItem = ({ link, text, onClick, ...otherProps }) => {
    return (
      <Link to={link} onClick={onClick} {...otherProps}>
        <Text className="text-white text-lg cursor-pointer !mb-0 sm:block hidden font-syne font-normal text-center">
          {text}
        </Text>
      </Link>
    );
  };
  return (
    <>
      <div id="side_menu" className=" navbar-sidemenu-container closed">
        {/* <div className="side_overlay"></div> */}
        <div className="">
          <div className="side_header">
            <AiOutlineClose onClick={handleSideMenu} />
          </div>
          <div className="flex flex-col gap-4 ">
            <LinkItem

              link="/"
              onClick={() => {
                handleSideMenu();
                navigate('/');
                setStep(0);
              }}
              text="Home"
            />
            <LinkItem link="/swap" text="Swap" onClick={handleSideMenu} />
            <LinkItem link="/bridge" text="Bridge" onClick={handleSideMenu} />
            <LinkItem link="/" text="Launch" onClick="/" />
            <LinkItem link="/" text="Staking" onClick={handleSideMenu} />
            <LinkItem
              onClick={() => {
                window.open(
                  "https://ordbridge-organization.gitbook.io/ordbridge-a-2-way-bridge-between-brc20-and-erc20/",
                  "_blank",
                );
                handleSideMenu();
              }}
              text="Docs"
            />

            <LinkItem
              text="Pending Entries"
              onClick={() => {
                if (!walletsSet) {
                  toast.error('Please connect wallets first');
                } else {
                  navigate("/");if (fromChain.tag === 'BRC') {
                    setFromChain(appChains?.filter((ele) => ele.tag === 'ETH')[0]);
                    setToChain(appChains?.filter((ele) => ele.tag === 'BRC')[0]);
                  }
                  setPendingEntryPopup((prev) => !prev);
                  handleSideMenu();
                }
              }}
            />
            {/*<LinkItem link="/dashboard" text="Dashboard" />*/}
            <ConnectUnisatWallet
              onConnectClick={connectUnisatWallet}
              address={unisatAddress}
            />
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
