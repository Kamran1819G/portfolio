import React from "react";
import "../css/Projects.css";
import image1 from "../assets/SVGs/girl_and_boy_sitting_with_laptop.svg";

function Projects() {
  return (
    <>
      <section class="section h-100vh" style={{marginTop: "2.5em"}}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div class="projects-heading-div d-flex">
                <div class="projects-heading-img-div d-flex">
                  <img src={image1} alt="Man Working on Project" />
                </div>
                <div class="projects-heading-text-div">
                  <h1 class="section-title projects-heading-text">Projects</h1>
                  <p class="section-description projects-header-detail-text subTitle">
                    My projects makes use of vast variety of latest technology
                    tools. My best experience is to create Data Science projects
                    and deploy them to web applications using cloud
                    infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="github-repo">
        <div class="github-header"> Github Repository</div>
        <div class="repo-cards-div-main">
          <div
            class="repo-card"
            data-repo="Kamran1819G/ImageToPDFConverter"
          ></div>
          <div
            class="repo-card"
            data-repo="Kamran1819G/library_management_system"
          ></div>
          <div
            class="repo-card"
            data-repo="Kamran1819G/Typing-Speed-Test-in-JavaScript"
          ></div>
          <div class="repo-card" data-repo="Kamran1819G/TechMart"></div>
          <div class="repo-card" data-repo="Kamran1819G/weather-app"></div>
          <div
            class="repo-card"
            data-repo="Kamran1819G/YouTube-Thumbnail-Downloader"
          ></div>
        </div>
      </section>
    </>
  );
}

export default Projects;
