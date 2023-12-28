import React from "react";
import "../../styles/navbar.css";
import { toast } from "react-toastify";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import "../../styles/navbar.css";
import SideMenu from "../SideMenu";
import Text from "../Text";
import ConnectMetaMaskWallet from "./ConnectMetaMaskWallet";
import ConnectUnisatWallet from "./ConnectUnisatWallet";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({
  connectUnisatWallet,
  unisatAddress,
  type,
  connectMetamaskWallet,
  metaMaskAddress,
  pendingEntryPopup,
  setPendingEntryPopup,
  setStep,
}) => {
  const navigate = useNavigate();

  const handleSideMenu = () => {
    const side_menu = document.getElementById("side_menu");
    if (side_menu.classList.contains("closed")) {
      side_menu.classList.remove("closed");
    } else {
      side_menu.classList.add("closed");
    }
  };

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
        navToHome={executeVeryBadLogicForNavigatingToHome}
      />
      <div className="flex py-3 pl-10 md:flex-col flex-row md:gap-5 items-center justify-between pr-6 z-[10000]">
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
              if (!unisatAddress || !metaMaskAddress) {
                toast.error("Please Connect Wallets First");
              } else {
                navigate("/");

                setPendingEntryPopup((prev) => (!prev ? !prev : prev));
              }
            }}
            size="txtSyneBold20"
          >
            Pending Entries
          </Text>
        </section>
        <Link to="/dashboard">
          <Text
            className="text-white-A700 text-base cursor-pointer ml-6 mt-1 !mb-0 block sm:hidden"
            size="txtSyneBold20"
          >
            Dashboard
          </Text>
        </Link>

        <section className="flex items-start gap-2  visible md:hidden justify-end">
          {type === "Bitcoin" ? (
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
          ) : (
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
