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
import AvalancheIcon from "./assets/avalanche.png";
import BrcIcon from "./assets/brc.png";
import EthereumIcon from "./assets/ethereum.png";
import SolanaIcon from "./assets/solana.png";
import PhantomProvider from "./contexts/PhantomProvider";
import useMediaQuery from "./hooks/useMediaQuery";
import usePhantomWallet from "./hooks/usePhantomWallet";
import HomePage from "./pages/HomePage";
import { updateAddress } from "./services/homepage.service";
import "./styles.css"; // Import your styles
import "./styles/color.css";
import "./styles/font.css";
import "./styles/index.css";
import "./styles/tailwind.css";

const appChains = [
  {
    isEvm: true,
    name: "ETHEREUM",
    key: "ethchain",
    value: "ETHEREUM",
    tag: "ETH",
    tokenTag: "ERC20",
    chainId: "0x1",
    contractAddress: "0xa237f89cb12bff9932c7503f854ad881dcead73a",
    factoryAddress: "0x6602e9319f2c5ec0ba31ffcdc4301d7ef03b709e",
    icon: EthereumIcon,
  },
  {
    isEvm: false,
    name: "BRC",
    value: "BRC",
    tokenTag: "BRC20",
    tag: "BRC",
    contractAddress: "",
    icon: BrcIcon,
  },
  {
    isEvm: true,
    name: "AVALANCHE",
    key: "avaxchain",
    value: "AVALANCHE",
    tokenTag: "ARC20",
    tag: "AVAX",
    chainId: "0xa86a",
    factoryAddress: "0x5f880678320A9445824bB15d18EF67b5ECbAA42a",
    contractAddress: "0xD45De358A33e5c8f1DC80CCd771ae411C3fBd384",
    icon: AvalancheIcon,
  },
  {
    isEvm: false,
    name: "SOLANA",
    value: "SOLANA",
    tokenTag: "SPL",
    tag: "SOL",
    // factoryAddress: "<SOLANA FACTORY ADDRESS>",
    contractAddress: "",
    icon: SolanaIcon,
  },
];

const { chains, publicClient, webSocketPublicClient } = configureChains(
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
  const [fromChain, setFromChain] = useState(appChains[1]);
  const [toChain, setToChain] = useState(appChains[0]);
  const [unisatAddress, setUnisatAddress] = useState("");
  const [metaMaskAddress, setMetamaskAddress] = useState("");
  const [phantomAddress, setPhantomAddress] = useState("");
  const [userDetails, setUserDetails] = useState();
  const [type, setType] = useState("btoe");
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

  const { connect: connectPhantom, account: phantomAccount } = usePhantomWallet();

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
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const appChainId = isNaN(desiredChainId)
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

  const connectPhantomWallet = async () => {
    if (!phantomAccount || phantomAccount === "") {
      // If not connected, call the connect function from the hook
      await connectPhantom();
    }       
    setPhantomAddress(phantomAccount);
  }

  useEffect(() => {
    // Additional useEffect to handle the case where the account or connection status changes
    if (phantomAccount) {
      setPhantomAddress(phantomAccount);
    }
  }, [phantomAccount]);

  return (
    <WagmiConfig config={config}>
      <ToastContainer />
      <div className="vh-100">
        {/* <Img className="h-[1080px] m-auto object-cover w-full" src="base_bg.svg" /> */}
        <BrowserRouter>
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
                  phantomAddress={phantomAddress}
                  connectUnisatWallet={connectUnisatWallet}
                  isMobile={isMobile}
                  setIsMobile={setIsMobile}
                  connectMetamaskWallet={connectMetamaskWallet}
                  connectPhantomWallet={connectPhantomWallet}
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
