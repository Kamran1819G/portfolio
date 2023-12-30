import React, {useEffect} from "react";
import ExperienceCard from "../components/experience/ExperienceCard";
import "../styles/Experience.scss"
import { Container, Row } from "react-bootstrap";
import AOS from "aos";

import uable from "../assets/experience/uable.png";
import internshala from "../assets/experience/internshala.png";
import rendezvous from "../assets/experience/rendezvous.png";
import codechefBVPDET from "../assets/experience/codechef-bvpdetnm.jpg";
import gfgbvpdet from "../assets/experience/gfgbvpdet-nm.jpg";
import gdscbvpdet from "../assets/experience/gdsc-bvpdetnm.jpg";

function Experience() {
  useEffect(() => {
    AOS.init({
      offset: 120,
      delay: 0,
    });
  }, []);
  return (
    <>
      <section className="my-5 py-5">
        <Container>
          <h1 className="text-center display-4 fw-bolder mb-5">Experiences</h1>
          <Row className="row-cols-1 row-cols-md-3 g-4">
          <ExperienceCard
              bgColor="rgb(34, 34, 34)"
              companyName="CodeChef BVPDET-NM"
              img={codechefBVPDET}
              imgAlt="CodeChef BVPDET-NM"
              position="DSA Mentor"
              type="Full Time"
              year="Sep 2022 - Aug 2023"
              point1="• Organized and led 10+ activities, fostering a community of 200+ DSA enthusiasts."
              point2="• Provided resources, guidance, and conducted 10+ practice sessions, improving members’ technical skills by 30%."
              point3="• Mentored members in solving 100+ DSA problems, enhancing their problem-solving abilities."
            />
            <ExperienceCard
              bgColor="rgb(34, 34, 34)"
              companyName="GeeksforGeeks BVPDET-NM"
              img={gfgbvpdet}
              imgAlt="GeeksforGeeks BVPDET-NM"
              position="Web Developer"
              type="Full Time"
              year="Oct 2022 - Aug 2023"
              point1="• Created and maintained the chapter’s responsive website."
              point2="• Crafted clean and efficient code following industry best practices."
              point3="• Optimized website performance, resulting in a 30% boost in loading speed"
              point4="• Collaborated with a team of 5 members to implement innovative features on the website."
            />
            <ExperienceCard
              bgColor="rgb(34, 34, 34)"
              companyName="GDSC BVPDET-NM"
              img={gdscbvpdet}
              imgAlt="GDSC BVPDET-NM"
              position="Executive Member"
              type="Full Time"
              year="Oct 2022 - Jul 2023"
              point1 = "• Managed and updated the chapter’s website, ensuring its responsiveness and compatibility across 15+ devices and browsers."
              point2 = "• Engineered clean, efficient code using best practices and coding conventions, leading to a 20% enhancement in website performance."
            />
            <ExperienceCard
              bgColor="rgb(34, 34, 34)"
              companyName="IIT Delhi"
              img={rendezvous}
              imgAlt="Rendezvous"
              position="Campus Ambassador"
              type="Internship"
              year="Feb 2023 - Mar 2023"
            />
            <ExperienceCard
              bgColor="rgb(34, 34, 34)"
              companyName="Internshala"
              img={internshala}
              imgAlt="Internshala"
              position="Student Partner"
              type="Internship"
              year="Dec 2022 - Feb 2023"
              description=""
              point1="• I received training and guidance from Internshala's marketing team, which helped me develop my skills in marketing, event management, and social media management."
              point2="• Overall, my experience as an Internshala Student Partner provided me with valuable skills in marketing, event management, and social media management. I gained experience working collaboratively with a team and learned about the latest trends and techniques used in the industry."
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
              year="Nov 2021 - Jan 2022"
              description=""
              point1="• Meeting with teams to resolve problems, prioritize needs, define content criteria, or select solutions."
              point2="• Directing or conducting out app updates."
              point3="• Ensuring Users follow company policies and procedures."
              point4="• Conducting and Hosting Events on app."
            />
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Experience;
