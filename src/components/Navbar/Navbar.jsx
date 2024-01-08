import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/navbar.css";
import SideMenu from "../SideMenu";
import Text from "../Text";
import ConnectMetaMaskWallet from "./ConnectMetaMaskWallet";
import ConnectPhantomWallet from "./ConnectPhantomWallet";
import ConnectUnisatWallet from "./ConnectUnisatWallet";
import HamburderIcon from "../../assets/hamburger.png";
import { appChains } from "../../utils/chains";

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
  fromChain,
  setFromChain,
  setToChain,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname, "location pathname");

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
    if (
      unisatAddress &&
      unisatAddress !== "" &&
      metaMaskAddress &&
      metaMaskAddress !== ""
    ) {
      setWalletsSet(true);
    } else if (
      unisatAddress &&
      unisatAddress !== "" &&
      phantomAddress &&
      phantomAddress !== ""
    ) {
      setWalletsSet(true);
    } else {
      setWalletsSet(false);
    }
  }, [unisatAddress, metaMaskAddress, phantomAddress]);

  const executeVeryBadLogicForNavigatingToHome = () => {
    setStep(0);
    const loc = window.location.pathname;

    if (loc === "/dashboard") {
      navigate("/");
    }

    if (pendingEntryPopup) {
      setPendingEntryPopup((prev) => !prev);
    }
  };

  const getWalletForType = (chainType) => {
    if (chainType === "b") {
      return (
        <ConnectUnisatWallet
          onConnectClick={connectUnisatWallet}
          address={unisatAddress}
        />
      );
    }
    if (chainType === "e") {
      return (
        <ConnectMetaMaskWallet
          onConnectClick={connectMetamaskWallet}
          address={metaMaskAddress}
        />
      );
    }
    if (chainType === "s") {
      return (
        <ConnectPhantomWallet
          onConnectClick={connectPhantomWallet}
          address={phantomAddress}
        />
      );
    }
  };

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
        setStep={setStep}
        navToHome={executeVeryBadLogicForNavigatingToHome}
        fromChain={fromChain}
        setFromChain={setFromChain}
        setToChain={setToChain}
      />
      <div className="flex py-3 pl-10 md:flex-col flex-row md:gap-5 items-center justify-between pr-6 z-[10000] border-none border-r-0 border-l-0  border-b navbar-container">
        <section className="flex gap-2 font-syne items-center justify-start w-auto">
          <Text
            className="text-3xl text-blue-200 pr-12 cursor-pointer !mb-0"
            size="txtPlusJakartaSansRomanBold36"
            onClick={executeVeryBadLogicForNavigatingToHome}
          >
            <span className="text-purple-700 font-syne text-left font-bold">
              Ord
            </span>
            <span className="text-white-A700 font-syne text-left font-normal">
              Bridge
            </span>
          </Text>

          <section className="font-grostek flex">
            <Link to="/bridge">
              <p className="text-white-A700 text-base cursor-pointer ml-6 mt-1 !mb-0 block sm:hidden font-grostek">
                Bridge
              </p>
            </Link>
            <Link to="/dashboard">
              <p className="text-white-A700 text-base cursor-pointer ml-6 mt-1 !mb-0 block sm:hidden font-grostek relative">
                Staking{" "}
                <span className="font-thin font-syne text-nowrap  text-[10px] text-gradient absolute -bottom-[15px] left-0">
                  -coming soon
                </span>
              </p>
            </Link>
            <p
              className="text-white-A700 text-base cursor-pointer ml-6 mt-1 !mb-0 block sm:hidden font-grostek"
              onClick={() => {
                window.open(
                  "https://ordbridge-organization.gitbook.io/ordbridge-a-2-way-bridge-between-brc20-and-erc20/",
                  "_blank",
                );
              }}
            >
              Docs
            </p>
            {/*<p*/}
            {/*  className="text-white-A700 text-base whitespace-nowrap cursor-pointer ml-6 mt-1 !mb-0 block sm:hidden font-grostek"*/}
            {/*  onClick={() => {*/}
            {/*    if (!walletsSet) {*/}
            {/*      toast.error("Please connect wallets first");*/}
            {/*    } else {*/}
            {/*      navigate("/");*/}

            {/*      setPendingEntryPopup((prev) => (!prev ? !prev : prev));*/}
            {/*    }*/}
            {/*  }}*/}
            {/*>*/}
            {/*  Pending Entries*/}
            {/*</p>*/}
          </section>
        </section>

        {location.pathname === "/" ? (
          <section className="md:hidden">
            <button className="landing-page-hero-content--button " onClick={() => {
              window.open("/bridge");
            }}>
                Launch Bridge
            </button>
          </section>
        ) : (
          <section className="flex items-start gap-2  block md:hidden justify-end">
            {getWalletForType(type[0])}
            <AiOutlineArrowRight color="#FFFFFF" className="mt-[20px]" />
            {getWalletForType(type[3])}
          </section>
        )}

        <img
          src={HamburderIcon}
          className="hamburger hidden md:block text-white text-xl"
          onClick={handleSideMenu}
          id="menu-btn"
          alt=""
        />
      </div>
    </>
  );
};

export default Navbar;
