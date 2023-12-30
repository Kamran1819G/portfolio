import React, {useEffect} from "react";
import { Container, Row } from "react-bootstrap";
import Scroll from "../../assets/SVGs/scroll.svg";
import Avatar from "../../assets/SVGs/Avatar.svg";
import laptop from "../../assets/SVGs/laptop.svg";
import AOS from "aos";


function IntroSection() {
  useEffect(() => {
    AOS.init({
      offset: 120,
      delay: 0,
    });
  }, []);
  return (
    <>
      <section className="vh-100 my-5 py-5">
        <div className="main">
          <Container>
            <Row className="justify-content-around">
              <div className="main_wrap">
                <div className="stage">Introduction</div>
                <h1 className="main_title fw-bolder display-2">
                  <span data-aos="zoom-in-up">
                    Hello, my
                  </span>
                  <span data-aos="zoom-in-up">
                    name's Kamran Khan.
                  </span>
                  <span data-aos="zoom-in-up">
                    I'm a Software
                  </span>
                  <span data-aos="zoom-in-up">
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
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
}

export default IntroSection;
