import React from "react";
import KamranAvatar from "../assets/images/KamranAvatar.png";
import BlogImage from "../assets/images/Blog.png";
import Globe from "../assets/images/globe.png";
import "../css/Contact.css";

function Contact() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 d-flex text-center justify-content-center">
              <div className="section-img">
                <img src={KamranAvatar} alt="Kamran Avatar" />
              </div>
              <div className="section-text">
                <h2 className="section-title">Contact Me</h2>
                <p className="section-description font-secondary text-muted pt-4">
                  I am a Software Engineer with a passion for building
                  applications and websites that provide intuitive,
                  pixel-perfect user interfaces with efficient and modern
                  backends.
                </p>
                <div className="resume-btn-div">
                  <a
                    className="main-button"
                    href="https://medium.com/@Kamran1819G"
                    target="_blank"
                    rel="noreferrer"
                  >
                    My Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center d-flex">
              <div className="section-text">
                <h1 className="section-title">Blogs</h1>
                <p className="section-description font-secondary text-muted pt-4">
                  For individual fundamental empowerment, I like to write
                  powerful lessons that create impact on each of the reader
                  individually to change the core of their character.
                </p>
                <div className="blogsite-btn-div">
                  <a
                    className="main-button"
                    href="https://medium.com/@Kamran1819G"
                    target="_blank"
                    rel="noreferrer"
                  >
                    My Blog
                  </a>
                </div>
              </div>
              <div className="section-img">
                <img src={BlogImage} alt="Blog" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center d-flex">
              <div className="section-img">
                <img src={Globe} alt="Globe" />
              </div>
              <div className="section-text">
                <h1 className="section-title">Get In Touch</h1>
                <p className="section-description font-secondary text-muted pt-4">
                  I am a Software Engineer with a passion for building
                  applications and websites that provide intuitive,
                  pixel-perfect user interfaces with efficient and modern
                  backends.
                </p>
                <div className="resume-btn-div">
                  <a
                    className="main-button"
                    href="https://medium.com/@Kamran1819G"
                    target="_blank"
                    rel="noreferrer"
                  >
                    My Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
