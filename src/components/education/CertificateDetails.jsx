import React from "react";

function CertificateDetails(props) {
  return (
    <>
      <div className="cert-card" data-aos="zoom-in" data-aos-delay="150">
        <div className="content">
          <a href={props.certLink} target="_blank" rel="noreferrer">
            <div className="cert-header">
              <img className="cert_img" src={props.certImg} alt="" />
            </div>
          </a>
        </div>
        <div className="cert-body">
          <h2 className="cert-body-title">{props.certName}</h2>
          <h3 className="cert-body-subtitle">{props.from}</h3>
        </div>
      </div>
    </>
  );
}

export default CertificateDetails;
