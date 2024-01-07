import React from "react";
import HeroBg from "../assets/hero-bg.png";
import OrdThumb from "../assets/ord-thumb.png";
import OrdThumb2 from "../assets/ord-thumb-2.png";
import OrdThumb3 from "../assets/ord-thumb-3.png";
import OrdThumb4 from "../assets/ord-thumb-4.png";
import Banner1 from "../assets/LP-banner-1.png";
import Banner2 from "../assets/LP-banner-2.png";
import Chain1 from "../assets/avax.png";
import Chain2 from "../assets/chain2.png";
import Chain3 from "../assets/chain3.png";
import Chain4 from "../assets/chain4.png";
import Chain5 from "../assets/chain5.png";
import Chain6 from "../assets/chain6.png";
import BoxIcon from "../assets/BoxIcon.svg";

const roadmapData = [
  {
    date: "W3 DEC",
    title: "Revamped Ul & Dashboard",
    desc: "Revamped Ul for easy bridging & dashboard for live bridge volume & pair trading.",
  },
  {
    date: "W3 DEC",
    title: "AVAX Chain Launch",
    desc: "Bridge to AVAX launch, users will be able bridge BRC20 tokens between BRC20, ETH chain & AVAX. LP pool for SWBRGE will also go live.",
  },
  {
    date: "W4 DEC",
    title: "Bridge to Base, Arbitrum",
    desc: "OrdBridge will expand to Base & Arbitrum as well, expanding reach of BRC20 tokens to other EVM chains.",
  },
  {
    date: "W4 DEC",
    title: "Bridge to Solana",
    desc: "Most awaited bridge to Solana, as our first non- EVM bridge for BRC20 tokens. BRC20 tokens will be available on Solana.",
  },
  {
    date: "W1 JAN",
    title: "Revenue Generation & distribution to Stakers",
    desc: "Ordbridge wil enable revenue generation & distribution to SWBRGE token stakers.",
  },
  {
    date: "W2 JAN",
    title: "OrdBRidge Launchpad ",
    desc: "Enabling multichain faunch of BRC20 tokens.",
  },
  {
    date: "W4 JAN",
    title: "CBRC & Stamps Multichain ",
    desc: "Launching new inscription standards,enabling muttichain trading for those",
  },
];
const LandingPage = () => {
  const RoadmapItem = ({ last, date, title, desc }) => {
    return (
      <div className="flex gap-4 ">
        <div className="flex flex-col  justify-start items-center max-w-[40px] p-0 m-0">
          <img src={BoxIcon} alt="" />
          {!last && <div className="h-full max-w-[1px] border m-1" />}
        </div>
        <div className="text-white flex flex-col gap-3 flex-1  py-3">
          <p className="text-gradient font-medium font-grostek">{date}</p>
          <p className="font-syne font-medium text-[20px]">{title}</p>
          <p className="text-[15px] font-thin font-grostek">{desc}</p>
        </div>
      </div>
    );
  };
  const WhyItem = ({ img, title, para }) => {
    return (
      <div className=" flex flex-col items-center gap-3 justify-center">
        <img alt="" src={img} />
        <h3 className="text-white font-medium text-[24px] font-syne ">
          {title}
        </h3>
        <p className="text-gray-200 font-light text-[14px] leading-6 font-grostek text-center ">
          {para}
        </p>
        {/*<button className="text-gradient">Know More &nbsp; &gt;</button>*/}
      </div>
    );
  };

  const ChainIcon = ({ icon, name }) => {
    return (
      <div className="chain-icon-container">
        <div className="chain-icon-circle">
          <img
            src={icon}
            alt=""
            className=" sm:min-h-[50px] sm:w-[50px] min-h-[90px] w-[90px] "
          />
        </div>
        <p className="text-white font-bold font-syne sm:text-[14px] mt-3">
          {name}
        </p>
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
            OrdBridge is the most widely used, extensible, secure cross- chain
            communications network. Build truly cross-chain applications using
            the OrdBridge Protocol.
          </p>
          <div className="landing-page-hero-content-buttons">
            <button
              className=" landing-page-hero-content--button--alt"
              onClick={() => {
                window.open(
                  "https://ordbridge-organization.gitbook.io/ordbridge-a-2-way-bridge-between-brc20-and-erc20/",
                  "_blank",
                );
              }}
            >
              How it works?
            </button>
            <button
              className="landing-page-hero-content--button  "
              onClick={() => {
                window.open("/bridge");
              }}
            >
              Enter App
            </button>
          </div>
        </div>
        <div className="landing-page-hero-image-wrapper "/>
      </div>
      <div className="landing-page-features">
        <div className="landing-page-features-title">
          <h1 className="landing-page-features--heading">
            Why Choose Ordbridge
          </h1>
          {/*<p className="landing-page-features--para">*/}
          {/*  Lorem ipsum dolor sit amet, consectetur adipiscing elit*/}
          {/*</p>*/}
        </div>
        <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mx-auto gap-4 my-10">
          <WhyItem
            img={OrdThumb}
            title="Any BRC, Any Chain!"
            para="employs an Optimistic security model to ensure integrity of cross-chain messages"
          />
          <WhyItem
            img={OrdThumb2}
            title="Permissionless"
            para="employs an Optimistic security model to ensure integrity of cross-chain messages"
          />
          <WhyItem
            img={OrdThumb3}
            title="No-slippage Bridge"
            para="employs an Optimistic security model to ensure integrity of cross-chain messages"
          />
          <WhyItem
            img={OrdThumb4}
            title="Fractionalization of BRC20"
            para="employs an Optimistic security model to ensure integrity of cross-chain messages"
          />
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
            {/*<p className="text-white text-[20px] font-medium font-syne max-w-[80%] ">*/}
            {/*  Tagline*/}
            {/*</p>*/}
            <h1 className="text-gradient sm:text-[30px] text-[42px] font-bold font-syne max-w-[80%] ">
              Bridge any BRC token
            </h1>
            <p className="text-white text-[16px] font-thin font-grostek max-w-[90%]">
              built on top of the cross-chain infrastructure enabling users to
              seamlessly transfer assets across all blockchains. The Bridge has
              become the most widely-used method to move assets cross-chain,
              offering low cost, fast, and secure bridging.
            </p>
            <div className="m-0">
              <button className="landing-page-hero-content--button--alt px-[30px] py-[15px]">
                Open App
              </button>
            </div>
          </div>
          <div className="md:mt-10 md:flex md:justify-center">
            <img src={Banner1} alt="" />
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
        <div className=" sm:flex md:grid-cols-3 md:gap-3 flex gap-4 flex-wrap justify-center ">
          <ChainIcon icon={Chain1} name="AVAX" />
          <ChainIcon icon={Chain2} name="BASE" />
          <ChainIcon icon={Chain3} name="ETH" />
          <ChainIcon icon={Chain4} name="BRC" />
          <ChainIcon icon={Chain5} name="ARBI" />
          <ChainIcon icon={Chain6} name="SOL" />
        </div>
      </div>
      <div className="container max-w-[1320px] mx-auto md:px-5 ">
        <div className="grid grid-cols-2 md:grid-cols-1 gap-16">
          <div className="md:flex md:justify-center" >
            <img src={Banner2} alt="" />
          </div>
          <div className="flex flex-col md:items-center md:text-center  max-w-full  gap-4 md:pt-10">
            <p className="text-white text-[20px] font-medium font-syne">
              How it works
            </p>
            <h1 className="text-gradient sm:text-[30px] text-[42px] font-bold font-syne">
              Medium length section heading goes here
            </h1>
            <p className="text-white text-[15px] font-thin font-grostek leading-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusamus, autem dicta dignissimos dolores impedit iure magnam
              maiores molestiae quae quos saepe similique vero voluptate.
              Accusamus blanditiis dolorem ea fugit voluptates?
            </p>
            <div className="m-0">
              <button className="landing-page-hero-content--button--alt">
                Whitepaper
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-[1320px] mx-auto py-32  md:py-20 md:px-5">
        <div className="grid grid-cols-2 md:grid-cols-1 gap-16">
          <div className="flex flex-col md:items-center md:text-center items-start justify-start md:max-w-full max-w-[80%] gap-4">
            <h1 className="text-gradient sm:text-[30px] text-[42px] font-bold font-syne">
              Key Highlights
            </h1>
          </div>
          <div className="text-white md:text-center font-light md:py-10 ">
            {/*<p className="leading-6">*/}
            {/*  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolor*/}
            {/*  dolorum, esse ex ipsum laborum magnam mollitia nam natus placeat*/}
            {/*  porro praesentium quidem quo repellat sed! Laboriosam*/}
            {/*  necessitatibus quisquam tempore?*/}
            {/*</p>*/}
            <div>
              <div className="grid grid-cols-2 gap-10 mb-10">
                <div>
                  <h1 className="font-bold text-[40px] font-grostek"> &gt;30M</h1>
                  <p className="text-gradient font-medium text-[20px] mt-2 font-syne">
                    Total Bridge Volume
                  </p>
                </div>
                <div>
                  <h1 className="font-bold text-[40px] font-grostek">3.5k+</h1>
                  <p className="text-gradient font-medium text-[20px] mt-2 font-syne">
                    No. of holders
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-10 my-10">
                <div>
                  <h1 className="font-bold text-[40px] font-grostek">06</h1>
                  <p className="text-gradient font-medium text-[20px] mt-2 font-syne">
                    Chains live
                  </p>
                </div>
                <div>
                  <h1 className="font-bold text-[40px] font-grostek">10k+</h1>
                  <p className="text-gradient font-medium text-[20px] mt-2 font-syne">
                    Followers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-[1320px] mx-auto md:px-5">
        <div className="grid grid-cols-2 md:grid-cols-1 gap-16">
          <div className="flex flex-col md:max-w-full md:text-center max-w-[80%] gap-4 justify-start md:mb-20">
            <p className="text-gradient font-bold text-[20px] font-syne">
              Roadmap
            </p>
            <h1 className="text-gradient sm:text-[30px] text-[42px] font-bold font-syne">
              Share your journey from the beginning to now
            </h1>
          </div>
          <div className="text-white md:max-w-full max-w-[80%]">
            {roadmapData.map((item, index) => (
              <RoadmapItem
                date={item.date}
                title={item.title}
                desc={item.desc}
                last={index + 1 === roadmapData.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
