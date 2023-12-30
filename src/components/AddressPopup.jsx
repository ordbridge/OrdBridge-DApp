import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import processIcon from "../assets/Process.svg";
import { ChangeNetwork } from "./ChangeNetwork";

export const AddressPopup = ({
  toChain,
  fromChain,
  ethChain,
  onCloseModal,
  handleConfirm,
  setStep,
  initateBridgeHandler,
  initiateSolanaBridgeHandler,
  unisatAddress,
  metaMaskAddress,
  phantomAddress,
  swap,
  burnMetamaskHandler,
  burnSolanaTokensHandler
}) => {

  const checkNetwork = async () => {
    const appChainId = ethChain.chainId;
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId === appChainId) {
      burnMetamaskHandler();
    } else {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: appChainId }],
        });
        burnMetamaskHandler();
      } catch (error) {
        onCloseModal();
        toast.error(error.message);
      }
    }
    // setStep(2);
    onCloseModal();
  };

  const handleBRC2SOL = async () => {

    onCloseModal();
  };

  const handleSOL2BRC = async () => {
    await burnSolanaTokensHandler();
    onCloseModal();    
  };

  const toChainIsEvm = toChain.isEvm;

  const handleBridgeInitiation = async () => {
    console.log(`Initiating bridge from ${fromChain.tag} to ${toChain.tag}`);
    if(fromChain.tag === "SOL"){
      handleSOL2BRC();
      return
    } else if(toChain.tag === "SOL"){
      initiateSolanaBridgeHandler();
      return
    }
    if(toChainIsEvm){
      initateBridgeHandler()
    } else {
      checkNetwork();
    }
  }

  return (
    <>
      <div id="myModal" className="custom_modal address_modal">
        <div className="confirm_modal rounded-3xl background_popup !z-40">
          <div className="custom_modal-header">
            <div className="modal_address">
              <div className="confirm_modal_head font-syne font-bold text-4xl">
                <img style={{ width: "6rem" }} src={processIcon} />
                <div className="modal_head_gradient_text">
                  Please Verify your
                </div>
                <div className="modal_head_gradient_text">
                  {toChain.tag === "BRC" && "Bitcoin"}
                  {toChain.tag === "SOL" && "Solana"}
                  {toChain.tag === "AVAX" && "Avalanche"}
                  {toChain.tag === "ETH" && "Ethereum"}
                  <span> address</span>
                </div>
              </div>
              <div
                className="address_modal_label rounded-full border-none px-4 py-3"
                style={{ background: "#794EFF33" }}
              >
                  {toChain.tag === "BRC" && unisatAddress}
                  {toChain.tag === "SOL" && phantomAddress}
                  {toChain.tag === "AVAX" && metaMaskAddress}
                  {toChain.tag === "ETH" && metaMaskAddress}
              </div>
              {/* <div className="address_modal_description"> You can not edit or change it later.</div> */}
              <div className="address_modal_description">
                This is where you will receive {toChain.tokenTag} tokens.
              </div>
              <div className="flex">
                <div
                  className="cancel-wallet-button rounded-3xl py-1 cursor-pointer border-1"
                  style={{ borderColor: "#FF4E4E", width: "100%" }}
                  onClick={onCloseModal}
                >
                  <button className="initiate_button">
                    {/* {' '} */}
                    {/* {`<Back`} */}
                    <span className="text-red-500 font-syne text-xl">
                      Cancel
                    </span>
                  </button>
                </div>
                <div
                  className="connect_wallet_button bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl py-1 cursor-pointer"
                  style={{ width: "100%" }}
                  onClick={handleBridgeInitiation}
                >
                  <button className="initiate_button">
                    <span className="text-white font-syne text-xl">
                      Proceed
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
