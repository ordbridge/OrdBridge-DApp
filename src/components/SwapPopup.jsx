import { Dropdown } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosInformationCircleOutline } from "react-icons/io";
import { LuClock3 } from "react-icons/lu";
import { toast } from "react-toastify";
import Web3 from "web3";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  SystemProgram,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';
import { Buffer } from 'buffer';
import { PendingEntries } from "../pages/PendingEntries";
import { initiateBridge } from "../services/homepage.service";
import AVAX_ABI from "../utils/avax";
import ETH_ABI from "../utils/eth";
import {
  getGlobalState,
  getConfig,
  getWrappedMint,
  getWrappedState,
  getUserAccount
} from "../utils/pdas";
import { AddressPopup } from "./AddressPopup";
import { Button } from "./Button";
import { CustomTokenModal } from "./CustomTokenModal";
import { CustomDropdown } from "./Dropdown";
import ConnectMetaMaskWallet from "./Navbar/ConnectMetaMaskWallet";
import ConnectPhantomWallet from "./Navbar/ConnectPhantomWallet";
import ConnectUnisatWallet from "./Navbar/ConnectUnisatWallet";
import { Step1 } from "./ProcessSteps/Step1";
import { Step2 } from "./ProcessSteps/Step2";
import { Step3 } from "./ProcessSteps/Step3";
import { Step4 } from "./ProcessSteps/Step4";
import usePhantomWallet from "../hooks/usePhantomWallet";

export const SwapPopup = ({
  step,
  setStep,
  token,
  setToken,
  toChain,
  setToChain,
  fromChain,
  setFromChain,
  appChains,
  tokenList,
  unisatAddress,
  connectUnisatWallet,
  setType,
  type,
  metaMaskAddress,
  connectMetamaskWallet,
  phantomAddress,
  connectPhantomWallet,
  session_key,
  pendingEntryPopup,
  setPendingEntryPopup,
  pageLoader,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [swap, setSwap] = useState(true);
  const [addressModal, setAddressModal] = useState(false);
  const [tokenValue, setTokenValue] = useState(1);
  const [modalType, setModalType] = useState("etob");
  const [initiateBridgeResponse, setInitiateBridgeResponse] = useState({});
  const [metaMaskResponse, setMetamaskResponse] = useState();
  const [loader, setLoader] = useState(false);
  const [pendingEntriesDataById, setPendingEntriesDataById] = useState([]);
  const [pendingInscriptionId, setPendingInscriptionId] = useState("");
  const [tokenName, setTokenName] = useState(tokenList[0]);
  const [claimButton, setClaimButton] = useState(false);
  const [claimStatus, setClaimStatus] = useState("success");
  const [fromChainConnected, setFromChainConnected] = useState(false);
  const [toChainConnected, setToChainConnected] = useState(false);

  const { provider: phantomProvider } = usePhantomWallet();

  // isRedundant and is placed in app.jsx as well
  const getEvmChain = () => {
    if (fromChain.isEvm) {
      return fromChain;
    } else {
      return toChain;
    }
  };

  const setChain = (isFrom, chain) => async () => {
    // If user selects the same token on the other side, just swap
    if(
      (isFrom && chain === toChain) ||
      (!isFrom && chain === fromChain)
    ){
      swapChains();
    } 
    // If neither token is BRC, change to other to BRC
    else if (isFrom && chain.tag !== "BRC") {
      setFromChain(chain);
      setToChain(appChains[1]);
    } else if (!isFrom && chain.tag !== "BRC") {
      setToChain(chain);
      setFromChain(appChains[1]);
    }
    else if (isFrom){
      setFromChain(chain);
    } else {
      setToChain(chain);
    }


    if (chain.isEvm) {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId !== chain.chainId) {
        connectMetamaskWallet(chain.chainId);
      }
    }
  };

  const chainConnectButton = (chain) => {
    if(chain.tag === "BRC"){
      return (
        <div
          className="w-full mt-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl py-1 cursor-pointer mt-3"
          onClick={connectUnisatWallet}
        >
        <ConnectUnisatWallet
          onConnectClick={connectUnisatWallet}
          address={unisatAddress}
          text="Connect Wallets"
          />
        </div>
      )
    } else if(chain.tag === "SOL"){
      return (
        <div
          className="w-full mt-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl py-1 cursor-pointer mt-3"
          onClick={connectPhantomWallet}
        >
        <ConnectPhantomWallet
          onConnectClick={connectPhantomWallet}
          address={phantomAddress}
          text="Connect Wallets"
          />
        </div>
      )
    } else {
      return (
        <div
          className="w-full mt-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl py-1 cursor-pointer mt-3"
          onClick={connectMetamaskWallet}
        >
        <ConnectMetaMaskWallet
          onConnectClick={connectMetamaskWallet}
          address={metaMaskAddress}
          text="Connect Wallets"
          />
        </div>
      )
    }
  };

  const fromChainConnectButton = () => {
    return chainConnectButton(fromChain);
  }

  const toChainConnectButton = () => {
    return chainConnectButton(toChain);
  }

  // Handles the 
  useEffect(()=> {
    if(fromChain.tag === "BRC" && unisatAddress && unisatAddress !== "") {
      setFromChainConnected(true);
    } else if(fromChain.tag === "SOL" && phantomAddress && phantomAddress !== ""){
      setFromChainConnected(true);
    } else if(metaMaskAddress && metaMaskAddress !== ""){
      setFromChainConnected(true);
    } else {
      setFromChainConnected(false);
    };

    if(toChain.tag === "BRC" && unisatAddress && unisatAddress !== "") {
      setToChainConnected(true);
    } else if(toChain.tag === "SOL" && phantomAddress && phantomAddress !== ""){
      setToChainConnected(true);
    } else if(metaMaskAddress && metaMaskAddress !== ""){
      setToChainConnected(true);
    } else {
      setToChainConnected(false);
    };

  }, [metaMaskAddress, unisatAddress, phantomAddress, fromChain, toChain])

  useEffect(() => {
    let newType;
    if(fromChain.tag === "BRC"){
      if(toChain.tag === "SOL"){
        newType = "btos"
      } else {
        newType = "btoe"
      }
    } else if(fromChain.tag === "SOL"){
      newType = "stob"
    } else {
      newType = "etob"
    }
    setModalType(newType);
    setSwap(!swap);
    setType(newType);
  }, [fromChain, toChain])

  const swapChains = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  let ref;
  const [tokenResponse, setTokenResponse] = useState({
    conversion_factor: 1,
    to_curreny_factor: 0.7,
    From_curreny_factor: 0.74,
    to_currency: "$",
    from_currency: "$",
    fee_rate_factor: 0.86,
    fee_rate_currency: "$",
  });
  const startInterval = () => {
    ref = setInterval(() => {
      callContractFunction();
    }, 30000);
  };
  const infuraTag =
    getEvmChain().tag === "ETH" ? "mainnet" : "avalanche-mainnet";
  const web3 = new Web3(
    `https://${infuraTag}.infura.io/v3/18b346ece35742b2948e73332f85ad86`,
  );
  const ethWeb3 = new Web3(window.ethereum);
  const appContractAddress = getEvmChain().contractAddress;
  const factoryContractAddress = getEvmChain().factoryAddress;
  const ABI = getEvmChain().tag === "ETH" ? ETH_ABI : AVAX_ABI;
  const contractHandler = new web3.eth.Contract(ABI, appContractAddress);
  const MetaMaskContractHandler = new ethWeb3.eth.Contract(
    ABI,
    appContractAddress,
  );
  const callContractFunction = async () => {
    try {
      const result = await contractHandler.methods
        .checkPendingERCToClaimForWalletWithTickers(metaMaskAddress, [
          tokenName,
        ])
        .call();
      setLoader(true);
      if (result?.[0]?.length > 0) {
        setClaimButton(true);
        setMetamaskResponse(result);
        setPendingEntriesDataById(result);
        setLoader(false);
        clearInterval(ref);
        ref = false;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const PendingCallContractFunction = async (data) => {
    try {
      const result = await contractHandler.methods
        .checkPendingERCToClaimForWalletWithTickers(metaMaskAddress, data)
        .call();

      setMetamaskResponse(result);
      setPendingEntriesDataById(result);
    } catch (error) {
      console.error(error);
    }
  };
  const burnMetamaskHandler = async () => {
    const val = 1000000000000000000;
    const BN = web3.utils.toBN;
    // const DIVIDER = Math.pow(10, 18);
    const amount = new BN(tokenValue).mul(new BN(val));
    try {
      const accounts = await ethWeb3.eth.getAccounts();
      // const bigNumberValue = new BigNumber(tokenValue * val);

      const evmChain = getEvmChain();
      let result;

      if (evmChain.tag === "ETH") {
        const contractHandler = new ethWeb3.eth.Contract(
          ETH_ABI,
          appChains[0].contractAddress,
        );

        result = await contractHandler.methods
          .burnERCTokenForBRC(token, amount, unisatAddress)
          .send({ from: accounts[0] });
      } else {
        const contractHandler = new ethWeb3.eth.Contract(
          AVAX_ABI,
          appChains[2].contractAddress,
        );

        result = await contractHandler.methods
          .burnERCTokenForBRC("BRC", token, amount, unisatAddress)
          .send({ from: accounts[0] });
      }
      setStep(4);
    } catch (error) {
      console.log(error);
      setStep(4);
      setClaimStatus("failure");
      toast.error("User denied Transaction");
    }
  };
  const MetamaskClaimHandler = async () => {
    try {
      const accounts = await ethWeb3.eth.getAccounts();
      setStep(3);

      let contractHandler;

      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId === "0x1") {
        contractHandler = new ethWeb3.eth.Contract(
          ETH_ABI,
          appChains[0].contractAddress,
        );
      } else {
        contractHandler = new ethWeb3.eth.Contract(
          AVAX_ABI,
          appChains[2].contractAddress,
        );
      }

      const result = await contractHandler.methods
        .claimERCEntryForWallet(metaMaskResponse[0][0] || 0)
        .send({ from: accounts[0] });

      setStep(4);
    } catch (error) {
      setStep(4);
      setClaimStatus("failure");
    }
  };

  const signTransactionWithPhantom = async (transaction) => {

    if (!phantomProvider) {
      throw new Error("Wallet is not connected");
    }
  
    const signedTransaction = await phantomProvider.signTransaction(transaction);
    return signedTransaction;
  };

  const burnSolanaTokensHandler = async () => {
    const connection = new Connection(clusterApiUrl('devnet')); // Update URL as needed
    const programId = new PublicKey('gnLppSzkeLGCHrLjhy3pM9rQ8AjnPh6YMz4XBavxu4Y'); // Update with actual program ID
    const walletPublicKey = new PublicKey(phantomAddress);
    const ticker = tokenName;
    const amount = tokenValue * LAMPORTS_PER_SOL; 
  
    // Deriving necessary PDAs
    const globalStateAccount = getGlobalState(programId);
    const configAccount = getConfig(programId);
    const wrappedMintAccount = getWrappedMint(programId, ticker);
    const wrappedStateAccount = getWrappedState(programId, ticker);
    const userAccount = getUserAccount(programId, walletPublicKey);
  
    const burnTokensArgs = {
      chain: fromChain.tag, // TODO: What's the convention here?
      ticker: ticker, 
      amount: web3.utils.toBN(amount),
      crossChainAddress: unisatAddress 
    };

    // Create the transaction to burn tokens
    const transaction = new Transaction().add(
      new TransactionInstruction({
        keys: [
          { pubkey: globalStateAccount, isSigner: false, isWritable: true },
          { pubkey: configAccount, isSigner: false, isWritable: false },
          { pubkey: wrappedMintAccount, isSigner: false, isWritable: true },
          { pubkey: wrappedStateAccount, isSigner: false, isWritable: false },
          { pubkey: userAccount, isSigner: false, isWritable: true },
          { pubkey: walletPublicKey, isSigner: true, isWritable: false },
        ],
        programId,
        data: Buffer.from(JSON.stringify(burnTokensArgs)), // TODO: Needs serialization?
      })
    );

    // Sign and send the transaction
    try {
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = walletPublicKey;

      const signedTransaction = await signTransactionWithPhantom(transaction);
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
      const confirmation = await connection.confirmTransaction({
        signature: signature,
        blockhash: blockhash,
        lastValidBlockHeight: null,
      }, 'finalized');

      // Check confirmation status
      if (confirmation.value.err) {
        throw new Error('Transaction failed: ' + confirmation.value.err);
      }
      // Handle success
      setStep(4);
    } catch (error) {
      console.error('Error burning Solana tokens:', error);
      setStep(4);
      setClaimStatus("failure");
      toast.error("Transaction failed");
    }
  };

  const handleModal = () => {
    setShowModal((prev) => !prev);
  };
  const handleAddressModal = () => {
    setAddressModal((prev) => !prev);
  };
  const handleBack = () => {
    setStep((prev) => prev - 1);
  };
  
  const initateBridgeHandler = async () => {
    setPendingInscriptionId("");
    const body = {
      tickername: swap ? token : "w" + token,
      tickerval: tokenValue,
      unisat_address: unisatAddress,
      metamask_address: metaMaskAddress,
      chain: getEvmChain().tag.toLowerCase(),
    };
    if (tokenValue > 0) {
      initiateBridge({ body: body, session_key: session_key }).then((res) => {
        console.log({ res });
        setStep(1);
        handleAddressModal();
        setInitiateBridgeResponse(res);
      });
    } else {
      toast.error("Please select a specific Token amount");
    }
  };

  const initiateSolanaBridgeHandler = async () => {
    setPendingInscriptionId("");
    const body = {
      tickername: swap ? token : "w" + token,
      tickerval: tokenValue,
      unisat_address: unisatAddress,
      phantom_address: phantomAddress, // TODO: changed this to phantom, but initiateBridge might be fully reusable
      chain: toChain.tag, // TODO: Check convention here
    };
    if (tokenValue > 0) {
      initiateBridge({ body: body, session_key: session_key }).then((res) => {
        console.log({ res });
        setStep(1);
        handleAddressModal();
        setInitiateBridgeResponse(res);
      });
    } else {
      toast.error("Please select a specific Token amount");
    }
  };

  function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <div className="first_container">
              {/* <div className="bg-gradient border border-solid border-yellow-900 flex flex-col gap-9 items-center"> */}

              <div className="px-6 py-3 rounded-3xl background_popup swap_subheading relative sm:px-3">
                <header className="popup_header">
                  <div className="swap_subheading">
                    {swap ? (
                      <div>
                        Select Token
                        {/* <span className="sub_yellow"> BRC-20 </span>Token to Avalanche C-Chain */}
                        {/* <span className="sub_violet">Ethereum chain</span> */}
                      </div>
                    ) : (
                      <div>
                        Select Token
                        {/* <span className="sub_yellow"> ARC-20</span> Token back to BRC-20 */}
                        {/* <span className="sub_yellow">BRC-20</span> */}
                      </div>
                    )}
                  </div>{" "}
                  {/* </div> */}
                </header>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={handleModal}
                    className="border-1 rounded-full px-4 pt-2 pb-2 mt-2"
                    style={{
                      borderWidth: ".001rem !important",
                      borderColor: "#281a5e",
                      background: "rgba(121, 78, 255, 0.10)",
                    }}
                  >
                    <div className="flex justify-center items-center">
                      <span
                        className="font-syne !text-base uppercase font-bold"
                        style={{ color: "#794EFF" }}
                      >
                        {token}
                      </span>
                      <IoIosArrowDown className="ml-2" />
                    </div>
                  </button>

                  <button
                    className="absolute left-2/3 border-1 rounded-full pl-1 pr-3 pt-2 pb-2 mt-2 sm:p-1"
                    style={{
                      borderWidth: ".001rem !important",
                      borderColor: "#281a5e",
                      border: "1px rgba(121, 78, 255, 0.83) solid",
                    }}
                  >
                    <div
                      className="flex justify-center items-center"
                      onClick={() => scrollToElement("proof-of-reserves")}
                    >
                      <IoIosInformationCircleOutline
                        className="ml-2"
                        style={{ color: "#794EFF" }}
                      />
                      <span
                        className="font-syne text-xm normal ml-2 !text-sm sm:!text-[10px]"
                        style={{ color: "#794EFF" }}
                      >
                        Proof of Reserve
                      </span>
                    </div>
                  </button>
                </div>

                <section className="pt-2 relative mt-2">
                  <div>
                    <div className="swap_border pl-6 pr-4 my-1 !py-3 sm:!py-1">
                      <div
                        className="absolute sm:text-xs text-left !mb-1 sm:!mb-2"
                        style={{ color: "rgba(255, 255, 255, 0.40)" }}
                      >
                        Amount (of {token})
                      </div>
                      <div className="min-w-full flex">
                        <input
                          type="number"
                          className="amount_input bg-transparent border-none font-syne text-2xl pl-0 pr-0 mt-1"
                          value={tokenValue}
                          onChange={(e) => {
                            setTokenValue(e.target.value);
                          }}
                        />
                        <div className="flex justify-end items-center gap-4 !mb-0">
                          <CustomDropdown
                            Chain={fromChain}
                            appChains={appChains}
                            setChain={setChain}
                            type={"From"}
                          />
                        </div>
                      </div>
                    </div>

                    {!addressModal && (
                      <div
                        className="swap_icon absolute w-14 h-14 justify-center rounded-full items-center sm:h-7 sm:w-7 sm:top-[30%] top-[28%]"
                        style={{
                          background: "#111331",
                          zIndex: "10",
                          left: "45%",
                        }}
                        onClick={swapChains}
                      >
                        <img
                          src="swap.png"
                          width={20}
                          height={20}
                          onClick={swapChains}
                          className="cursor-pointer h-5 w-5"
                        />
                      </div>
                    )}
                    <div className="swap_border pl-6 pr-4 my-1 !py-3 sm:!py-1">
                      <div
                        className="absolute text-left sm:text-xs"
                        style={{ color: "rgba(255, 255, 255, 0.40)" }}
                      >
                        Amount (of {token})
                      </div>
                      <div className="min-w-full flex">
                        <input
                          disabled
                          value={tokenValue * tokenResponse.conversion_factor}
                          className="amount_input bg-transparent font-syne border-none text-2xl pl-0 pr-0 mt-1"
                        />
                        <span className="flex justify-end items-center gap-4 !mb-0 sm:gap-2 sm:!w-auto">
                          <CustomDropdown
                            Chain={toChain}
                            appChains={appChains}
                            setChain={setChain}
                            type={"To"}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  <footer>
                    {fromChainConnected && toChainConnected ? (
                        <div className="initiate_bridge_cta">
                          <p
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.2rem",
                            }}
                            className="text-sm !mb-2"
                          >
                            Estimated arrival <LuClock3 /> : 3 block confirmations
                          </p>
                          <div
                            onClick={handleAddressModal}
                            className="w-full bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl py-1 cursor-pointer"
                          >
                            <Button
                              className="!text-white-A700 cursor-pointer font-bold font-syne leading-[normal] min-w-[230px] rounded-[29px] text-base text-center"
                              color="deep_purple_A200_a3"
                              size="sm"
                              variant="outline"
                            >
                              Initiate Bridge
                            </Button>
                          </div>
                        </div>
                      ) : fromChainConnected ? toChainConnectButton() : fromChainConnectButton()
                    }
                  </footer>
                </section>
              </div>

              <div className="form_link_description">
                $wBRGE token contract {""}
                <a href="#" target="">
                  {factoryContractAddress}
                </a>
              </div>
              <div className="form_link_description">
                OrdBridge Factory contract {""}
                <a href="#" target="">
                  {appContractAddress}
                </a>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <Step1
            ethChain={getEvmChain()}
            setStep={setStep}
            res={initiateBridgeResponse}
            metaMaskAddress={metaMaskAddress}
            unisatAddress={unisatAddress}
            session_key={session_key}
            startInterval={startInterval}
            callContractFunction={callContractFunction}
            MetamaskClaimHandler={MetamaskClaimHandler}
            setPendingEntryPopup={setPendingEntryPopup}
            metaMaskResponse={metaMaskResponse}
            loader={loader}
            claimButton={claimButton}
            setClaimButton={setClaimButton}
            setLoader={setLoader}
            pendingInscriptionId={pendingInscriptionId}
          />
        );
      case 2:
        return (
          <Step2
            ethChain={getEvmChain()}
            setStep={setStep}
            handleBack={handleBack}
            metaMaskAddress={metaMaskAddress}
            unisatAddress={unisatAddress}
            MetamaskClaimHandler={MetamaskClaimHandler}
            res={metaMaskResponse}
            swap={swap}
            token={token}
            burnMetamaskHandler={burnMetamaskHandler}
            burnSolanaTokensHandler={burnSolanaTokensHandler}
            tokenValue={tokenValue}
            pendingEntriesDataById={pendingEntriesDataById}
          />
        );
      case 3:
        return <Step3 setStep={setStep} handleBack={handleBack} />;
      case 4:
        return (
          <Step4
            setStep={setStep}
            swap={swap}
            handleBack={handleBack}
            claimStatus={claimStatus}
            setClaimButton={setClaimButton}
            setClaimStatus={setClaimStatus}
          />
        );
      default:
        return "Unknown stepIndex";
    }
  };

  const requestChainChange = async () => {
    const chain = getEvmChain();
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== chain.chainId) {
      connectMetamaskWallet(chain.chainId);
    }
  };
  // !pendingEntryPopup && requestChainChange();

  return (
    <div className="mb-20">
      {!pendingEntryPopup && getStepContent(step)}

      {showModal && (
        <CustomTokenModal
          tokenList={tokenList}
          onCloseModal={handleModal}
          token={token}
          setToken={setToken}
          setTokenName={setTokenName}
          type={modalType}
        />
      )}
      {addressModal && (
        <AddressPopup
          toChain={toChain}
          fromChain={fromChain}
          ethChain={getEvmChain()}
          swap={swap}
          onCloseModal={handleAddressModal}
          setStep={setStep}
          initateBridgeHandler={initateBridgeHandler}
          initiateSolanaBridgeHandler={initiateSolanaBridgeHandler}
          metaMaskAddress={metaMaskAddress}
          unisatAddress={unisatAddress}
          phantomAddress={phantomAddress}
          burnMetamaskHandler={burnMetamaskHandler}
          burnSolanaTokensHandler={burnSolanaTokensHandler}
        />
      )}
      {pendingEntryPopup && (
        <PendingEntries
          appChains={appChains}
          toChain={toChain}
          fromChain={fromChain}
          setToChain={setToChain}
          setFromChain={setFromChain}
          setClaimButton={setClaimButton}
          sessionKey={session_key}
          setClaimStatus={setClaimStatus}
          chain={getEvmChain()}
          connectMetamaskWallet={connectMetamaskWallet}
          setTokenName={setTokenName}
          unisatAddress={unisatAddress}
          metaMaskAddress={metaMaskAddress}
          phantomAddress={phantomAddress}
          setPendingEntryPopup={setPendingEntryPopup}
          setStep={setStep}
          callContractHandler={PendingCallContractFunction}
          ClaimEntriesData={metaMaskResponse}
          setMetamaskResponse={setMetamaskResponse}
          setInitiateBridgeResponse={setInitiateBridgeResponse}
          setPendingEntriesDataById={setPendingEntriesDataById}
          setPendingInscriptionId={setPendingInscriptionId}
        />
      )}
    </div>
  );
};
