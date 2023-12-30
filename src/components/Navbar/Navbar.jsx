import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Img, Line } from "../";
import "../../styles/navbar.css";
import { Logo } from "../Logo";
import SideMenu from "../SideMenu";
import Text from "../Text";
import ConnectMetaMaskWallet from "./ConnectMetaMaskWallet";
import ConnectPhantomWallet from "./ConnectPhantomWallet";
import ConnectUnisatWallet from "./ConnectUnisatWallet";

const Navbar = ({
  connectUnisatWallet,
  unisatAddress,
  type,
  connectMetamaskWallet,
  metaMaskAddress,
  connectPhantomWallet,
  phantomAddress,
  sessionKey,
  pendingEntryPopup,
  setPendingEntryPopup,
  setStep,
}) => {
  const navigate = useNavigate();
  const [navItemsOpen, setNavItemsOpen] = useState(false);
  const handleSideMenu = () => {
    const side_menu = document.getElementById("side_menu");
    if (side_menu.classList.contains("closed")) {
      side_menu.classList.remove("closed");
    } else {
      side_menu.classList.add("closed");
    }
  };
  const [walletsSet, setWalletsSet] = useState(false);

  useEffect(() => {
    if(unisatAddress && unisatAddress !== "" && metaMaskAddress && metaMaskAddress !== ""){
      setWalletsSet(true)
    } else if(unisatAddress && unisatAddress !== "" && phantomAddress && phantomAddress !== ""){
      setWalletsSet(true);
    } else {
      setWalletsSet(false);
    }
  }, [unisatAddress, metaMaskAddress, phantomAddress]);
  return (
    <>
      <SideMenu
        handleSideMenu={handleSideMenu}
        type={type}
        setPendingEntryPopup={setPendingEntryPopup}
        connectMetamaskWallet={connectMetamaskWallet}
        metaMaskAddress={metaMaskAddress}
        unisatAddress={unisatAddress}
        connectUnisatWallet={connectUnisatWallet}
        phantomAddress={phantomAddress}
        connectPhantomWallet={connectPhantomWallet}
      />
      <div className="flex py-3 pl-10 md:flex-col flex-row md:gap-5 items-center justify-between pr-6 z-[10000]">
        <section className="flex gap-2 font-syne items-center justify-start w-auto">
          <Text
            className="text-3xl text-blue-200 pr-12 cursor-pointer !mb-0"
            size="txtPlusJakartaSansRomanBold36"
            onClick={
              pendingEntryPopup
                ? () => {
                    setPendingEntryPopup((prev) => !prev);
                    setStep(0);
                  }
                : () => setStep(0)
            }
          >
            <span className="text-purple-700 font-syne text-left font-bold">
              Ord
            </span>
            <span className="text-white-A700 font-syne text-left font-normal">
              Bridge
            </span>
          </Text>

          <Text
            className="text-white-A700 text-base cursor-pointer mr-6 mt-1 !mb-0 block sm:hidden"
            size="txtSyneBold20"
            onClick={() => {
              window.open(
                "https://ordbridge-organization.gitbook.io/ordbridge-a-2-way-bridge-between-brc20-and-erc20/",
                "_blank",
              );
            }}
          >
            Docs
          </Text>
          <Text
            className="text-white-A700 text-base whitespace-nowrap cursor-pointer mt-1 !mb-0 block sm:hidden"
            onClick={() => {
              if (!walletsSet) {
                toast.error("Please connect wallets first");
              } else {
                setPendingEntryPopup((prev) => (!prev ? !prev : prev));
              }
            }}
            size="txtSyneBold20"
          >
            Pending Entries
          </Text>
        </section>

        <section className="flex items-start gap-2  block md:hidden justify-end">
          {type === "btoe" && (
            <>
              <ConnectUnisatWallet
                onConnectClick={connectUnisatWallet}
                address={unisatAddress}
              />
              <AiOutlineArrowRight color="#FFFFFF" className="mt-[20px]" />
              <ConnectMetaMaskWallet
                onConnectClick={connectMetamaskWallet}
                address={metaMaskAddress}
              />
            </>
          )}
          {type === "etob" && (
            <>
              <ConnectMetaMaskWallet
                onConnectClick={connectMetamaskWallet}
                address={metaMaskAddress}
              />
              <AiOutlineArrowRight color="#FFFFFF" className="mt-[20px]" />
              <ConnectUnisatWallet
                onConnectClick={connectUnisatWallet}
                address={unisatAddress}
              />
            </>
          )}
          {type === "btos" && (
            <>
              <ConnectUnisatWallet
                onConnectClick={connectUnisatWallet}
                address={unisatAddress}
              />
              <AiOutlineArrowRight color="#FFFFFF" className="mt-[20px]" />
              <ConnectPhantomWallet
                onConnectClick={connectPhantomWallet}
                address={phantomAddress}
              />
            </>
          )}
          {type === "stob" && (
            <>
              <ConnectPhantomWallet
                onConnectClick={connectPhantomWallet}
                address={phantomAddress}
              />
              <AiOutlineArrowRight color="#FFFFFF" className="mt-[20px]" />
              <ConnectUnisatWallet
                onConnectClick={connectUnisatWallet}
                address={unisatAddress}
              />
            </>
          )}
        </section>
        <GiHamburgerMenu
          className="hamburger hidden md:block text-white text-xl"
          onClick={handleSideMenu}
          id="menu-btn"
        />
      </div>
    </>
  );
};

export default Navbar;
