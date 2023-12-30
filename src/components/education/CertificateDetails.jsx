import React from "react";

function CertificateDetails(props) {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center rounded-3 cert-card bg-white" data-aos="zoom-in" data-aos-delay="150">
        <div className="content">
          <a href={props.certLink} target="_blank" rel="noreferrer">
            <div className="cert-header">
              <img className="w-100 h-auto" src={props.certImg} alt="" />
            </div>
          </a>
        </div>
        <div className="cert-body">
          <h2 className="cert-body-title my-3">{props.certName}</h2>
          <h3 className="cert-body-subtitle my-3">{props.from}</h3>
        </div>
      </div>
    </>
  );
}

export default CertificateDetails;
