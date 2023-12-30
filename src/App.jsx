import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { http, createPublicClient } from "viem";
import {
  WagmiConfig,
  configureChains,
  createConfig,
  mainnet,
  sepolia,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Web3Modal from "web3modal";
import HomePage from "./pages/HomePage";
import { updateAddress } from "./services/homepage.service";
import "./styles.css"; // Import your styles
import "./styles/color.css";
import "./styles/font.css";
import "./styles/index.css";
import "./styles/tailwind.css";
import Dashboard from "./pages/Dashboard";
import useMediaQuery from "./hooks/useMediaQuery";
import Navbar from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer";

import { appChains } from "./utils/chains";
import LandingPage from "./pages/LandingPage";

const { webSocketPublicClient } = configureChains(
  [sepolia],
  [publicProvider()],
);
const config = createConfig({
  autoConnect: true,
  webSocketPublicClient,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});
const providerOptions = {};
const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
});
function App() {
  const [step, setStep] = useState(0);
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
      const accounts = await window.unisat?.requestAccounts();
      if (accounts[0].substring(0, 3) === "bc1") {
        setUnisatAddress(accounts[0]);
        setUserDetails((prev) => {
          return { ...prev, unisat_address: accounts[0] };
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
      // eslint-disable-next-line no-unused-vars
      let res = await window?.unisat?.switchNetwork("livenet");
      await unisatHandler();
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
          await unisatHandler();
        } else {
          await switchUnisatNetwork();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    // To Check Metamask is connected after page refreshing
    const MetamaskAccount = window.ethereum?.request({
      method: "eth_accounts",
    });
    MetamaskAccount?.then((res) => {
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
    if (!isMob) {
      const UnisatAccount = window.unisat?.requestAccounts();
      UnisatAccount?.then((res) => {
        if (res?.length > 0) {
          setUnisatAddress(res[0]);
          setUserDetails((prev) => {
            const address = { ...prev, unisat_address: res[0] };
            return address;
          });
          walletUpdate({ ...userDetails, unisat_address: res[0] });
        }
      }).catch((err) => {
        toast.error(err.message);
      });
    }
  },[]);

  const MetaMaskConnection = async () => {
    try {
      const web3instance = await web3Modal.connect();
      const web3provider = new ethers.providers.Web3Provider(web3instance);
      const accounts = await web3provider.listAccounts();
      setUserDetails((prev) => {
        return { ...prev, metamask_address: accounts[0] };
      });
      setMetamaskAddress(accounts[0]);
      await walletUpdate({ ...userDetails, metamask_address: accounts[0] });
      // const network = await web3provider.getNetwork();
    } catch (error) {
      toast.error(
        "Something went wrong while connecting to wallet, please try again later",
      );
    }
  };

  const CustomToastWithLink = () => (
    <div>
      Seems like you don't have AVAX-C chain added to your metamask wallet.
      Please add Avalanche C-Chain via{" "}
      <a
        href="https://chainlist.org/chain/43114"
        target="_blank"
        rel="noreferrer"
      >
        this link.
      </a>
    </div>
  );

  const getEvmChain = () => {
    if (fromChain.isEvm) {
      return fromChain;
    } else {
      return toChain;
    }
  };

  const connectMetamaskWallet = async (desiredChainId) => {
    const chainId = await window.ethereum?.request({ method: "eth_chainId" });
    const appChainId = isNaN(desiredChainId)
      ? getEvmChain().chainId
      : desiredChainId;
    if (chainId === appChainId) {
      MetaMaskConnection();
    } else {
      try {
        await window.ethereum?.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: appChainId }],
        });
        MetaMaskConnection();
      } catch (error) {
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
      <BrowserRouter>
        <ToastContainer />
        <div className="vh-100">
          <Navbar
            unisatAddress={unisatAddress}
            metaMaskAddress={metaMaskAddress}
            connectUnisatWallet={connectUnisatWallet}
            connectMetamaskWallet={connectMetamaskWallet}
            sessionKey={sessionKey}
            type={type}
            setStep={setStep}
            pendingEntryPopup={pendingEntryPopup}
            setPendingEntryPopup={setPendingEntryPopup}
          />

          <Routes>
            <Route
              path="/swap"
              element={
                <HomePage
                  step={step}
                  setStep={setStep}
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
            <Route
              element={<Dashboard appChains={appChains} />}
              path="dashboard"
            />
            <Route element={<LandingPage />} path="/" />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </WagmiConfig>
  );
}

export default App;
