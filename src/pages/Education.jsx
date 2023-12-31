import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import "../styles/Education.scss";
import EducationDetails from "../components/education/EducationDetails";
import CertificateDetails from "../components/education/CertificateDetails";
import BVPDU from "../assets/images/BVPDU.png";
import AES from "../assets/images/AES.png";
import SPHS from "../assets/images/SPHS.png";

import codechef from "../assets/organizations/codechef.png";
import leetcode from "../assets/organizations/leetcode.png";
import geeksforgeeks from "../assets/organizations/geeksforgeeks.jpg";
import codingninjas from "../assets/organizations/codingninjas.jpg";
import coursera from "../assets/organizations/coursera.png";
import gcp from "../assets/organizations/gcp.png";

function Education() {
  return (
    <>
      <section className="vh-100 my-5 py-5">
        <Container>
          <div className="education-section-title">
            <h1 className="display-1 fw-bolder">My Profiles</h1>
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
            href="https://auth.geeksforgeeks.org/user/kamran1819g"
            target="_blank"
            rel="noreferrer"
          >
            <img src={geeksforgeeks} alt="GeeksforGeeks" className="img hackerrank" />
          </a>
          <a
            className="img-container"
            href="https://www.codingninjas.com/studio/profile/8015d99d-e5c9-4cc5-9ca3-644f341086f0"
            target="_blank"
            rel="noreferrer"
          >
            <img src={codingninjas} alt="Coding Ninjas" className="img unstop" />
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
        </Container>
      </section>
      <section className="my-5">
        <Container>
            <h1 className="text-center display-4 fw-bolder">Educations</h1>
          <Row className="flex-column">
            <Col lg={12}>
              <EducationDetails
                img={BVPDU}
                imgAlt="BVPDU"
                CollegeName="Bharati Vidyapeeth Deemed University Department of Engineering and Technology, Navi Mumbai."
                education="Bachelor of Technology in Computer Science and Engineering (AIML)."
                year="2021 - Present"
                description="⚡ Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem excepturi nisi id. Aliquid veniam rem officia "
              />
              <EducationDetails
                img={AES}
                imgAlt="AES"
                CollegeName="The Andhra Education Society"
                education="12th Science PCMB, Higher Secondary School"
                year="2019 - 2021"
                description="⚡ Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem excepturi nisi id. Aliquid veniam rem officia ipsam repellat eaque voluptatum? Quo eligendi earum tempora nisi eum minus molestias sequi adipisci?"
              />
              <EducationDetails
                img={SPHS}
                imgAlt="SPHS"
                CollegeName="Sitaram Prakash High School"
                education="10th, Secondary School"
                year="2018 - 2019"
                description="⚡ Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem excepturi nisi id. Aliquid veniam rem officia ipsam repellat eaque voluptatum? Quo eligendi earum tempora nisi eum minus molestias sequi adipisci?"
              />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="my-5">
        <Container>
            <h1 className="text-center display-5 fw-bolder my-5">Certifications</h1>
          <Row className="justify-content-start">
            <CertificateDetails
              certLink="https://www.coursera.org/account/accomplishments/specialization/certificate/686AQHGRWYFL"
              certImg="https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~686AQHGRWYFL/CERTIFICATE_LANDING_PAGE~686AQHGRWYFL.jpeg"
              certName="Meta Front-End Developer Professional Certificate"
              from="- Meta Inc, Coursera"
            />
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Education;
