import React from "react";
import { Container, Row } from "react-bootstrap";
import "./SkillSection.scss";

function SkillSection() {
  return (
    <>
      <section className="skill-section my-5 py-5">
        <Container>
        <Row>
            <div className="stage">skills</div>
            <h1 className="fw-bolder display-2">
              <span data-aos="zoom-in-up" data-aos-delay="150">
                Skills that
              </span>
              <br />
              <span data-aos="zoom-in-up" data-aos-delay="200">
                I've acquired
              </span>
            </h1>
          </Row>
          <Row className="justify-content-around">
            <div class="skillBox" data-aos="zoom-in" data-aos-delay="100">
              <p>HTML5</p>
              <p>100%</p>
              <div class="skill">
                <div class="skill_level" style={{ width: "100%" }}></div>
              </div>
            </div>
            <div class="skillBox" data-aos="zoom-in" data-aos-delay="100">
              <p>CSS</p>
              <p>100%</p>
              <div class="skill">
                <div class="skill_level" style={{ width: "90%" }}></div>
              </div>
            </div>
            <div class="skillBox" data-aos="zoom-in" data-aos-delay="100">
              <p>JavaScript</p>
              <p>70%</p>
              <div class="skill">
                <div class="skill_level" style={{ width: "70%" }}></div>
              </div>
            </div>
            <div class="skillBox" data-aos="zoom-in" data-aos-delay="100">
              <p>React JS</p>
              <p>70%</p>
              <div class="skill">
                <div class="skill_level" style={{ width: "70%" }}></div>
              </div>
            </div>
            <div class="skillBox" data-aos="zoom-in" data-aos-delay="100">
              <p>NodeJS</p>
              <p>20%</p>
              <div class="skill">
                <div class="skill_level" style={{ width: "20%" }}></div>
              </div>
            </div>
            <div class="skillBox" data-aos="zoom-in" data-aos-delay="100">
              <p>JSON</p>
              <p>100%</p>
              <div class="skill">
                <div class="skill_level" style={{ width: "100%" }}></div>
              </div>
            </div>
            <div class="skillBox" data-aos="zoom-in" data-aos-delay="100">
              <p>PHP</p>
              <p>70%</p>
              <div class="skill">
                <div class="skill_level" style={{ width: "70%" }}></div>
              </div>
            </div>
            <div class="skillBox" data-aos="zoom-in" data-aos-delay="100">
              <p>Django</p>
              <p>40%</p>
              <div class="skill">
                <div class="skill_level" style={{ width: "40%" }}></div>
              </div>
            </div>
            <div class="skillBox" data-aos="zoom-in" data-aos-delay="100">
              <p>C</p>
              <p>40%</p>
              <div class="skill">
                <div class="skill_level" style={{ width: "40%" }}></div>
              </div>
            </div>
            <div class="skillBox" data-aos="zoom-in" data-aos-delay="100">
              <p>C++</p>
              <p>70%</p>
              <div class="skill">
                <div class="skill_level" style={{ width: "70%" }}></div>
              </div>
            </div>
            <div class="skillBox" data-aos="zoom-in" data-aos-delay="100">
              <p>Java</p>
              <p>80%</p>
              <div class="skill">
                <div class="skill_level" style={{ width: "80%" }}></div>
              </div>
            </div>
            <div class="skillBox" data-aos="zoom-in" data-aos-delay="100">
              <p>Python</p>
              <p>60%</p>
              <div class="skill">
                <div class="skill_level" style={{ width: "60%" }}></div>
              </div>
            </div>
            <div class="skillBox" data-aos="zoom-in" data-aos-delay="100">
              <p>Data Structures</p>
              <p>70%</p>
              <div class="skill">
                <div class="skill_level" style={{ width: "70%" }}></div>
              </div>
            </div>
            <div class="skillBox" data-aos="zoom-in" data-aos-delay="100">
              <p>UNIX</p>
              <p>40%</p>
              <div class="skill">
                <div class="skill_level" style={{ width: "40%" }}></div>
              </div>
            </div>
            <div class="skillBox" data-aos="zoom-in" data-aos-delay="100">
              <p>MYSQL</p>
              <p>70%</p>
              <div class="skill">
                <div class="skill_level" style={{ width: "70%" }}></div>
              </div>
            </div>
            <div class="skillBox" data-aos="zoom-in" data-aos-delay="100">
              <p>Database</p>
              <p>60%</p>
              <div class="skill">
                <div class="skill_level" style={{ width: "60%" }}></div>
              </div>
            </div>
            <div class="skillBox" data-aos="zoom-in" data-aos-delay="100">
              <p>google cloud</p>
              <p>80%</p>
              <div class="skill">
                <div class="skill_level" style={{ width: "80%" }}></div>
              </div>
            </div>
            <div class="skillBox" data-aos="zoom-in" data-aos-delay="100">
              <p>LeaderShip</p>
              <p>80%</p>
              <div class="skill">
                <div class="skill_level" style={{ width: "80%" }}></div>
              </div>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default SkillSection;
