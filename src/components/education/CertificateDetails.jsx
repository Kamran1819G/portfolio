import React from 'react'

function CertificateDetails(props) {
  return (
    <>
    <div className="cert-card" data-aos="fade-up">
            <div className="content">
              <a
                href={props.certLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="cert-header">
                  <img
                    className="cert_img"
                    src={props.certImg}
                    alt="Meta Inc"
                  />
                </div>
              </a>
            </div>
            <div className="cert-body">
              <h2 className="cert-body-title">
                {props.certName}
              </h2>
              <h3 className="cert-body-subtitle">{props.from}</h3>
            </div>
          </div>
    </>
  )
}

export default CertificateDetails