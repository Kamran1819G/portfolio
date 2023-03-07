import React from "react";
import "./ProjectSection.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectCard from "./project/ProjectCard";
import Algopedia from "../../assets/projects/algopedia.png";
import PortfolioV1 from "../../assets/projects/portfolioV1.png";
import LMS from "../../assets/projects/LMS.png";
import techmart from "../../assets/projects/techmart.png";
import VirtualVoiceAssistant from "../../assets/projects/VirtualVoiceAssistant.png";
import YoutubeThumbnailDownloader from "../../assets/projects/youtube-thumbnail.png";

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button className={"Arrow nextArrow"} onClick={onClick}>
      <i className="bi bi-arrow-right"></i>
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button className={"Arrow prevArrow"} onClick={onClick}>
      <i className="bi bi-arrow-left"></i>
    </button>
  );
}

function ProjectSection() {
  const settings = {
    dots: false,
    infinite: false,
    draggable: true,
    slidesToShow: 3,
    speed: 1000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };
  return (
    <>
      <section className="section project-section">
        <div className="container">
          <div className="row">
            <div className="stage">Projects</div>
            <h1 className="h1">
              <span data-aos="zoom-in-up" data-aos-delay="150">
                Some things
              </span>
              <br />
              <span data-aos="zoom-in-up" data-aos-delay="200">
                I've worked on.
              </span>
            </h1>
          </div>
        </div>
        <div style={{ marginTop: "5em" }}>
          <Slider {...settings} >
            <ProjectCard
              title="Algopedia"
              img={Algopedia}
              btnText="Live View"
              liveview="https://algopedia.vercel.app/"
              sourcecode="https://github.com/kamran1819g/algopedia"
              description="A web application that provides a platform for users to learn and practice algorithms and data structures."
              html="html"
              css="css"
              javascript="javascript"
              react="react"
            />
            <ProjectCard
              title="Virtual Voice Assistant"
              img={VirtualVoiceAssistant}
              liveview="https://github.com/kamran1819g/virtualvoiceassistant"
              sourcecode="https://github.com/kamran1819g/virtualvoiceassistant"
              btnText="View Project"
              description="Virtual Voice Assistant 🤖 - Developed a virtual voice assistant using Python"
              python="python"
            />
            <ProjectCard
              title="Portfoio V2"
              img="data:image/png;base64,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"
              btnText="Stay Tuned"
              liveview=""
              sourcecode=""
              description="Portfolio V2 📝 - Developed a portfolio website using ReactJS"
              html="html"
              css="css"
              javascript="javascript"
              react="react"
            />
            <ProjectCard
              title="Library Management System"
              img={LMS}
              liveview="https://github.com/Kamran1819G/library_management_system"
              sourcecode="https://github.com/Kamran1819G/library_management_system"
              btnText="View Project"
              description="Library Management System 📚 - Developed a web application made using PHP and MySQL"
              php="php"
              css="css"
              javascript="javascript"
            />
            <ProjectCard
              title="Portfolio V1"
              img={PortfolioV1}
              btnText="Live View"
              liveview="https://kamran1819g.github.io"
              sourcecode="https://github.com/kamran1819g/kamran1819g.github.io"
              description="[Out Dated]"
              html="html"
              css="css"
              javascript="javascript"
            />
            <ProjectCard
              title="Youtube Thumbnail Downloader"
              img={YoutubeThumbnailDownloader}
              btnText="View Project"
              liveview="https://github.com/Kamran1819G/YouTube-Thumbnail-Downloader"
              sourcecode="https://github.com/Kamran1819G/YouTube-Thumbnail-Downloader"
              description="YouTube Thumbnail Downloader - Developed a web application made using PHP"
              php="php"
              css="css"
            />
            <ProjectCard
              title="TechMart"
              img={techmart}
              liveview="https://kamran1819g.github.io/techmart"
              sourcecode="https://github.com/Kamran1819G/techmart"
              btnText="Live View"
              description="[FIRST EVER WEBPAGE] E-commerce website for selling tech products."
              html="html"
              css="css"
              javascript="javascript"
              react="react"
            />
          </Slider>
        </div>
      </section>
    </>
  );
}

export default ProjectSection;
