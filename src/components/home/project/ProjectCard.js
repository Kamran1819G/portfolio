import React from "react";
import { Card } from "react-bootstrap";
import "./ProjectCard.scss";

function ProjectCard(props) {
  const renderTechStackBadges = () => {
    if (!props.techStack || !Array.isArray(props.techStack)) {
      return null;
    }

    return props.techStack.map((tech, index) => (
      <span
        key={index}
        className="badge"
        style={{ background: getRandomColor() }}
      >
        {tech}
      </span>
    ));
  };

  const getRandomColor = () => {
    const colors = [
      "#8993be",
      "#e34c26",
      "#264de4",
      "#f0db4f",
      "#7cc5d9",
      "#8B7D6B",
      "#ed272c",
      "#3f4cb0",
      "#30b8f6",
      "#0a5d9e",
      "#f58613",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <>
      <Card style={{ width: "20rem" }} className="project-card">
        <Card.Img variant="top" src={props.img} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <div className="tech-stack">{renderTechStackBadges()}</div>
          <Card.Text>{props.description}</Card.Text>
          <div className="project-card-links mt-4">
            {props.sourcecode === "" ? null : (
              <a
                href={props.sourcecode}
                target="_blank"
                rel="noreferrer"
                className="rounded-3 btn-source-code btn btn-secondary"
              >
                {props.liveview === "" ? (
                  <span>
                    <i className="bi bi-code-slash"></i> View Project
                  </span>
                ) : (
                  <span>
                    <i className="bi bi-code-slash"></i>
                  </span>
                )}
              </a>
            )}
            {props.liveview === "" ? null : (
              <a
                href={props.liveview}
                target="_blank"
                rel="noreferrer"
                className="rounded-3 btn-live-view btn"
                style={{
                  background: "var(--primary-color)",
                  color: "var(--text-primary-color)",
                }}
              >
                Live View
              </a>
            )}
            {props.staytune === false ? null : (
              <button
                className="rounded-3 btn-live-view btn"
                style={{
                  background: "var(--primary-color)",
                  color: "var(--text-primary-color)",
                }}
              >
                Stay Tune
              </button>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProjectCard;
