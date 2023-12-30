import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/sidemenu.css";
import ConnectMetaMaskWallet from "./Navbar/ConnectMetaMaskWallet";
import ConnectPhantomWallet from "./Navbar/ConnectPhantomWallet";
import ConnectUnisatWallet from "./Navbar/ConnectUnisatWallet";
import Text from "./Text";

const SideMenu = ({
  handleSideMenu,
  type,
  unisatAddress,
  connectUnisatWallet,
  metaMaskAddress,
  connectMetamaskWallet,
  phantomAddress,
  connectPhantomWallet,
  setPendingEntryPopup,
}) => {
  const navigate = useNavigate();
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
                  "https://ordbridge-organization.gitbook.io/ordbridge-a-2-way-bridge-between-brc20-and-erc20/",
                  "_blank",
                );
              }}
            >
              Docs
            </Text>
            <div
              className="pending_button sm:block hidden"
              onClick={() => {
                if (!walletsSet) {
                  toast.error("Please connect wallets first");
                } else {
                  setPendingEntryPopup((prev) => !prev);
                }
              }}
            >
              Pending Entries
            </div>
            <ConnectUnisatWallet
              onConnectClick={connectUnisatWallet}
              address={unisatAddress}
            />
            <ConnectMetaMaskWallet
              onConnectClick={connectMetamaskWallet}
              address={metaMaskAddress}
            />
            <ConnectPhantomWallet
              onConnectClick={connectPhantomWallet}
              address={phantomAddress}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
