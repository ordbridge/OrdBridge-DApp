import React, { useEffect, useMemo, useState } from "react";
import { MdContentCopy, MdExposurePlus1, MdOutlineLock } from "react-icons/md";
import { LiaStickyNoteSolid } from "react-icons/lia";
import { AiOutlineYoutube, AiOutlineCheckCircle } from "react-icons/ai";
import "../../styles/FormStep.css";
import { toast } from "react-toastify";
import StepWizard from "react-step-wizard";
import {
  fetchFeeRate,
  inscribeService,
  transferService,
} from "../../services/homepage.service";
import { ThreeDots } from "react-loader-spinner";
import YoutubeEmbed from "../YoutubeEmbed";
import { IoIosAdd } from "react-icons/io";
import { LuMinus } from "react-icons/lu";

export const Step1 = ({
  ethChain,
  setStep,
  res,
  metaMaskAddress,
  unisatAddress,
  session_key,
  callContractFunction,
  metaMaskResponse,
  loader,
  setLoader,
  pendingInscriptionId,
  claimButton,
  setClaimButton,
  startInterval,
  setPendingEntryPopup,
}) => {
  const appChainKey = ethChain.key;

  const [networkType, setNetworkType] = useState("testnet");
  const [inscribe, setInscribe] = useState(false);
  const [transferred, setTransferred] = useState(false);
  const [hideContent, setHideContent] = useState(true);
  const [inscriptionAddress, setInscriptionAddress] =
    useState(pendingInscriptionId);
  const [finalInscriptionId, setFinalInscriptionId] = useState("");
  const [transferLoader, setTransferLoader] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [processStep, setProcessStep] = useState(0);
  const [embedId, setEmbedId] = useState("oRRauF_tzV8");
  const [feeRate, setFeeRate] = useState("");
  useEffect(() => {
    if (pendingInscriptionId) {
      setInscribe(true);
    }

    fetchFeeRate().then((res) => {
      setFeeRate(Math.floor(res.limits["min"] + res.limits["max"]) / 2);
    });
  }, []);
  const transferInscrptionHandler = async () => {
    setTransferLoader(true);
    try {
      const data = await window.unisat.sendInscription(
        "bc1q0yufnf24ksfcj8vg32rrmun87vltnrfg6qzd7x",
        finalInscriptionId,
        {
          feeRate: feeRate,
        },
      );
      setTransferred(true);
      setTransferLoader(false);
      setLoader(true);
      startInterval();
      setHideContent(false);
    } catch (error) {
      setTransferLoader(false);
      toast.error(error.message);
    }
    // transferService({ session_key: session_key, InscriptionId: inscriptionAddress }).then((res) => {
    //   setInscriptionIdButton(true);
    //   setTransferred(true);
    //   setTransferLoader(false);
    //   setLoader(true);
    //   startInterval();
    // });
  };

  const inscribeHandler = async ({ nextStep, setProcessStep }) => {
    await inscribeService({
      res: res,
      metaMaskAddress: metaMaskAddress,
      unisatAddress: unisatAddress,
    });
    window.open("https://unisat.io/inscribe", "_blank");
    setInscribe(true);
    // setTimeout(() => {
    //   setProcessStep((prev) => prev + 1);
    //   nextStep();
    // }, 2000);
    // inscribeService({ res, metaMaskAddress, unisatAddress, session_key }).then((res) => {
    //   setInscriptionAddress(res?.inscription_id);
    //   setInscribe(true);
  };

  const switchNetworkHandler = async () => {
    try {
      let res = await window.unisat.switchNetwork(networkType);
      console.log(res);
      setNetworkType((prev) => (prev === "testnet" ? "livenet" : "testnet"));
    } catch (e) {
      console.log(e);
    }
  };
  async function copyToClipboard(text) {
    try {
      const toCopy = text.slice(0, text.length);
      await navigator.clipboard.writeText(toCopy);
      toast.success("Copied JSON");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }
  const handleStepChange = (e) => {
    setActiveStep(e.activeStep - 1);
  };

  let inscribeJSON = (
    <>
      {" "}
      {"{"}
      <br />
      "p": "{res?.inscribe?.p}", <br />
      "op": "{res?.inscribe?.op}", <br />
      "tick": "{res?.inscribe?.tick}", <br />
      "amt": "{res?.inscribe?.amt}", <br />"{appChainKey}": "
      {res?.inscribe[appChainKey]}"
      <br />
      {"}"}
    </>
  );

  let textJSON = {
    p: `${res?.inscribe?.p}`,
    op: `${res?.inscribe?.op}`,
    tick: `${res?.inscribe?.tick}`,
    amt: `${res?.inscribe?.amt}`,
  };
  textJSON[appChainKey] = `${res?.inscribe[appChainKey]}`;

  const InscribeStep = (props) => {
    const [inscriptionId, setInscriptionId] = useState("");
    const [inscriptionIdButton, setInscriptionIdButton] = useState(true);
    const [expandedState, setExpandedState] = useState(false);
    const checkInscriptionId = (id) => {
      if (id.length === 66) {
        setInscriptionIdButton(false);
      } else {
        setInscriptionIdButton(true);
      }
    };
    const inscriptionHandler = ({ nextStep, setProcessStep }) => {
      setProcessStep((prev) => prev + 1);
      nextStep();
      props.setFinalInscriptionId(inscriptionId);
    };
    return (
      <>
        {props.currentStep === 1 && (
          <div
            className={`${!expandedState && "inscribeForm_container"}`}
            //  style={{width: `${ expandedState && '100%'}`}}
          >
            <div
              className="inscribe_list_heading min-w-full  font-syne text-sm text-center"
              style={{ color: "rgba(255, 255, 255, 0.70)" }}
            >
              {/* <div className="font-syne "></div> */}
              Inscribe this text via unisat website
            </div>

            {/* {inscribe && !expandedState && (
              <div
                className="w-full pt-4 flex items-center justify-end my-2 gap-2 cursor-pointer font-bold"
                onClick={() => {
                  copyToClipboard(JSON.stringify(textJSON));
                }}>
                Copy inscription JSON <MdContentCopy style={{ color: '#794EFF' }} />
              </div>
            )} */}

            <div
              className={`active_button rounded-lg font-syne text-s font-normal flex justify-between items-center`}
              style={{ color: "ffffff" }}
              onClick={() => {
                {
                  setExpandedState(!expandedState);
                }
              }}
            >
              <span>
                <span className="font-bold mr-2" style={{ color: "#B9A4F9" }}>
                  Step 1:
                </span>
                <span>Inscribe on Unisat</span>
              </span>
              {expandedState ? (
                <LuMinus className="w-6 h-6" />
              ) : (
                <IoIosAdd className="w-6 h-6" />
              )}
            </div>

            {expandedState && (
              <div className="inscribe_json max-w-[400px] rounded-md">
                {inscribeJSON}
                <>
                  <MdContentCopy
                    style={{ color: "#794EFF" }}
                    onClick={() => {
                      copyToClipboard(JSON.stringify(textJSON));
                    }}
                  />
                </>
              </div>
            )}

            {inscribe && (
              <div
                className={`${
                  inscribe ? "active_button" : "inactive_button"
                } rounded-lg font-syne text-s font-normal flex justify-between items-center`}
                style={{
                  color: `${
                    !inscribe ? "rgba(255, 255, 255, 0.40)" : "#ffffff"
                  }`,
                }}
              >
                <span>
                  <span
                    className="font-bold mr-2"
                    style={{ color: `${!inscribe ? "#B9A4F980" : "#B9A4F9"}` }}
                  >
                    Step 2:
                  </span>
                  <span>Enter generated Inscription ID </span>
                </span>
                {inscribe ? (
                  <LuMinus className="w-6 h-6" />
                ) : (
                  <MdOutlineLock className="w-6 h-6" />
                )}
              </div>
            )}

            {inscribe && (
              <>
                <div className="inscribe_address_label">
                  {/* <div className="step_number"></div>  */}
                  {/* Enter inscription ID generated */}
                  <a
                    href={`https://unisat.io/brc20?t=1687336457213&q=${unisatAddress}`}
                    target="_blank"
                    className="fw-normal font-syne text-sm font-normal"
                    style={{ color: "#7A6FF2" }}
                  >
                    Click here
                  </a>
                  <span className="font-syne text-sm font-normal">
                    to check the inscription ID you created.
                  </span>
                </div>
                <div className="font-syne mt-4 text-base font-medium">
                  Enter your generated ID
                </div>
                <input
                  key="text"
                  className="amount_input border-none font-syne text-4xl pl-4 pr-4 rounded-md"
                  style={{ background: "rgba(121, 78, 255, 0.20)" }}
                  autoFocus="autoFocus"
                  name="inscriptionId"
                  type="text"
                  // placeholder="Enter inscription id."
                  value={props.inscriptionId}
                  onChange={(e) => {
                    e.preventDefault();
                    setInscriptionId(e.target.value);
                    checkInscriptionId(e.target.value);
                  }}
                />
                {inscriptionIdButton && inscriptionId.length > 0 && (
                  <div className="error_text">
                    Inscription Id must have 66 characters
                  </div>
                )}
                {/* <div
                className='connect_wallet_button text-center bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl py-1 cursor-pointer'>
                <button
                  className={inscriptionIdButton ? 'inactive_button' : 'active_button'}
                  disabled={inscriptionIdButton}
                  onClick={() => {
                    inscriptionHandler({
                      nextStep: props.nextStep,
                      setProcessStep: setProcessStep
                    });
                  }}>
                  Transfer to OrdBridge
                </button>
                </div> */}
                <div
                  className="connect_wallet_button text-center bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl py-1 cursor-pointer"
                  style={{ width: "100%" }}
                  onClick={
                    inscriptionIdButton
                      ? () => {
                          toast.warning(
                            "Please enter a valid inscription ID to proceed.",
                          );
                        }
                      : () => {
                          inscriptionHandler({
                            nextStep: props.nextStep,
                            setProcessStep: setProcessStep,
                          });
                        }
                  }
                >
                  <button className="">
                    <span className="text-white font-syne text-xl">
                      Transfer to OrdBridge
                    </span>
                  </button>
                </div>
              </>
            )}
            {!expandedState && !inscribe ? (
              <div className="youtube_container sm_yt flex flex-col">
                <div className="flex min-w-full">
                  <YoutubeEmbed embedId={embedId} />
                  <div className="fw-normal flex gap-2 flex-column">
                    {/* <AiOutlineYoutube color="#d9d9d9" fontSize={30} /> */}
                    <span className="font-syne text-xl">
                      A guide to follow on how to setup inscription
                    </span>
                    <span
                      className="font-syne text-xs"
                      style={{ color: "rgba(255, 255, 255, 0.60)" }}
                    >
                      2min 05s
                    </span>
                  </div>
                </div>
                <div
                  className="connect_wallet_button text-center bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl py-1 cursor-pointer"
                  style={{ width: "100%" }}
                  onClick={() => {
                    {
                      !inscribe &&
                        inscribeHandler({
                          nextStep: props.nextStep,
                          setProcessStep: setProcessStep,
                        });
                    }
                  }}
                >
                  <button className="">
                    <span className="text-white font-syne text-xl">
                      Inscribe on Unisat
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              !inscribe && (
                <div
                  className="connect_wallet_button text-center bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl py-1 cursor-pointer"
                  style={{ width: "100%" }}
                  onClick={() => {
                    {
                      !inscribe &&
                        inscribeHandler({
                          nextStep: props.nextStep,
                          setProcessStep: setProcessStep,
                        });
                    }
                  }}
                >
                  <button className="">
                    <span className="text-white font-syne text-xl">
                      Inscribe on Unisat
                    </span>
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </>
    );
  };

  const TransferStep = () => {
    return (
      <div className="transfer_section md:p-5">
        {hideContent && (
          <>
            <div className="inscribe_list_heading">
              You're sending 'transfer' inscription to given OrdBridge Wallet.
            </div>
            <div className="inscribe_address_label">
              bc1q0yufnf24ksfcj8vg32rrmun87vltnrfg6qzd7x
            </div>
            <button
              className={"active_button"}
              onClick={() => {
                transferInscrptionHandler();
              }}
            >
              Send to OrdBridge
            </button>
          </>
        )}

        {loader && (
          <div className="min-w-full flex flex-col justify-center items-center">
            <div className="waiting_text fs-5 fw-bolder">
              Your transaction has been sent successfully!
            </div>
            <AiOutlineCheckCircle color="green" className="fs-1 ms-2" />
            <div className="waiting_text fs-6 fw-normal">
              Kindly wait for 2 blocks confirmation (around 30mins). <br />
              <b className="font-bold">
                You can close the tab and come back later in pending entries to
                claim.
              </b>
            </div>
            <div className="min-w-full flex justify-center text-center mt-4">
              <img src="infinity.gif" className="infinity" />
            </div>
            <div className="waiting_text fs-5 fw-bold">
              Waiting for confirmation
            </div>
          </div>
        )}

        {claimButton && (
          <footer className="claim_button_container">
            <button
              className="connect-wallet claim_button"
              onClick={() => {
                setClaimButton(false);
                setStep(2);
              }}
            >
              Claim
            </button>
          </footer>
        )}
      </div>
    );
  };
  return (
    <>
      <div className="first_container">
        <div className="custom_popup form2_container rounded-3xl background_popup">
          <div className="form_container">
            {/* <img src="BackIcon.png" className="back_icon" /> */}
            <header className="popup_header">
              <div className="text-center">
                <div className="swap_header modal_head_gradient_text font-syne">
                  {/* <div className="step_number">1</div>  */}
                  Inscribe & transfer
                </div>
              </div>
            </header>
            <section className="form_data_section">
              {/* <Stepper activeStep={processStep}>
              <Step label="Inscribe" />
              <Step label="Transfer" />
            </Stepper> */}
              <StepWizard onStepChange={handleStepChange}>
                {/* {!pendingInscriptionId && ( */}
                <InscribeStep
                  setProcessStep={setProcessStep}
                  setFinalInscriptionId={setFinalInscriptionId}
                />
                {/* )} */}
                <TransferStep />
              </StepWizard>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
