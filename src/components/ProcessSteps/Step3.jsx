import React from 'react';
import '../../styles/FormStep.css';
export const Step3 = ({ setStep, handleBack }) => {
  return (
    <>
      <div className="first_container">
        <div className="rounded-xl flex flex-col justify-center items-center swap-popup-container">
          {/* <img src="BackIcon.png" className="back_icon" onClick={handleBack} /> */}
          <header className="popup_header">
            <div className="text-center">
              <div className="swap_header font-syne">Transaction in progress</div>
            </div>
          </header>
          <section className="form_data_section3 font-syne">
            <div>
              Just a sec.. <br />
              We are verifying your transaction
            </div>
          </section>
          <footer className="min-w-full flex items-center">
            <img src="infinity.gif" className="infinity w-[5rem]" alt="" />
          </footer>
        </div>
      </div>
    </>
  );
};
