import '../styles/home.page.css';
import React, { useEffect, useState } from 'react';
import { SwapPopup } from '../components/SwapPopup';
import { Footer } from '../components/Footer';
import { Button, Line } from '../components';
import Navbar from '../components/Navbar/Navbar';
import { MdContentCopy, MdOutlineOpenInNew } from 'react-icons/md';
import { toast } from 'react-toastify';
import AVAX_ABI from '../utils/avax';
import ETH_ABI from '../utils/eth';
import Web3 from 'web3';
import ProofOfReserve from '../components/ProofOfReserve';
import axios from 'axios';
import Text from '../components/Text';
import { FaArrowUp } from 'react-icons/fa';
import { UnisatAlertModal } from '../components/UnisatAlertModal';

const HomePage = ({
  toChain,
  setToChain,
  fromChain,
  setFromChain,
  appChains,
  unisatAddress,
  connectUnisatWallet,
  setType,
  type,
  metaMaskAddress,
  connectMetamaskWallet,
  session_key,
  pendingEntryPopup,
  setPendingEntryPopup,
  isMobile,
  setIsMobile
}) => {
  // const [tokenList, setTokenList] = useState([]);
  const [step, setStep] = useState(0);
  const [brcBalances, setBrcBalances] = useState([]);
  const [lastPrice, setLastPrice] = useState(null);
  const [tokenList, setTokenList] = useState([]);
  const [token, setToken] = useState('');
  const [isScrolledToTop, setIsScrolledToTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToTop = window.scrollY === 0;
      setIsScrolledToTop(scrolledToTop);
    };

    // Attach the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  async function copyToClipboard(text) {
    try {
      const toCopy = text.slice(0, text.length);
      await navigator.clipboard.writeText(toCopy);
      toast.success('Copied Value to Clipboard');
    } catch (err) {}
  }

  const ethChain = appChains[0];
  const avaxChain = appChains[2];
  const ethWeb3 = new Web3('https://mainnet.infura.io/v3/18b346ece35742b2948e73332f85ad86');
  const avaxWeb3 = new Web3(
    'https://avalanche-mainnet.infura.io/v3/18b346ece35742b2948e73332f85ad86'
  );
  const ethContractHandler = new ethWeb3.eth.Contract(ETH_ABI, ethChain.contractAddress);
  const avaxContractHandler = new avaxWeb3.eth.Contract(AVAX_ABI, avaxChain.contractAddress);

  useEffect(() => {
    fetch('https://api.ordbridge.io/bapi/token/btc/balance')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const balanceList = data.data[0].balanceList;
        const balances = balanceList.map((item) => ({ token: item.token, balance: item.balance }));

        // console.log('brgeItem', brgeItem);

        setBrcBalances(balances);
      });

    fetch('https://api.ordbridge.io/bapi/reporting')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok for reporting API');
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.data && data.data.length > 0) {
          setLastPrice(data.data[0].lastPrice);
        }
      });
  }, []);

  useEffect(() => {
    (async () => {
      const res = await axios.get('https://api.ordbridge.io/bapi/bridge/tickers_controlled');
      setTokenList(res.data);
      setToken(res.data?.[0]);
    })();
  }, []);
  return (
    <>
      <div className="swap_container">
        <Navbar
          unisatAddress={unisatAddress}
          metaMaskAddress={metaMaskAddress}
          connectUnisatWallet={connectUnisatWallet}
          connectMetamaskWallet={connectMetamaskWallet}
          sessionKey={session_key}
          type={type}
          setStep={setStep}
          pendingEntryPopup={pendingEntryPopup}
          setPendingEntryPopup={setPendingEntryPopup}
        />

        <div className="pt-32 min-h-screen">
          <SwapPopup
            step={step}
            setStep={setStep}
            token={token}
            setToken={setToken}
            toChain={toChain}
            setToChain={setToChain}
            fromChain={fromChain}
            setFromChain={setFromChain}
            appChains={appChains}
            tokenList={tokenList}
            setType={setType}
            type={type}
            unisatAddress={unisatAddress}
            metaMaskAddress={metaMaskAddress}
            connectUnisatWallet={connectUnisatWallet}
            connectMetamaskWallet={connectMetamaskWallet}
            session_key={session_key}
            pendingEntryPopup={pendingEntryPopup}
            setPendingEntryPopup={setPendingEntryPopup}
          />
        </div>

        {!isScrolledToTop && (
          <button
            className="border-1 rounded-full px-4 pt-2 pb-2 mt-2 fixed bottom-8 right-4"
            style={{
              borderWidth: '.001rem !important',
              borderColor: '#281a5e',
              background:
                'linear-gradient(0deg, rgba(150,112,255,1) 0%, rgba(26,20,67,1) 1%, rgba(22,20,63,1) 100%)',
              zIndex: '10000'
            }}>
            <div
              className="flex justify-center items-center cursor-pointer"
              onClick={() => {
                window.scrollTo(0, 0);
              }}>
              <span className="font-syne !text-base uppercase font-normal text-white">
                Go to top
              </span>
              <FaArrowUp className="ml-2 text-[#794EFF]" />
            </div>
          </button>
        )}

        {isMobile && <UnisatAlertModal setIsMobile={setIsMobile} />}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
