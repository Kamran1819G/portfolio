import React from "react";
import Scroll from "../../assets/SVGs/scroll.svg";
import Avatar from "../../assets/SVGs/Avatar.svg";
import laptop from "../../assets/SVGs/laptop.svg";

function IntroSection() {
  return (
    <>
      <section className="section h-100vh">
        <div className="main">
          <div className="container">
            <div className="row justify-content-around">
              <div className="main_wrap">
                <div className="stage">Introduction</div>
                <h1 className="main_title h1">
                  <span data-aos="zoom-in-up" data-aos-delay="150">
                    Hello, my
                  </span>
                  <span data-aos="zoom-in-up" data-aos-delay="200">
                    name's Kamran Khan.
                  </span>
                  <span data-aos="zoom-in-up" data-aos-delay="250">
                    I'm a Software
                  </span>
                  <span data-aos="zoom-in-up" data-aos-delay="300">
                    Engineer.
                  </span>
                </h1>
                <a className="scroll " href="#skill">
                  <div className="scroll_icon">
                    <img className="scroll_pic" src={Scroll} alt="scroll" />
                  </div>
                  <div className="scroll_text">Scroll down</div>
                </a>
              </div>
              <div className="intro-images">
                <img
                  src={Avatar}
                  alt="Avatar"
                  className="avatar animate__animated animate__zoomInUp animate__delay-1s"
                />
                <img
                  src={laptop}
                  alt="laptop"
                  className="laptop animate__animated animate__zoomInUp animate__delay-2s"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default IntroSection;
