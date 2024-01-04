import React from "react";
import HeroBg from "../assets/hero-bg.png";
import OrdThumb from "../assets/ord-thumb.png";
import Avax from "../assets/avax.png";
import BoxIcon from '../assets/BoxIcon.svg'
import Telegram from '../assets/Telegram.png';
import Twitter from '../assets/Twitter.png';
import Discord from '../assets/Discord.png';
import Text from '../components/Text';
const LandingPage = () => {
  const FeatureItem = ({ vertical }) => {
    return (
      <div
        className={`landing-page-feature-item ${
          vertical && "landing-page-feature-item--vertical"
        } `}
      >
        <div>
          <img
            className={` ${
              vertical
                ? "landing-page-feature-item-image--vertical"
                : "landing-page-feature-item-image"
            }`}
            src="https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8178.jpg"
            alt=""
          />
        </div>
        <div className="landing-page-feature-item-content-container">
          <h1 className="landing-page-feature-item--heading">
            Short heading here
          </h1>
          <p
            className="landing-page-feature-item--para"
            style={{ color: "rgba(193, 193, 193, 0.64)" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <button className="landing-page-feature-item--button">
            Button &gt;
          </button>
        </div>
      </div>
    );
  };

  const RoadmapItem = ({last}) => {
      return (
        <div className="flex ">
          <div className="flex flex-col  justify-start items-center max-w-[40px] p-0 m-0">
            <img src={BoxIcon} />
            {!last && <div className="h-full max-w-[1px] border m-1" />}
          </div>
          <div className="text-white flex flex-col gap-3 flex-1 ">
            <p className="text-gradient">05 jan</p>
            <p>summary of event </p>
            <p>Lorem ipsum dolor sit amet, At cumque dicta distinctio dolorem, ducimus labore molestiae possimus quas
              tempore vel veritatis vitae voluptas.</p>
          </div>
        </div>
      )
  }
  const WhyItem = ({ img }) => {
    return (
      <div className=" flex flex-col items-center gap-3 justify-center">
        <img alt="" src={OrdThumb} />
        <h3 className="text-white text-[24px] ">Heading herer</h3>
        <p className="text-gray-200 font-thin text-[14px]">Some para here</p>
        <button className="text-gradient">Know More &nbsp; &gt;</button>
      </div>
    );
  };

  const ChainIcon = () => {
    return (
      <div className="chain-icon-container">
        <div className="chain-icon-circle">
          <img src={Avax} alt="" className=" sm:min-h-[90px] sm:min-w-[90px] min-h-[110px] min-w-[110px]" />
        </div>
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
            Swap, earn, and build on the leading
            <br />
            decentralised crypto trading protocol.
          </p>
          <div className="landing-page-hero-content-buttons">
            <button className=" landing-page-hero-content--button--alt">
              Get started
            </button>
            <button className="landing-page-hero-content--button">
              Get started
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
          <WhyItem />
          <WhyItem />
          <WhyItem />
          <WhyItem />
        </div>
        {/*<div className="landing-page-features-container">*/}
        {/*  <FeatureItem />*/}
        {/*  <FeatureItem />*/}
        {/*  <FeatureItem vertical={true} />*/}
        {/*</div>*/}
      </div>
      <div className="container max-w-[1320px] mx-auto md:px-5 ">
        <div className="grid grid-cols-2 md:grid-cols-1">
          <div className="flex flex-col max-w-[80%] md:max-w-full gap-4 md:items-center md:text-center">
            <p className="text-white text-[20px] ">Tagline</p>
            <h1 className="text-gradient text-[42px]">
              Powering the most popular bridge
            </h1>
            <p className="text-white font-thin">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusamus, autem dicta dignissimos dolores impedit iure magnam
              maiores molestiae quae quos saepe similique vero voluptate.
              Accusamus blanditiis dolorem ea fugit voluptates?
            </p>
            <div>
              <button className="landing-page-hero-content--button--alt">
                Open app
              </button>
            </div>
          </div>
          <div className="md:mt-10" >
            <img
              src="https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8178.jpg" />
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
        <div className="flex flex-wrap justify-center ">
          <ChainIcon />
          <ChainIcon />
          <ChainIcon />
          <ChainIcon />
          <ChainIcon />
          <ChainIcon />
        </div>
      </div>
      <div className="container max-w-[1320px] mx-auto md:px-5 ">
        <div className="grid grid-cols-2 md:grid-cols-1">
          <div>
            <img
              src="https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8178.jpg" />
          </div>
          <div className="flex flex-col md:items-center md:text-center md:max-w-full max-w-[80%] gap-4 pt-20">
            <p className="text-white text-[20px]">How it works</p>
            <h1 className="text-gradient text-[42px]">
              Medium length section heading goes here
            </h1>
            <p className="text-white font-thin">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusamus, autem dicta dignissimos dolores impedit iure magnam
              maiores molestiae quae quos saepe similique vero voluptate.
              Accusamus blanditiis dolorem ea fugit voluptates?
            </p>
            <div>
              <button className="landing-page-hero-content--button--alt">
                Open app
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-[1320px] mx-auto py-32 md:py-20 md:px-5">
        <div className="grid grid-cols-2 md:grid-cols-1">
          <div className="flex flex-col md:items-center md:text-center items-start justify-start md:max-w-full max-w-[80%] gap-4">
            <h1 className="text-gradient text-[42px]">
              OrdBridge Numbers and summary
            </h1>
          </div>
          <div className="text-white md:text-center font-light md:py-10">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolor dolorum, esse ex ipsum laborum magnam
              mollitia nam natus placeat porro praesentium quidem quo repellat sed! Laboriosam necessitatibus quisquam
              tempore?</p>
            <div>
              <div className="grid grid-cols-2 gap-10 my-10">
                <div>
                  <h1 className="font-bold text-[40px]">29.5M</h1>
                  <p className="text-gradient">Total Bridge Volume</p>
                </div>
                <div>
                  <h1 className="font-bold text-[40px]">29.5M</h1>
                  <p className="text-gradient">Total Bridge Volume</p>
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-10 my-10">
                <div>
                  <h1 className="font-bold text-[40px]">29.5M</h1>
                  <p className="text-gradient">Total Bridge Volume</p>
                </div>
                <div>
                  <h1 className="font-bold text-[40px]">29.5M</h1>
                  <p className="text-gradient">Total Bridge Volume</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-[1320px] mx-auto md:px-5">
        <div className="grid grid-cols-2 md:grid-cols-1">
          <div className="flex flex-col md:max-w-full text-center max-w-[80%] gap-4 justify-start md:mb-20">
            <p className="text-gradient" >Roadmap</p>
            <h1 className="text-gradient text-[42px]">
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
