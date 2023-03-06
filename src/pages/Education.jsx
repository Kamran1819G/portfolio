import React from "react";
import "../css/Education.css";
import EducationDetails from "../components/education/EducationDetails";
import CertificateDetails from "../components/education/CertificateDetails";
import BVPDU from "../assets/images/BVPDU.png";
import AES from "../assets/images/AES.png";
import SPHS from "../assets/images/SPHS.png";

import codechef from "../assets/organizations/codechef.png";
import leetcode from "../assets/organizations/leetcode.png";
import hackerrank from "../assets/organizations/hackerrank.png";
import unstop from "../assets/organizations/unstop.png";
import coursera from "../assets/organizations/coursera.png";
import gcp from "../assets/organizations/gcp.png";

function Education() {
  return (
    <>
      <section className="section h-100vh">
        <div className="container">
          <div className="education-section-title">
            <h1 className="h1">My Profiles</h1>
          </div>
          <a
            className="img-container"
            href="https://codechef.com/users/kamran1819g"
            target="_blank"
            rel="noreferrer"
          >
            <img src={codechef} alt="codechef" className="img codechef" />
          </a>
          <a
            className="img-container"
            href="https://leetcode.com/kamran1819g/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={leetcode} alt="leetcode" className="img leetcode" />
          </a>
          <a
            className="img-container"
            href="https://www.hackerrank.com/kamran1819g"
            target="_blank"
            rel="noreferrer"
          >
            <img src={hackerrank} alt="hackerrank" className="img hackerrank" />
          </a>
          <a
            className="img-container"
            href="https://unstop.com/u/Kamran1819G"
            target="_blank"
            rel="noreferrer"
          >
            <img src={unstop} alt="unstop" className="img unstop" />
          </a>
          <a
            className="img-container"
            href="https://www.coursera.org/user/af11c2f9e7809f2e1d3b75146549ba46"
            target="_blank"
            rel="noreferrer"
          >
            <img src={coursera} alt="coursera" className="img coursera" />
          </a>
          <a
            className="img-container"
            href="https://www.cloudskillsboost.google/public_profiles/116395ac-d4af-43ca-9c14-ce7d22393138"
            target="_blank"
            rel="noreferrer"
          >
            <img src={gcp} alt="gcp" className="img gcp" />
          </a>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h1 className="educations-header">Educations</h1>
          </div>
          <div className="row flex-direction-column">
            <div className="col-lg-12">
              <EducationDetails
                img={BVPDU}
                imgAlt="BVPDU"
                CollegeName="Bharati Vidyapeeth Deemed University College of Engineering Pune."
                education="Bachelor of Technology in Computer Science and Engineering (AIML)."
                year="2021 - Present"
                description="⚡ Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem excepturi nisi id. Aliquid veniam rem officia "
              />
              <EducationDetails
                img={AES}
                imgAlt="AES"
                CollegeName="The Andhra Education Society"
                education="12th Science PCMB"
                year="2019 - 2021"
                description="⚡ Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem excepturi nisi id. Aliquid veniam rem officia ipsam repellat eaque voluptatum? Quo eligendi earum tempora nisi eum minus molestias sequi adipisci?"
              />
              <EducationDetails
                img={SPHS}
                imgAlt="SPHS"
                CollegeName="Sitaram Prakash High School"
                education="10th"
                year="2018 - 2019"
                description="⚡ Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem excepturi nisi id. Aliquid veniam rem officia ipsam repellat eaque voluptatum? Quo eligendi earum tempora nisi eum minus molestias sequi adipisci?"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h1 className="certs-header">Certifications</h1>
          </div>
          <div className="row justify-content-evenly">
            <CertificateDetails
              certLink="https://www.coursera.org/account/accomplishments/certificate/AF99N4ZEREE8"
              certImg="https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~AF99N4ZEREE8/CERTIFICATE_LANDING_PAGE~AF99N4ZEREE8.jpeg"
              certName="Meta Front-End Developer Professional Certificate"
              from="- Meta Inc, Coursera"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Education;
