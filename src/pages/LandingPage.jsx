import React from "react";

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
  return (
    <div className="landing-page-wrapper">
      <div className="landing-page-hero">
        <div className="landing-page-hero-content">
          <h1 className="landing-page-hero-content--heading">
            One-stop <br />
            decentralised <br />
            trading
          </h1>
          <p className="landing-page-hero-content--para">
            Swap, earn, and build on the leading
            <br />
            decentralised crypto trading protocol.
          </p>
          <div>
            <button className="landing-page-hero-content--button">
              Get started
            </button>
          </div>
        </div>
        <div className="landing-page-hero-image-wrapper">
          <img
            className="landing-page-hero--image"
            src="https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8178.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="landing-page-features">
        <div className="landing-page-features-title">
          <h1 className="landing-page-features--heading">OrdBridge features</h1>
          <p className="landing-page-features--para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </div>
        <div className="landing-page-features-container">
          <FeatureItem />
          <FeatureItem />
          <FeatureItem vertical={true} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
