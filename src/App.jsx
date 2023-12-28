import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { appChains } from "./utils/chains";
import { WagmiConfig } from "wagmi";

import useMediaQuery from "./hooks/useMediaQuery";
import HomePage from "./pages/HomePage";
import { updateAddress } from "./services/homepage.service";
import "./styles.css"; // Import your styles
import "./styles/color.css";
import "./styles/font.css";
import "./styles/index.css";
import "./styles/tailwind.css";
import { CustomToastWithLink } from "./components/CustomToastWithLink";

import { config, web3Modal } from "./utils/web3Config";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [fromChain, setFromChain] = useState(appChains[1]);
  const [toChain, setToChain] = useState(appChains[0]);
  const [unisatAddress, setUnisatAddress] = useState("");
  const [metaMaskAddress, setMetamaskAddress] = useState("");
  const [userDetails, setUserDetails] = useState();
  const [type, setType] = useState("Bitcoin");
  const [sessionKey, setSessionKey] = useState("");
  const [pendingEntryPopup, setPendingEntryPopup] = useState(false);
  const [isMobile, setIsMobile] = useState();
  const isMob = useMediaQuery("(max-width:630px)");

  const walletUpdate = async (address) => {
    await updateAddress({
      user_details: address,
    }).then((res) => {
      setSessionKey(res.data.user_details.session_key);
    });
  };

  const unisatHandler = async () => {
    try {
      const accounts = await window.unisat.requestAccounts();
      if (accounts[0].substring(0, 3) === "bc1") {
        setUnisatAddress(accounts[0]);
        setUserDetails((prev) => {
          const address = { ...prev, unisat_address: accounts[0] };
          return address;
        });
        walletUpdate({ ...userDetails, unisat_address: accounts[0] });
      } else {
        toast.error(
          "Please Connect to Native Segwit Address starts with bc1...",
        );
      }
    } catch (e) {
      toast.error(
        "Something went wrong while connecting to wallet, please try again later",
      );
    }
  };

  const switchUnisatNetwork = async () => {
    try {
      const res = await window.unisat.switchNetwork("livenet");
      unisatHandler();
    } catch (e) {
      console.log(e);
    }
  };

  const getUnisatNetwork = async () => {
    if (isMob) {
      setIsMobile(true);
    } else {
      try {
        const res = await window.unisat.getNetwork();
        if (res === "livenet") {
          unisatHandler();
        } else {
          switchUnisatNetwork();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    // To Check Metamask is connected after page refreshing
    const MetamaskAccount = window.ethereum.request({ method: "eth_accounts" });
    MetamaskAccount.then((res) => {
      if (res?.length > 0) {
        setUserDetails((prev) => {
          const address = { ...prev, metamask_address: res[0] };
          return address;
        });
        setMetamaskAddress(res[0]);
        walletUpdate({ ...userDetails, metamask_address: res[0] });
      }
    });

    // To Check Unisat is connected after page refreshing
    const UnisatAccount = window.unisat.requestAccounts();
    UnisatAccount.then((res) => {
      if (res?.length > 0) {
        setUnisatAddress(res[0]);
        setUserDetails((prev) => {
          const address = { ...prev, unisat_address: res[0] };
          return address;
        });
        walletUpdate({ ...userDetails, unisat_address: res[0] });
      }
    });
  }, []);

  const MetaMaskConnection = async () => {
    try {
      const web3instance = await web3Modal.connect();
      const web3provider = new ethers.providers.Web3Provider(web3instance);
      const accounts = await web3provider.listAccounts();
      setUserDetails((prev) => {
        const address = { ...prev, metamask_address: accounts[0] };
        return address;
      });
      setMetamaskAddress(accounts[0]);
      walletUpdate({ ...userDetails, metamask_address: accounts[0] });
      // const network = await web3provider.getNetwork();
    } catch (error) {
      toast.error(
        "Something went wrong while connecting to wallet, please try again later",
      );
    }
  };

  const getEvmChain = () => {
    if (fromChain.isEvm) {
      return fromChain;
    }

    return toChain;
  };

  const connectMetamaskWallet = async (desiredChainId) => {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const appChainId = Number.isNaN(desiredChainId)
      ? getEvmChain().chainId
      : desiredChainId;
    if (chainId === appChainId) {
      MetaMaskConnection();
    } else {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: appChainId }],
        });
        MetaMaskConnection();
      } catch (error) {
        // @TODO: change this when more chains are added
        if (error.code === 4902) {
          toast.info(<CustomToastWithLink />);
        } else {
          toast.error(error.message);
        }
      }
    }
  };

  const connectUnisatWallet = async () => {
    getUnisatNetwork();
  };

  return (
    <WagmiConfig config={config}>
      <ToastContainer />
      <div className="swap_container">
        <BrowserRouter>
          <Navbar
            unisatAddress={unisatAddress}
            metaMaskAddress={metaMaskAddress}
            connectUnisatWallet={connectUnisatWallet}
            connectMetamaskWallet={connectMetamaskWallet}
            sessionKey={sessionKey}
            type={type}
            setStep={() => {}}
            pendingEntryPopup={pendingEntryPopup}
            setPendingEntryPopup={setPendingEntryPopup}
          />
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  toChain={toChain}
                  setToChain={setToChain}
                  fromChain={fromChain}
                  setFromChain={setFromChain}
                  appChains={appChains}
                  unisatAddress={unisatAddress}
                  metaMaskAddress={metaMaskAddress}
                  connectUnisatWallet={connectUnisatWallet}
                  isMobile={isMobile}
                  setIsMobile={setIsMobile}
                  connectMetamaskWallet={connectMetamaskWallet}
                  session_key={sessionKey}
                  setType={setType}
                  type={type}
                  pendingEntryPopup={pendingEntryPopup}
                  setPendingEntryPopup={setPendingEntryPopup}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </WagmiConfig>
  );
}

export default App;
