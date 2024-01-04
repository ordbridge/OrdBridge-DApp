import React from "react";
import HeroBg from "../assets/hero-bg.png";
import OrdThumb from "../assets/ord-thumb.png";
import OrdThumb2 from "../assets/ord-thumb-2.png";
import OrdThumb3 from "../assets/ord-thumb-3.png";
import OrdThumb4 from "../assets/ord-thumb-4.png";
import Banner1 from '../assets/LP-banner-1.png'
import Banner2 from '../assets/LP-banner-2.png'
import Chain1 from "../assets/avax.png";
import Chain2 from '../assets/chain2.png'
import Chain3 from '../assets/chain3.png'
import Chain4 from '../assets/chain4.png'
import Chain5 from '../assets/chain5.png'
import Chain6 from '../assets/chain6.png'
import BoxIcon from '../assets/BoxIcon.svg'
const LandingPage = () => {
  // const FeatureItem = ({ vertical }) => {
  //   return (
  //     <div
  //       className={`landing-page-feature-item ${
  //         vertical && "landing-page-feature-item--vertical"
  //       } `}
  //     >
  //       <div>
  //         <img
  //           className={` ${
  //             vertical
  //               ? "landing-page-feature-item-image--vertical"
  //               : "landing-page-feature-item-image"
  //           }`}
  //           src="https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8178.jpg"
  //           alt=""
  //         />
  //       </div>
  //       <div className="landing-page-feature-item-content-container">
  //         <h1 className="landing-page-feature-item--heading">
  //           Short heading here
  //         </h1>
  //         <p
  //           className="landing-page-feature-item--para"
  //           style={{ color: "rgba(193, 193, 193, 0.64)" }}
  //         >
  //           Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  //         </p>
  //         <button className="landing-page-feature-item--button">
  //           Button &gt;
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  const RoadmapItem = ({last}) => {
      return (
        <div className="flex gap-4 ">
          <div className="flex flex-col  justify-start items-center max-w-[40px] p-0 m-0">
            <img src={BoxIcon}   alt=""/>
            {!last && <div className="h-full max-w-[1px] border m-1" />}
          </div>
          <div className="text-white flex flex-col gap-3 flex-1  py-3">
            <p className="text-gradient font-medium font-grostek">05 JAN</p>
            <p className="font-syne font-medium text-[20px]" >summary of event </p>
            <p className="text-[15px] font-thin font-grostek" >Lorem ipsum dolor sit amet, At cumque dicta distinctio dolorem, ducimus labore molestiae possimus quas
              tempore vel veritatis vitae voluptas.</p>
          </div>
        </div>
      )
  }
  const WhyItem = ({ img }) => {
    return (
      <div className=" flex flex-col items-center gap-3 justify-center">
        <img alt="" src={img} />
        <h3 className="text-white font-medium text-[24px] font-syne ">Any BRC, Any Chain!</h3>
        <p className="text-gray-200 font-light text-[14px] font-grostek text-center ">employs an Optimistic security model to ensure integrity of cross-chain messages</p>
        {/*<button className="text-gradient">Know More &nbsp; &gt;</button>*/}
      </div>
    );
  };

  const ChainIcon = ({icon, name}) => {
    return (
      <div className="chain-icon-container">
        <div className="chain-icon-circle">
          <img src={icon} alt="" className=" sm:min-h-[50px] sm:w-[70px] min-h-[90px] w-[90px] " />
        </div>
        <p className="text-white font-bold font-syne sm:text-[14px]" >{name}</p>
      </div>
    );
  };
  return (
    <div className="landing-page-wrapper">
      <div className="landing-page-hero">
        <div className="landing-page-hero-content">
          <h1 className="landing-page-hero-content--heading">
            Secure cross-chain
            <br />
            communication
          </h1>
          <p className="landing-page-hero-content--para">
            OrdBridge is the most widely used, extensible, secure cross- chain communications network. Build truly cross-chain applications using the OrdBridge Protocol.
          </p>
          <div className="landing-page-hero-content-buttons">
            <button className=" landing-page-hero-content--button--alt">
              Whitepaper
            </button>
            <button className="landing-page-hero-content--button">
              Enter App
            </button>
          </div>
        </div>
        <div className="landing-page-hero-image-wrapper">
          <img
            className="landing-page-hero--image -my-20 "
            src={HeroBg}
            alt=""
          />
        </div>
      </div>
      <div className="landing-page-features">
        <div className="landing-page-features-title">
          <h1 className="landing-page-features--heading">
            Why Choose Ordbridge
          </h1>
          <p className="landing-page-features--para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mx-auto gap-4 my-10">
          <WhyItem img={OrdThumb}  />
          <WhyItem img={OrdThumb2}/>
          <WhyItem img={OrdThumb3}/>
          <WhyItem img={OrdThumb4}/>
        </div>
        {/*<div className="landing-page-features-container">*/}
        {/*  <FeatureItem />*/}
        {/*  <FeatureItem />*/}
        {/*  <FeatureItem vertical={true} />*/}
        {/*</div>*/}
      </div>
      <div className="container max-w-[1320px] mx-auto md:px-5 ">
        <div className="grid grid-cols-2 md:grid-cols-1">
          <div className="flex flex-col  md:max-w-full gap-4 md:items-center md:text-center">
            <p className="text-white text-[20px] font-medium font-syne max-w-[80%] ">Tagline</p>
            <h1 className="text-gradient sm:text-[30px] text-[42px] font-bold font-syne max-w-[80%] ">
              Powering the most popular bridge
            </h1>
            <p className="text-white text-[16px] font-thin font-grostek max-w-[90%]">
              built on top of the cross-chain infrastructure enabling users to seamlessly transfer assets across all blockchains. The Bridge has become the most widely-used method to move assets cross-chain, offering low cost, fast, and secure bridging.
            </p>
            <div className="m-0" >
              <button className="landing-page-hero-content--button--alt">
                Open app
              </button>
            </div>
          </div>
          <div className="md:mt-10" >
            <img
              src={Banner1}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="container max-w-[1440px] mx-auto  py-24">
        <div className="landing-page-features-title">
          <h1 className="landing-page-features--heading">Chains we support</h1>
          <p className="landing-page-features--para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </div>
        <div className=" sm:grid md:grid-cols-3 md:gap-3 flex gap-4 flex-wrap justify-center ">
          <ChainIcon icon={Chain1} name="AVAX" />
          <ChainIcon icon={Chain2} name="BASE" />
          <ChainIcon icon={Chain3} name="ETH" />
          <ChainIcon icon={Chain4} name="BRC" />
          <ChainIcon icon={Chain5} name="ARB" />
          <ChainIcon icon={Chain6} name="SOL" />
        </div>
      </div>
      <div className="container max-w-[1320px] mx-auto md:px-5 ">
        <div className="grid grid-cols-2 md:grid-cols-1 gap-16">
          <div>
            <img
              src={Banner2}
              alt=""
            />
          </div>
          <div className="flex flex-col md:items-center md:text-center  max-w-full  gap-4 md:pt-10">
            <p className="text-white text-[20px] font-medium font-syne">How it works</p>
            <h1 className="text-gradient sm:text-[30px] text-[42px] font-bold font-syne">
              Medium length section heading goes here
            </h1>
            <p className="text-white text-[15px] font-thin font-grostek leading-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusamus, autem dicta dignissimos dolores impedit iure magnam
              maiores molestiae quae quos saepe similique vero voluptate.
              Accusamus blanditiis dolorem ea fugit voluptates?
            </p>
            <div className="m-0" >
              <button className="landing-page-hero-content--button--alt">
                Whitepaper
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-[1320px] mx-auto py-32 md:py-20 md:px-5">
        <div className="grid grid-cols-2 md:grid-cols-1">
          <div className="flex flex-col md:items-center md:text-center items-start justify-start md:max-w-full max-w-[80%] gap-4">
            <h1 className="text-gradient sm:text-[30px] text-[42px] font-bold font-syne">
              OrdBridge Numbers and summary
            </h1>
          </div>
          <div className="text-white md:text-center font-light md:py-10 ">
            <p className="leading-6" >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolor dolorum, esse ex ipsum laborum magnam
              mollitia nam natus placeat porro praesentium quidem quo repellat sed! Laboriosam necessitatibus quisquam
              tempore?</p>
            <div>
              <div className="grid grid-cols-2 gap-10 my-10">
                <div>
                  <h1 className="font-bold text-[40px]">29.5M</h1>
                  <p className="text-gradient font-medium text-[20px] mt-2">Total Bridge Volume</p>
                </div>
                <div>
                  <h1 className="font-bold text-[40px]">29.5M</h1>
                  <p className="text-gradient font-medium text-[20px] mt-2">Total Bridge Volume</p>
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-10 my-10">
                <div>
                  <h1 className="font-bold text-[40px]">29.5M</h1>
                  <p className="text-gradient font-medium text-[20px] mt-2">Total Bridge Volume</p>
                </div>
                <div>
                  <h1 className="font-bold text-[40px]">29.5M</h1>
                  <p className="text-gradient font-medium text-[20px] mt-2">Total Bridge Volume</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-[1320px] mx-auto md:px-5">
        <div className="grid grid-cols-2 md:grid-cols-1">
          <div className="flex flex-col md:max-w-full md:text-center max-w-[80%] gap-4 justify-start md:mb-20">
            <p className="text-gradient font-bold text-[20px] font-syne" >Roadmap</p>
            <h1 className="text-gradient sm:text-[30px] text-[42px] font-bold font-syne">
              Share your journey from the beginning to now
            </h1>
          </div>
          <div className="text-white md:max-w-full max-w-[80%]">
            <RoadmapItem/>
            <RoadmapItem/>
            <RoadmapItem/>
            <RoadmapItem last={true} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;
