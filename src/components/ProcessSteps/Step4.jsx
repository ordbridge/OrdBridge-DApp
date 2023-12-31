import React from 'react';
import '../../styles/FormStep.css';

export const Step4 = ({ setStep, claimStatus, setClaimButton, setClaimStatus, swap }) => {
  return (
    <>
      <div className="first_container">
        <div className="custom_popup rounded-3xl background_popup text-center">
          <header className="popup_header">
            <div className="text-center">
              <div className="swap_header font-syne">
                {claimStatus === 'failure' ? 'Failed' : 'Successful'}
              </div>
            </div>
          </header>
          <section className="form_data_section3 p-2">
            <div className="fw-normal font-syne">
              {claimStatus === 'failure' ? (
                <>The transaction failed as user rejected</>
              ) : (
                <>
                  Your tokens have been <span className="fw-bold">successfully</span>
                </>
              )}
            </div>
          </section>
          {claimStatus === 'success' && !swap && (
            <section className="form_data_section3 p-2 font-syne">
              <div className="fw-semibold">
                ' However you can check into pendingEntries at anytime.'
              </div>
            </section>
          )}
          {!swap && claimStatus === 'success' && (
            <section className="form_data_section p-2 font-syne">
              <div className="fw-normal flex align-items-center">
                <>Please Wait 30 mins to complete Transaction.</>
              </div>
            </section>
          )}

          <footer className="">
            <button
              className="connect-wallet claim_button font-syne text-white pb-2 bg-gradient-to-r from-purple-500 to-blue-600"
              onClick={() => {
                setClaimButton(false);
                setClaimStatus('success');
                setStep(0);
              }}>
              Initiate Another Bridge
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};
