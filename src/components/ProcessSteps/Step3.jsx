import React from "react";
import "../../styles/FormStep.css";
export const Step3 = ({ setStep, handleBack }) => {
  return (
    <>
      <div className="first_container">
        <div className="bg-[#111331] border border-black rounded-xl py-32">
          {/* <img src="BackIcon.png" className="back_icon" onClick={handleBack} /> */}
          <header className="popup_header">
            <div className="text-center">
              <div className="swap_header">Transaction under process</div>
            </div>
          </header>
          <section className="form_data_section3">
            <div>
              Just a sec.. <br />
              We are verifying your transaction
            </div>
          </section>
          <footer className="min-w-full flex items-center">
            <img src="infinity.gif" className="infinity" alt="" />
          </footer>
        </div>
      </div>
    </>
  );
};
