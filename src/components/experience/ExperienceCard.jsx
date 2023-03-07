import React from "react";

function ExperienceCard(props) {
  const style = {
    background: props.bgColor,
  };
  return (
    <>
      <div className="col">
        <div className="experience-card" data-aos="zoom-in" data-aos-delay="250">
          <div className="experience-banner" style={style}>
            <div className="experience-blurred_div"></div>
            <div className="experience-div-company">
              <h5 className="experience-text-company">{props.companyName}</h5>
            </div>
            <img
              crossorigin="anonymous"
              className="experience-roundedimg"
              alt={props.imgAlt}
              src={props.img}
            />
          </div>
          <div className="experience-text-details">
            <h5 className="experience-text-role">{props.position}</h5>
            <h5 className="experience-text-type">{props.type}</h5>
            <h5 className="experience-text-date">{props.year}</h5>

            <p className="experience-text-desc">{props.description}</p>
            <ul
              style={{
                listStyleType: "none",
              }}
            >
              <li>{props.point1}</li>
              <li>{props.point2}</li>
              <li>{props.point3}</li>
              <li>{props.point4}</li>
              <li>{props.point5}</li>
              <li>{props.point6}</li>
              <li>{props.point7}</li>
              <li>{props.point8}</li>
              <li>{props.point9}</li>
              <li>{props.point10}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExperienceCard;
