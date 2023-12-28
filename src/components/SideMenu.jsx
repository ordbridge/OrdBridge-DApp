import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import "../styles/sidemenu.css";
import ConnectMetaMaskWallet from "./Navbar/ConnectMetaMaskWallet";
import ConnectUnisatWallet from "./Navbar/ConnectUnisatWallet";
import Text from "./Text";
import { Link, useNavigate } from "react-router-dom";

const SideMenu = ({
  handleSideMenu,
  unisatAddress,
  connectUnisatWallet,
  metaMaskAddress,
  connectMetamaskWallet,
  setPendingEntryPopup,
  navToHome,
}) => {
  const navigate = useNavigate();
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
              size="txtSyneBold20"
              onClick={() => {
                navToHome();
              }}
            >
              Home
            </Text>
            <Text
              className="text-white-A700 text-lg cursor-pointer !mb-0 sm:block hidden"
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
              className="text-white-A700 text-lg cursor-pointer !mb-0 sm:block hidden"
              size="txtSyneBold20"
              onClick={() => {
                if (!unisatAddress || !metaMaskAddress) {
                  toast.error("Please Connect Wallets First");
                } else {
                  navigate("/");

                  setPendingEntryPopup((prev) => !prev);
                }
              }}
            >
              Pending Entries
            </Text>

            <Link to="/dashboard">
              <Text
                className="text-white-A700 text-lg cursor-pointer !mb-0 sm:block hidden"
                size="txtSyneBold20"
              >
                Dashboard
              </Text>
            </Link>

            <ConnectUnisatWallet
              onConnectClick={connectUnisatWallet}
              address={unisatAddress}
            />
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
