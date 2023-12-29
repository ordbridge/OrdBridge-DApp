import { Dropdown } from 'flowbite-react';
import '../styles/pending-entries.css';
import React, { useEffect, useState } from 'react';
import { pendingEntryService } from '../services/homepage.service';
import { useNavigate } from 'react-router-dom';
import '../styles/pending-entries.css';
import { IoIosArrowDown } from 'react-icons/io';
import Web3 from 'web3';
import ETH_ABI from '../utils/eth';
import AVAX_ABI from '../utils/avax';
import Text from '../components/Text';
import { getChainByTag, getWeb3UrlByTag } from '../utils/chains';

export const PendingEntries = ({
  appChains,
  toChain,
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
  connectMetamaskWallet
}) => {
  const navigate = useNavigate();
  const val = 1000000000000000000;
  const [unprocessedEntries, setUnprocessedEntries] = useState([]);
  const [filterUnprocessedEntries, setFilterUnprocessedEntries] = useState([]);
  const [pendingTickers, setPendngTickers] = useState([]);

  const [chainTypeFilter, setChainTypeFilter] = useState({
    name: chain.tag,
    icon: chain.icon
  });
  const [unprocessedFilter, setUnProcessedFilter] = useState({
    name: chain.tag,
    icon: chain.icon
  });
  const dropDownItems = [
    {
      label: 'ETH',
      value: 'BRC_TO_ETH',
      chainType: 'ETH'
    },
    {
      label: 'AVAX',
      value: 'BRC_TO_AVAX',
      chainType: 'AVAX'
    },
    {
      label: 'BASE',
      value: 'BRC_TO_BASE',
      chainType: 'BASE'
    },
    {
      label: 'ARBI',
      value: 'BRC_TO_ARBI',
      chainType: 'ARBI'
    }
  ];

  useEffect(() => {
    setClaimButton(false);
    setClaimStatus('success');
    if (sessionKey) {
      pendingEntryService({
        session_key: sessionKey,
        unisatAddress: unisatAddress,
        metaMaskAddress: metaMaskAddress
      }).then((res) => {
        setUnprocessedEntries(res?.unprocessed);
        const filterData = res?.unprocessed?.filter((ele) => ele.chain === toChain.chain_flag);
        setFilterUnprocessedEntries(filterData);
        callContractHandler(res?.pending_tickers);
        setPendngTickers(res?.pending_tickers);
      });
    } else {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setEntriesNetwork = async ({ name, icon }) => {
    setChainTypeFilter({ name, icon });
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    const requestedChain = getChainByTag(name);

    if (chainId !== requestedChain.chainId) {
      connectMetamaskWallet(requestedChain.chainId);
    }

    if (toChain.isEvm) {
      setToChain(requestedChain);
    } else {
      setFromChain(requestedChain);
    }
  };

  const getPendingEntries = async ({ type }) => {
    const requestedChain = getChainByTag(type);

    const web3 = new Web3(getWeb3UrlByTag(type));
    const appContractAddress = requestedChain.contractAddress;
    const ABI = type === 'ETH' ? ETH_ABI : AVAX_ABI;
    const contractHandler = new web3.eth.Contract(ABI, appContractAddress);
    try {
      const result = await contractHandler.methods
        .checkPendingERCToClaimForWalletWithTickers(metaMaskAddress, pendingTickers)
        .call();
      setMetamaskResponse(result);
    } catch (error) {
      console.error(error);
    }
  };

  const claimEntriesColumns = ['Ticker', 'Amount', 'Wallet Address', 'Actions'];
  return (
    <div className="pending_container gap-16 pb-8">
      <div className="bg-gradient5 border-deep_purple-A200_7f border-solid flex flex-col h-max inset-[0] items-center justify-center m-auto p-[54px] md:px-10 sm:px-5 rounded-[25px] w-[84%]">
        <div className="flex !w-full !m-0">
          <Dropdown
            className="bg-black p-0 m-0 border-red z-10 max-w-[120px] border-none"
            dismissOnClick={true}
            renderTrigger={() => (
              <div className="flex items-center justify-center text-center py-2 px-4 bg-black border-none text-white rounded-full !w-max !mb-0 cursor-pointer">
                <p className="flex items-center justify-end gap-3">
                  <div className={`flex justify-center text-white gap-2 items-center !mb-0`}>
                    <img
                      src={chainTypeFilter.icon}
                      className="w-[20px]"
                      alt={chainTypeFilter.name}
                    />
                    {chainTypeFilter.name}
                  </div>
                  <IoIosArrowDown className="font-white" />
                </p>
              </div>
            )}>
            {appChains.map((ele, index) => {
              if (ele.tag !== 'BRC') {
                return (
                  <Dropdown.Item
                    className="hover:outline-none"
                    onClick={() => {
                      setEntriesNetwork({ name: ele.tag, icon: ele.icon });
                      getPendingEntries({ type: ele.tag });
                    }}>
                    <div
                      className={`w-full flex justify-center text-white gap-2 items-center !mb-0 my-1`}>
                      <img src={ele.icon} className="w-[20px]" alt={ele.tag} />
                      {ele.tag}
                    </div>
                  </Dropdown.Item>
                );
              }
            })}
          </Dropdown>
          <Text
            className="bg-clip-text bg-gradient6 sm:text-4xl md:text-[38px] text-[40px] text-transparent !w-full text-center !mb-0"
            size="txtSyneBold40DeeppurpleA200">
            Claim pending entries
          </Text>
        </div>
        <div className="min-w-full flex bg-deep_purple-A200_96 gap-2 justify-start rounded-3xl mt-4">
          {claimEntriesColumns?.map((ele, index) => (
            <div className="min-w-1/4 flex justify-center py-2 mb-0">
              <Text
                className="min-w-1/4 text-2xl md:text-[22px] text-white-A700 sm:text-xl w-auto !mb-0"
                size="txtSyneSemiBold24">
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
                      setPendingEntriesDataById([[ele], [ClaimEntriesData[1][index]]]);
                    }}>
                    Claim Entry
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <Text
            className="text-xl md:text-base text-white-A700_b2 mt-4 !font-normal text-white opacity-70 !mb-0"
            size="txtSyneSemiBold24WhiteA700b2">
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
              <div className="flex items-center justify-center text-center py-2 px-4 bg-black border-none text-white rounded-full !w-max !mb-0 cursor-pointer">
                <p className="flex items-center justify-end gap-3">
                  <div className={`flex justify-center text-white gap-2 items-center !mb-0`}>
                    <img
                      src={unprocessedFilter.icon}
                      className="w-[20px]"
                      alt={unprocessedFilter.name}
                    />
                    {unprocessedFilter.name}
                  </div>
                  <IoIosArrowDown className="font-white" />
                </p>
              </div>
            )}>
            {appChains.map((ele, index) => {
              if (ele.tag !== 'BRC') {
                return (
                  <Dropdown.Item
                    className="hover:outline-none"
                    onClick={() => {
                      setUnProcessedFilter({ name: ele.tag, icon: ele.icon });
                      const filterData = unprocessedEntries?.filter(
                        (elem) => elem.chain === ele.chain_flag
                      );
                      setFilterUnprocessedEntries(filterData);
                    }}>
                    <div
                      className={`w-full flex justify-center text-white gap-2 items-center !mb-0 my-1`}>
                      <img src={ele.icon} className="w-[20px]" alt={ele.tag} />
                      {ele.tag}
                    </div>
                  </Dropdown.Item>
                );
              }
            })}
          </Dropdown>

          <Text
            className="bg-clip-text bg-gradient6 sm:text-4xl md:text-[38px] text-[40px] text-transparent !w-full text-center !mb-0"
            size="txtSyneBold40DeeppurpleA200">
            Unprocessed Entries
          </Text>
        </div>
        <div className="min-w-full flex  bg-deep_purple-A200_96 gap-2 justify-start rounded-3xl mt-4">
          {claimEntriesColumns?.map((ele, index) => (
            <div className="min-w-1/4 flex justify-center py-2 mb-0">
              <Text
                className="min-w-1/4 text-2xl md:text-[22px] text-white-A700 sm:text-xl w-auto !mb-0"
                size="txtSyneSemiBold24">
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
                <div className="min-w-1/4 flex justify-center">
                  <p
                    className="rounded-2xl font-syne py-2 px-6 cursor-pointer !mb-0 text-base font-normal"
                    style={{ border:'1px solid rgba(121, 78, 255, 0.8)',color:"white" }}
                    onClick={() => {
                      setPendingEntryPopup((prev) => !prev);
                      setPendingInscriptionId(ele?.inscription_id);
                      setInitiateBridgeResponse({
                        inscribe: ele?.transaction_data?.inscribe_json
                      });
                      setTokenName(ele?.transaction_data?.inscribe_json?.tick);
                      setStep(1);
                    }}>
                    Process Entry
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <Text
            className="text-xl md:text-base text-white-A700_b2 mt-4 !font-normal text-white opacity-70 !mb-0"
            size="txtSyneSemiBold24WhiteA700b2">
            No Unprocessed entries found
          </Text>
        )}
      </div>
    </div>
  );
};
