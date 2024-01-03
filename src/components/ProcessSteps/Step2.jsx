import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../../styles/FormStep.css';
import { claimTokens } from '../../utils/solanaHandler';
import { LuLoader2 } from 'react-icons/lu';

export const Step2 = ({
  ethChain,
  res,
  metaMaskAddress,
  unisatAddress,
  MetamaskClaimHandler,
  pendingEntriesDataById,
  swap,
  token,
  tokenValue,
  burnMetamaskHandler,
  fromChain,
  phantomProvider,
  setStep,
  phantomAddress,
  toChain,
  setClaimStatus
}) => {
  const val = 1000000000000000000;
  const appChainId = ethChain.chainId;

  const [handlingClaim, setHandlingClaim] = useState(false);
  // const [changeNetworkPopup, setChangeNetworkPopup] = useState(false);
  // const handleChangeNetwork = () => {
  //   setChangeNetworkPopup((prev) => !prev);
  // };

  const checkNetwork = async () => {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId === appChainId) {
      MetamaskClaimHandler();
    } else {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: appChainId }]
        });
        MetamaskClaimHandler();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleSolanaClaim = async () => {
    setHandlingClaim(true);

    await claimTokens({
      ticker: pendingEntriesDataById[0][0],
      phantomProvider: phantomProvider,
      setStep,
      setClaimStatus
    });

    setHandlingClaim(false);
  };

  return (
    <>
      <div className="first_container">
        <div className=" bg-[#111331] border border-black rounded-xl form3_container">
          {/* <div
          onClick={() => {
            handleBack();
          }}>
          <img src="BackIcon.png" className="back_icon" />
        </div> */}
          <header className="popup_header">
            <div className="text-center">
              <div className="swap_header">You have done your part :)</div>
            </div>
          </header>
          <section className="bg-[#FFFFFF1A] rounded-xl mt-4" style={{ width: '90%' }}>
            <div className="field_container">
              <div className="form_label">Token Id: </div>
              <div className="form_value">
                $
                {fromChain.tag === 'SOL'
                  ? pendingEntriesDataById?.[0]?.[0]
                  : fromChain.tag === 'BRC'
                  ? token
                  : pendingEntriesDataById
                  ? pendingEntriesDataById?.[0]?.[0]
                  : res[0][0]}
              </div>
            </div>
            <div className="field_container">
              <div className="form_label">Token Amount: </div>
              <div className="form_value">
                {fromChain.tag === 'SOL'
                  ? pendingEntriesDataById?.[1]?.[0]
                  : fromChain.tag === 'BRC'
                  ? tokenValue
                  : pendingEntriesDataById
                  ? pendingEntriesDataById?.[1]?.[0] / val
                  : res[1][0] / val}
              </div>
            </div>
            {swap ? (
              <>
                <div className="field_container">
                  <div className="form_label">From ({fromChain.tag} Address):</div>
                  <div className="form_value">
                    {fromChain.tag === 'SOL'
                      ? phantomAddress.slice(0, 15)
                      : unisatAddress.slice(0, 15)}
                    ....
                  </div>
                </div>
                {/* <div className="field_container">
                  <div className="form_label">To ({toChain.tag} Address):</div>
                  <div className="form_value">
                    {toChain.tag === 'SOL'
                      ? phantomAddress.slice(0, 15)
                      : metaMaskAddress.slice(0, 15)}
                    ....
                  </div>
                </div> */}
              </>
            ) : (
              <>
                <div className="field_container">
                  <div className="form_label">From ({fromChain.tag} Address):</div>
                  <div className="form_value">
                    {fromChain.tag === 'SOL'
                      ? phantomAddress.slice(0, 15)
                      : metaMaskAddress.slice(0, 15)}
                    ....
                  </div>
                </div>
                {/* <div className="field_container">
                  <div className="form_label">To ({toChain.tag} Address):</div>
                  <div className="form_value">
                    {toChain.tag === 'SOL'
                      ? phantomAddress.slice(0, 15)
                      : unisatAddress.slice(0, 15)}
                    ....
                  </div>
                </div> */}
              </>
            )}
          </section>
          {!swap && fromChain.tag !== 'SOL' && (
            <div
              className="mt-3 swap_header fs-6 fw-bold"
              style={{ width: '80%', textAlign: 'center' }}>
              Bridge will take 0.01e as fees to cover gas cost while sending you BRC-20 on Bitcoin
              network.
            </div>
          )}
          <footer className="flex min-w-full p-4">
            <div
              className="connect_wallet_button bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl py-1 cursor-pointer"
              style={{ width: '100%' }}
              onClick={() => {
                if (fromChain.tag === 'BRC') {
                  checkNetwork();
                } else if (fromChain.tag === 'SOL') {
                  handleSolanaClaim();
                } else {
                  burnMetamaskHandler();
                }
              }}>
              <button className="min-w-full initiate_button">
                {handlingClaim && (
                  <span className="flex min-w-full justify-center items-center gap-2 min-w-full text-white font-syne text-xl">
                    <LuLoader2 className="text-white animate-spin" />
                    Processing ...
                  </span>
                )}
                {!handlingClaim && (
                  <span className="min-w-full text-white font-syne text-xl">Claim</span>
                )}
              </button>
            </div>
          </footer>
        </div>
      </div>
      {/* {changeNetworkPopup && <ChangeNetwork onCloseModal={handleChangeNetwork} />} */}
    </>
  );
};
