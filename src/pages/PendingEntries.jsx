import { Dropdown } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { Button, Img, ReactTable } from "../components";
import Text from "../components/Text";
import { pendingEntryService } from "../services/homepage.service";
import "../styles/pending-entries.css";
import AVAX_ABI from "../utils/avax";
import ETH_ABI from "../utils/eth";

export const PendingEntries = ({
  appChains,
  toChain,
  fromChain,
  setToChain,
  setFromChain,
  sessionKey,
  unisatAddress,
  metaMaskAddress,
  setPendingEntryPopup,
  setStep,
  setPendingInscriptionId,
  callContractHandler,
  ClaimEntriesData,
  setPendingEntriesDataById,
  setClaimButton,
  setClaimStatus,
  setMetamaskResponse,
  setTokenName,
  setInitiateBridgeResponse,
  chain,
  connectMetamaskWallet,
}) => {
  const navigate = useNavigate();
  const val = 1000000000000000000;
  const [unprocessedEntries, setUnprocessedEntries] = useState([]);
  const [filterUnprocessedEntries, setFilterUnprocessedEntries] = useState([]);
  const [pendingTickers, setPendngTickers] = useState([]);

  const [chainTypeFilter, setChainTypeFilter] = useState(chain.tag);
  const dropDownItems = [
    {
      label: "ETH",
      value: "BRC_TO_ETH",
      chainType: "ETH",
    },
    {
      label: "AVAX",
      value: "BRC_TO_AVAX",
      chainType: "AVAX",
    },
  ];
  useEffect(() => {
    setClaimButton(false);
    setClaimStatus("success");
    if (sessionKey) {
      pendingEntryService({
        session_key: sessionKey,
        unisatAddress: unisatAddress,
        metaMaskAddress: metaMaskAddress,
      }).then((res) => {
        setUnprocessedEntries(res?.unprocessed);
        const filterData = res?.unprocessed?.filter(
          (ele) => ele.chain === "BRC_TO_ETH",
        );
        setFilterUnprocessedEntries(filterData);
        callContractHandler(res?.pending_tickers);
        setPendngTickers(res?.pending_tickers);
      });
    } else {
      navigate("/");
    }
  }, []);

  const getEvmChain = () => {
    if (fromChain.isEvm) {
      return fromChain;
    } else {
      return toChain;
    }
  };

  const setEntriesNetwork = async (type) => {
    setChainTypeFilter(type);
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const requestedChainId = type === "ETH" ? "0x1" : "0xa86a";
    if (chainId !== requestedChainId) {
      connectMetamaskWallet(requestedChainId);
    }

    const changedChain = type === "ETH" ? appChains[0] : appChains[2];

    if (toChain.isEvm) {
      setToChain(changedChain);
    } else {
      setFromChain(changedChain);
    }
  };

  const getPendingEntries = async ({ type }) => {
    const infuraTag = type === "ETH" ? "mainnet" : "avalanche-mainnet";
    const web3 = new Web3(
      `https://${infuraTag}.infura.io/v3/18b346ece35742b2948e73332f85ad86`,
    );
    const appContractAddress =
      type === "ETH"
        ? "0xa237f89cb12bff9932c7503f854ad881dcead73a"
        : "0xD45De358A33e5c8f1DC80CCd771ae411C3fBd384";
    const ABI = type === "ETH" ? ETH_ABI : AVAX_ABI;
    const contractHandler = new web3.eth.Contract(ABI, appContractAddress);
    try {
      const result = await contractHandler.methods
        .checkPendingERCToClaimForWalletWithTickers(
          metaMaskAddress,
          pendingTickers,
        )
        .call();
      setMetamaskResponse(result);
    } catch (error) {
      console.error(error);
    }
  };

  const claimEntriesColumns = ["Ticker", "Amount", "Wallet Address", "Actions"];
  return (
    <div className="pending_container gap-16">
      <div className="bg-gradient5 border-deep_purple-A200_7f border-solid flex flex-col h-max inset-[0] items-center justify-center m-auto p-[54px] md:px-10 sm:px-5 rounded-[25px] w-[84%]">
        <div className="flex !w-full !m-0">
          <Dropdown
            className="bg-black p-0 m-0 border-red z-10 max-w-[120px] border-none"
            dismissOnClick={true}
            renderTrigger={() => (
              <div className="flex items-center justify-center text-center pt-3 px-4 bg-black border-none text-white rounded-full !w-[160px] !mb-0 cursor-pointer">
                <div className="flex items-center justify-end">
                  <span>{chainTypeFilter}</span>
                  <div>
                    <IoIosArrowDown className="absolute font-white" />
                  </div>
                </div>
              </div>
            )}
          >
            {dropDownItems.map((ele, index) => (
              <Dropdown.Item
                className="hover:outline-none"
                onClick={() => {
                  setEntriesNetwork(ele.label);
                  getPendingEntries({ type: ele.chainType });
                }}
              >
                <div
                  className={`w-full flex justify-center text-white ${
                    index === 0 ? "mt-4" : ""
                  }`}
                >
                  {ele.label}
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown>
          <Text
            className="bg-clip-text bg-gradient6 sm:text-4xl md:text-[38px] text-[40px] text-transparent !w-full text-center !mb-0"
            size="txtSyneBold40DeeppurpleA200"
          >
            Claim pending entries
          </Text>
        </div>
        <div className="min-w-full flex bg-deep_purple-A200_96 gap-2 justify-start rounded-3xl mt-4">
          {claimEntriesColumns?.map((ele, index) => (
            <div className="min-w-1/4 flex justify-center py-2 mb-0">
              <Text
                className="min-w-1/4 text-2xl md:text-[22px] text-white-A700 sm:text-xl w-auto !mb-0"
                size="txtSyneSemiBold24"
              >
                {ele}
              </Text>
            </div>
          ))}
        </div>
        {ClaimEntriesData?.[0]?.length > 0 ? (
          ClaimEntriesData[0]?.map((ele, index) => {
            return (
              <div className="min-w-full flex items-center">
                <div className="min-w-1/4 flex justify-center text-white font-bold font-plusjakartasans">
                  {ele}
                </div>
                <div className="min-w-1/4 flex justify-center text-white font-bold font-plusjakartasans">
                  {ClaimEntriesData[1][index] / val}
                </div>
                <div className="min-w-1/4 flex justify-center text-white font-bold font-plusjakartasans">
                  {metaMaskAddress?.slice(0, 10)}...
                </div>
                <div className="min-w-1/4 flex justify-center text-white font-bold font-plusjakartasans">
                  <button
                    className="rounded-2xl border border-white text-white font-syne py-2 px-6"
                    onClick={() => {
                      setPendingEntryPopup((prev) => !prev);
                      setStep(2);
                      setPendingEntriesDataById([
                        [ele],
                        [ClaimEntriesData[1][index]],
                      ]);
                    }}
                  >
                    Claim Entry
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <Text
            className="text-xl md:text-base text-white-A700_b2 mt-4 !font-normal text-white opacity-70 !mb-0"
            size="txtSyneSemiBold24WhiteA700b2"
          >
            No pending claim entries found
          </Text>
        )}
      </div>

      <div className="bg-gradient5 border-deep_purple-A200_7f border-solid flex flex-col h-max inset-[0] items-center justify-center m-auto p-[54px] md:px-10 sm:px-5 rounded-[25px] w-[84%]">
        <div className="flex !w-full !m-0">
          <Dropdown
            className="bg-black p-0 m-0 border-red z-10 max-w-[120px] border-none"
            dismissOnClick={true}
            renderTrigger={() => (
              <div className="flex items-center justify-center text-center pt-3 px-4 bg-black border-none text-white rounded-full !w-[160px] !mb-0 cursor-pointer">
                <div className="flex items-center justify-end">
                  <span>{chainTypeFilter}</span>
                  <div>
                    <IoIosArrowDown className="absolute font-white" />
                  </div>
                </div>
              </div>
            )}
          >
            {dropDownItems.map((ele, index) => (
              <Dropdown.Item
                className="hover:outline-none"
                onClick={() => {
                  setEntriesNetwork(ele.label);
                  const filterData = unprocessedEntries?.filter(
                    (elem) => elem.chain === ele.value,
                  );
                  setFilterUnprocessedEntries(filterData);
                }}
              >
                <div
                  className={`w-full flex justify-center text-white ${
                    index === 0 ? "mt-4" : ""
                  }`}
                >
                  {ele.label}
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown>

          <Text
            className="bg-clip-text bg-gradient6 sm:text-4xl md:text-[38px] text-[40px] text-transparent !w-full text-center !mb-0"
            size="txtSyneBold40DeeppurpleA200"
          >
            Unprocessed Entries
          </Text>
        </div>
        <div className="min-w-full flex  bg-deep_purple-A200_96 gap-2 justify-start rounded-3xl mt-4">
          {claimEntriesColumns?.map((ele, index) => (
            <div className="min-w-1/4 flex justify-center py-2 mb-0">
              <Text
                className="min-w-1/4 text-2xl md:text-[22px] text-white-A700 sm:text-xl w-auto !mb-0"
                size="txtSyneSemiBold24"
              >
                {ele}
              </Text>
            </div>
          ))}
        </div>
        {filterUnprocessedEntries?.length > 0 ? (
          filterUnprocessedEntries?.map((ele) => {
            return (
              <div className="min-w-full flex items-center">
                <div className="min-w-1/4 flex justify-center text-white font-bold font-plusjakartasans">
                  {ele?.transaction_data?.inscribe_json?.tick}
                </div>
                <div className="min-w-1/4 flex justify-center  text-white font-bold font-plusjakartasans">
                  {ele?.transaction_data?.inscribe_json?.amt}
                </div>
                <div className="min-w-1/4 flex justify-center text-white font-bold font-plusjakartasans">
                  {ele?.transaction_data?.metamask_address?.slice(0, 10)}...
                </div>
                <div className="min-w-1/4 flex justify-center text-white">
                  <button
                    className="rounded-2xl border border-white text-white font-syne py-2 px-6"
                    onClick={() => {
                      setPendingEntryPopup((prev) => !prev);
                      setPendingInscriptionId(ele?.inscription_id);
                      setInitiateBridgeResponse({
                        inscribe: ele?.transaction_data?.inscribe_json,
                      });
                      setTokenName(ele?.transaction_data?.inscribe_json?.tick);
                      setStep(1);
                    }}
                  >
                    Process Entry
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <Text
            className="text-xl md:text-base text-white-A700_b2 mt-4 !font-normal text-white opacity-70 !mb-0"
            size="txtSyneSemiBold24WhiteA700b2"
          >
            No Unprocessed entries found
          </Text>
        )}
      </div>
    </div>
  );
};
