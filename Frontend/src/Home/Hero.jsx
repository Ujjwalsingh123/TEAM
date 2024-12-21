import React from "react";
import { ReactTyped } from "react-typed";
// import Hero_Vdo from "../../public/Hero_Vdo.mp4";
import Hero_Vdo1 from "../../public/Hero_Vdo1.mp4";

function Hero() {
  return (
    <>
      {/* <a> */}
      <div className="">
        <div className="hero min-h-screen relative w-full">
          <video
            autoPlay
            loop
            muted
            className="absolute  inset-0 w-full h-full object-cover"
          >
            <source
              // src="https://videos.pexels.com/video-files/3740039/3740039-uhd_2560_1440_24fps.mp4"
              // src={Hero_Vdo}
              src={Hero_Vdo1}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center relative z-10 flex items-center justify-center h-full text-center">
            <div className="max-w-4xl px-4 text-neutral-content">
              <h1 className="mb-3 text-5xl font-bold ">
                {" "}
                <ReactTyped
                  className="pl-3"
                  strings={[
                    "Search with Legal AI",
                    // "Digital Marketing",
                    // "Ethical Hackeing",
                    "Generate with Legal AI"
                  ]}
                  typeSpeed={100}
                  loop={true}
                  backSpeed={50}
                />
              </h1>
              <p className="mb-5">
                Transform legal workflows with AI-driven solutions that automate
                the summarization and classification of legal documents,
                enhancing accuracy and efficiency
              </p>
              {/* <button className="btn btn-primary">Get Started</button> */}
            </div>
          </div>
        </div>
      </div>
      {/* </a> */}
    </>
  );
}

export default Hero;
