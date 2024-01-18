import React, { useEffect } from "react";

import AOS from "aos";

function EducationDetails(props) {
  useEffect(() => {
    AOS.init({
      offset: 120,
      delay: 0,
    });
  }, []);
  return (
      <div className="degree-card" data-aos="zoom-in" data-aos-delay="150">
        <img
          src={props.img}
          alt={props.imgAlt}
          style={{
            transform: "scale(1, 1)",
          }}
          className="degree-card-img mx-5"
        />
        <div className="education-card-degree px-3 py-3 bg-white">
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
  );
}

export default EducationDetails;
