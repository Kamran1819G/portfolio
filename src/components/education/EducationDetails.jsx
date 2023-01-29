import React from "react";

function EducationDetails(props) {
  return (
    <div className="educations-body-div" data-aos="fade-up">
      <div className="degree-card">
        <div className="card-img">
          <img
            src={props.img}
            alt={props.imgAlt}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              transform: "scale(1, 1)",
            }}
          />
        </div>
        <div className="card-body">
          <div className="body-header">
            <div className="body-header-title">
              <h2 className="card-title">{props.CollegeName}</h2>
              <h3 className="card-subtitle">{props.education}</h3>
            </div>
            <div className="body-header-duration">
              <h3 className="duration">{props.year}</h3>
            </div>
          </div>
          <div className="body-content">
            <p className="content-list">{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EducationDetails;
