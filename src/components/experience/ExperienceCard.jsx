import React from 'react'

function ExperienceCard(props) {
    const style = {
        background: props.bgColor,
    }
  return (
    <>
    <div className="experience-card">
            <div
              className="experience-banner"
              style={style}
            >
              <div className="experience-blurred_div"></div>
              <div className="experience-div-company">
                <h5 className="experience-text-company">{props.companyName}</h5>
              </div>
              <img
                crossorigin="anonymous"
                className="experience-roundedimg"
                alt={props.imgAlt}
                src={props.img}/>
            </div>
            <div className="experience-text-details">
              <h5 className="experience-text-role">{props.position}</h5>
              <h5 className="experience-text-date">{props.year}</h5>

              <p className="subTitle experience-text-desc">
                {props.description}
              </p>
              <ul>
                <li className="subTitle">
                    {props.point1}
                </li>
                <li className="subTitle">
                    {props.point2}
                </li>
              </ul>
            </div>
          </div>
    </>
  )
}

export default ExperienceCard