import React from "react";
import ExperienceCard from "../components/experience/ExperienceCard";
import "../css/Experience.css";
import uable from "../assets/experience/uable.png";
import internshala from "../assets/experience/internshala.png";
import rendezvous from "../assets/experience/rendezvous.png";
import codechefBVPDET from "../assets/experience/codechef-bvpdetnm.jpg";
import gfgbvpdet from "../assets/experience/gfgbvpdet-nm.jpg";
import gdscbvpdet from "../assets/experience/gdsc-bvpdetnm.jpg";

function Experience() {
  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="section-title mb-5">Experiences</h1>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <ExperienceCard
              bgColor="rgb(34, 34, 34)"
              companyName="IIT Delhi"
              img={rendezvous}
              imgAlt="Rendezvous"
              position="Campus Ambassador"
              type="Internship"
              year="Feb 2023 - Present"
            />
            <ExperienceCard
              bgColor="rgb(34, 34, 34)"
              companyName="Internshala"
              img={internshala}
              imgAlt="Internshala"
              position="Student Partner"
              type="Internship"
              year="Dec 2022 - Present"
              description=""
              point1="• I received training and guidance from Internshala's marketing team, which helped me develop my skills in marketing, event management, and social media management."
              point2="• Overall, my experience as an Internshala Student Partner provided me with valuable skills in marketing, event management, and social media management. I gained experience working collaboratively with a team and learned about the latest trends and techniques used in the industry."
            />
            <ExperienceCard
              bgColor="rgb(34, 34, 34)"
              companyName="CodeChef BVPDET-NM"
              img={codechefBVPDET}
              imgAlt="CodeChef BVPDET-NM"
              position="DSA Mentor"
              type="Full Time"
              year="Sep 2022 - Present"
              point1="• Led and organized various activities related to data structures and algorithms, such as guest lectures, coding competitions and study groups/workshops."
              point2="• Provided resources and guidance to help members prepare for technical interviews and competitions."
              point3="• Improved technical skills and knowledge of members in the area of data structures and algorithms."
              point4="• Guided members on DSA problems and helped them to solve it."
              point5="• Arranged practice sessions and mock tests for members."
              point6="• Motivated members to participate in DSA-related competitions and events."
              point7="• Created a community of DSA enthusiasts within the chapter."
            />
            <ExperienceCard
              bgColor="rgb(34, 34, 34)"
              companyName="GeeksforGeeks BVPDET-NM"
              img={gfgbvpdet}
              imgAlt="GeeksforGeeks BVPDET-NM"
              position="Web Developer"
              type="Full Time"
              year="Oct 2022 - Present"
              point1="• Created and maintained the chapter's website."
              point2="• Ensured that the website was responsive and worked well on different devices and browsers."
              point3="• Wrote clean, maintainable, and efficient code using best practices and coding conventions."
              point4="• Optimized the performance of the website using techniques such as caching, minification, and compression."
            />
            <ExperienceCard
              bgColor="rgb(34, 34, 34)"
              companyName="GDSC BVPDET-NM"
              img={gdscbvpdet}
              imgAlt="GDSC BVPDET-NM"
              position="Executive Member"
              type="Full Time"
              year="Oct 2022 - Present"
            />
            <ExperienceCard
              bgColor="rgb(34, 34, 34)"
              companyName="Uable"
              img={uable}
              imgAlt="Uable"
              position="Uable Infulencer"
              type="Internship"
              year="Jan 2022 - Mar 2022"
            />
            <ExperienceCard
              bgColor="rgb(34, 34, 34)"
              companyName="Uable"
              img={uable}
              imgAlt="Uable"
              position="Club Manager"
              type="Internship"
              year="Nov 2021 - jan 2022"
              description=""
              point1="• Meeting with teams to resolve problems, prioritize needs, define content criteria, or select solutions."
              point2="• Directing or conducting out app updates."
              point3="• Ensuring Users follow company policies and procedures."
              point4="• Conducting and Hosting Events on app."
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Experience;
