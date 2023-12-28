import "../styles/home.page.css";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { MdContentCopy, MdOutlineOpenInNew } from "react-icons/md";
import { toast } from "react-toastify";
import Web3 from "web3";
import { Footer } from "../components/Footer";
import ProofOfReserve from "../components/ProofOfReserve";
import { SwapPopup } from "../components/SwapPopup";
import Text from "../components/Text";
import { UnisatAlertModal } from "../components/UnisatAlertModal";
import AVAX_ABI from "../utils/avax";
import ETH_ABI from "../utils/eth";
import { Button, Line } from "../components";

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
  setIsMobile,
}) => {
  // const [tokenList, setTokenList] = useState([]);
  const [step, setStep] = useState(0);
  const [pageLoader, setPageLoader] = useState(true);
  const [brcBalances, setBrcBalances] = useState([]);
  const [lastPrice, setLastPrice] = useState(null);
  const [tokenList, setTokenList] = useState([]);
  const [token, setToken] = useState("");
  const [isScrolledToTop, setIsScrolledToTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToTop = window.scrollY === 0;
      setIsScrolledToTop(scrolledToTop);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  async function copyToClipboard(text) {
    try {
      const toCopy = text.slice(0, text.length);
      await navigator.clipboard.writeText(toCopy);
      toast.success("Copied Value to Clipboard");
    } catch (err) {}
  }

  const ethChain = appChains[0];
  const avaxChain = appChains[2];
  const ethWeb3 = new Web3(
    "https://mainnet.infura.io/v3/18b346ece35742b2948e73332f85ad86",
  );
  const avaxWeb3 = new Web3(
    "https://avalanche-mainnet.infura.io/v3/18b346ece35742b2948e73332f85ad86",
  );
  const ethContractHandler = new ethWeb3.eth.Contract(
    ETH_ABI,
    ethChain.contractAddress,
  );
  const avaxContractHandler = new avaxWeb3.eth.Contract(
    AVAX_ABI,
    avaxChain.contractAddress,
  );

  useEffect(() => {
    fetch("https://api.ordbridge.io/bapi/token/btc/balance")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const balanceList = data.data[0].balanceList;
        const balances = balanceList.map((item) => ({
          token: item.token,
          balance: item.balance,
        }));

        // console.log('brgeItem', brgeItem);

        setBrcBalances(balances);
      });

    fetch("https://api.ordbridge.io/bapi/reporting")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok for reporting API");
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
      const res = await axios.get(
        "https://api.ordbridge.io/bapi/bridge/tickers_controlled",
      );
      setTokenList(res.data);
      setToken(res.data?.[0]);
    })();
  }, []);
  return (
    <>
      <div className="">
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
            pageLoader={pageLoader}
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

        <div className="bg-black min-w-full pt-20 min-h-screen">
          <Text
            className="left-[8%] md:text-5xl text-[64px] text-white-A700 m-0 sm:pl-8 pl-16 rounded"
            size="txtSyneBold64"
          >
            Token Information
          </Text>
          <div className="sm:px-8 px-16">
            <Line className="bg-gradient22  h-[8px] rotate-[-180deg] w-[24%] m-0" />
          </div>

          <div className="hidden sm:block md:block pt-16 px-8 sm:px-8 md:px-16">
            <Text
              className="text-2xl md:text-[22px] text-white-A700 sm:text-xl m-0 p-0"
              size="txtSyneRegular24"
            >
              Name
            </Text>
            <Text
              className="sm:text-4xl md:text-[38px] text-[40px] text-white-A700 m-0 p-0  pb-4"
              size="txtSyneBold40"
            >
              OrdBridge
            </Text>
            <Button
              className="border border-deep_purple-A200_33 border-solid cursor-pointer font-medium leading-[normal] min-w-[273px] mt-[21px] rounded-[10px] text-2xl md:text-[22px] text-center sm:text-xl text-white m-0 p-2"
              color="deep_purple_A200_33"
              size="sm"
              variant="fill"
            >
              Price: ${lastPrice ? lastPrice.substring(0, 7) : "Loading..."}
            </Button>
          </div>

          <div className="min-w-full flex flex-row items-start justify-start sm:px-6 px-12">
            <div className="min-w-full flex sm:flex-col lg:flex-row items-start justify-between">
              <div className="sm:hidden md:hidden lg:block sm:min-w-full sm:max-w-full md:min-w-1/3 md:max-w-1/3 flex pt-20 gap-12">
                <div className="sm:hidden bg-gradient33 flex flex-col h-[190px] items-center justify-start md:mt-0 mt-[5px] p-[30px] sm:px-5 rounded-[5px] min-w-[190px]">
                  <Text
                    className="mb-[46px] mt-[49px] sm:text-[22.06px] md:text-[24.06px] text-[26.06px] text-blue-200"
                    size="txtPlusJakartaSansRomanBold2606"
                  >
                    <span className="text-white-A700 font-syne text-left font-bold">
                      Ord
                    </span>
                    <span className="text-white-A700 font-syne text-left font-normal">
                      Bridge
                    </span>
                  </Text>
                </div>
                <div className="sm:hidden flex flex-col font-syne items-start justify-start md:mt-0 mt-[15px]">
                  <Text
                    className="text-2xl md:text-[22px] text-white-A700 sm:text-xl m-0 p-0"
                    size="txtSyneRegular24"
                  >
                    Name
                  </Text>
                  <Text
                    className="sm:text-4xl md:text-[38px] text-[40px] text-white-A700 m-0 p-0  pb-4"
                    size="txtSyneBold40"
                  >
                    OrdBridge
                  </Text>
                  <Button
                    className="border border-deep_purple-A200_33 border-solid cursor-pointer font-medium leading-[normal] min-w-[273px] mt-[21px] rounded-[10px] text-2xl md:text-[22px] text-center sm:text-xl text-white m-0 p-2"
                    color="deep_purple_A200_33"
                    size="sm"
                    variant="fill"
                  >
                    Price: $
                    {lastPrice ? lastPrice.substring(0, 7) : "Loading..."}
                  </Button>
                </div>
              </div>

              <div className="sm:min-w-full sm:max-w-full md:min-w-2/3 md:max-w-2/3 flex items-start justify-start pt-20">
                <div className="min-w-full flex flex-col font-syne items-start justify-start">
                  <div className="min-w-full flex md:flex-col flex-row items-start justify-between w-full p-0 m-0 mt-10">
                    <Text
                      className="text-md text-orange-50"
                      size="txtSyneMedium32"
                    >
                      BRGE (BRC20)
                    </Text>
                    <div className="m-0 p-0 flex gap-2 items-start justify-end">
                      <Text
                        className="text-md text-white-A700"
                        size="txtSyneMedium32WhiteA700"
                      >
                        Unisat
                      </Text>
                      <MdOutlineOpenInNew
                        style={{ color: "#fff" }}
                        className="mt-0.5 sm:min-w-[18px]"
                        onClick={() => {
                          window.open("https://unisat.io/brc20/BRGE", "_blank");
                        }}
                      />
                      <Text
                        className="text-md text-white-A700"
                        size="txtSyneMedium32WhiteA700"
                      >
                        OkLink
                      </Text>
                      <MdOutlineOpenInNew
                        style={{ color: "#fff" }}
                        className="mt-0.5 sm:min-w-[18px]"
                        onClick={() => {
                          window.open(
                            "https://www.oklink.com/btc/token/brc20/46694089",
                            "_blank",
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="min-w-full flex md:flex-col flex-row items-start justify-between w-full p-0 m-0">
                    <Text
                      className="text-md text-orange-50"
                      size="txtSyneMedium32"
                    >
                      ETH contract address
                    </Text>
                    <div className="m-0 p-0 flex gap-2 justify-end items-start">
                      <Text
                        className="text-md text-white-A700"
                        size="txtSyneMedium32WhiteA700"
                      >
                        0x6602...709e
                      </Text>
                      <MdContentCopy
                        style={{ color: "#fff" }}
                        className="mt-1"
                        onClick={() => {
                          copyToClipboard(
                            "0x6602e9319f2c5ec0ba31ffcdc4301d7ef03b709e",
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="min-w-full flex md:flex-col flex-row items-start justify-between w-full p-0 m-0">
                    <Text
                      className="text-md text-orange-50"
                      size="txtSyneMedium32"
                    >
                      AVAX contract address
                    </Text>
                    <div className="m-0 p-0 flex gap-2 justify-end items-start">
                      <Text
                        className="text-md text-white-A700"
                        size="txtSyneMedium32WhiteA700"
                      >
                        0x5f8...A42a
                      </Text>
                      <MdContentCopy
                        style={{ color: "#fff" }}
                        className="mt-1"
                        onClick={() => {
                          copyToClipboard(
                            "0x5f880678320A9445824bB15d18EF67b5ECbAA42a",
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Text
            className="left-[8%] md:text-5xl text-[64px] text-white-A700 m-0 pl-16 sm:pl-8 pt-16 rounded"
            size="txtSyneBold64"
            id="proof-of-reserves"
          >
            Proof of Reserves
          </Text>
          <div className="sm:pl-8 pl-16">
            <Line className="bg-gradient22  h-[8px] rotate-[-180deg] w-[24%] m-0" />
          </div>

          <div className="min-w-full flex sm:flex-col md:flex-row items-center justify-center sm:pl-8 pl-12 py-16">
            {brcBalances.map((item, index) => {
              return (
                <div className="sm:min-w-full md:min-w-1/3">
                  <ProofOfReserve
                    token={item}
                    avaxWeb3={avaxWeb3}
                    ethWeb3={ethWeb3}
                    avaxContractHandler={avaxContractHandler}
                    ethContractHandler={ethContractHandler}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {!isScrolledToTop && (
          <button
            className="border-1 rounded-full px-4 pt-2 pb-2 mt-2 fixed bottom-8 right-4"
            style={{
              borderWidth: ".001rem !important",
              borderColor: "#281a5e",
              background: "rgb(150,112,255)",
              background:
                "linear-gradient(0deg, rgba(150,112,255,1) 0%, rgba(26,20,67,1) 1%, rgba(22,20,63,1) 100%)",
              zIndex: "10000",
            }}
          >
            <div
              className="flex justify-center items-center cursor-pointer"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
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
