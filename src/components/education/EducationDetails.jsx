import React from "react";

function EducationDetails(props) {
  return (
    <div className="educations-degree-div" data-aos="zoom-in" data-aos-delay="150">
      <div className="degree-card">
        <div className="degree-card-img">
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
        <div className="education-card-degree">
          <div className="degree-header">
            <div className="degree-header-title">
              <h2 className="degree-card-title">{props.CollegeName}</h2>
              <h3 className="degree-card-subtitle">{props.education}</h3>
            </div>
            <div className="degree-header-duration">
              <h3 className="duration">{props.year}</h3>
            </div>
          </div>
          <div className="degree-content">
            <p className="degree-content-list">{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EducationDetails;
