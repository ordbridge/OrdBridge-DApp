import React from 'react';
import { toast } from 'react-toastify';
import '../../styles/FormStep.css';

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
  burnSolanaTokensHandler,
  fromChain
}) => {
  const val = 1000000000000000000;
  const appChainId = ethChain.chainId;
  // const [changeNetworkPopup, setChangeNetworkPopup] = useState(false);
  // const handleChangeNetwork = () => {
  //   setChangeNetworkPopup((prev) => !prev);
  // };

  console.log(fromChain);
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
            {swap ? (
              <>
                <div className="field_container">
                  <div className="form_label">Token Id: </div>
                  <div className="form_value">
                    ${pendingEntriesDataById ? pendingEntriesDataById?.[0]?.[0] : res[0][0]}
                  </div>
                </div>
                <div className="field_container">
                  <div className="form_label">Token Amount: </div>
                  <div className="form_value">
                    {pendingEntriesDataById
                      ? pendingEntriesDataById?.[1]?.[0] / val
                      : res[1][0] / val}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="field_container">
                  <div className="form_label">Token Id: </div>
                  <div className="form_value">${token}</div>
                </div>
                <div className="field_container">
                  <div className="form_label">Token Amount: </div>
                  <div className="form_value">{tokenValue} </div>
                </div>
              </>
            )}
            {swap ? (
              <>
                <div className="field_container">
                  <div className="form_label">From (BTC Address):</div>
                  <div className="form_value">{unisatAddress.slice(0, 15)}....</div>
                </div>
                <div className="field_container">
                  <div className="form_label">To (ETH Address):</div>
                  <div className="form_value">{metaMaskAddress.slice(0, 15)}....</div>
                </div>
              </>
            ) : (
              <>
                <div className="field_container">
                  <div className="form_label">To (ETH Address):</div>
                  <div className="form_value">{metaMaskAddress.slice(0, 15)}....</div>
                </div>
                <div className="field_container">
                  <div className="form_label">From (BTC Address):</div>
                  <div className="form_value">{unisatAddress.slice(0, 15)}....</div>
                </div>
              </>
            )}
          </section>
          {!swap && (
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
                  burnSolanaTokensHandler();
                } else {
                  burnMetamaskHandler();
                }
              }}>
              <button className="min-w-full initiate_button">
                <span className="min-w-full text-white font-syne text-xl">Claim</span>
              </button>
            </div>
          </footer>
        </div>
      </div>
      {/* {changeNetworkPopup && <ChangeNetwork onCloseModal={handleChangeNetwork} />} */}
    </>
  );
};
