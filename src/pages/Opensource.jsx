import React from "react";
import GDSC from "../assets/organizations/GDSC.png";
import Crowdsource from "../assets/organizations/crowdsource.png";
import "../css/Opensource.css";

function Opensource() {
  return (
    <>
      <section className="section h-100vh">
        <div className="container">
          <h1 className="section-title">Contributed Organizations</h1>
          <div className="row">
            <div className="col-md-12">
              <ul className="dev-icons-orgs">
                <li className="organizations-inline">
                  <span>GDSC BVP DET-NM</span>
                  <img
                    className="organizations-img"
                    data-aos="zoom-in-down"
                    src={GDSC}
                    alt="GSDC BVP DET-NM"
                  />
                </li>
                <li className="organizations-inline">
                  <span>Crowdsource</span>
                  <img
                    className="organizations-img"
                    data-aos="zoom-in-down"
                    src={Crowdsource}
                    alt="GSDC BVP DET-NM"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Opensource;
