import React from "react";
import "../styles/Home.scss";
import IntroSection from "../components/home/IntroSection";
import ProjectSection from "../components/home/ProjectSection";
import SkillSection from "../components/home/SkillSection";
import ContactSection from "../components/home/ContactSection";

function Home() {
  return (
    <>
      <IntroSection />
      <ProjectSection />
      <SkillSection />
      <ContactSection />
    </>
  );
}

export default Home;
