import React from "react";
import { Card } from "react-bootstrap";
import "./ProjectCard.css";

function ProjectCard(props) {
  return (
    <>
      <Card style={{ width: "20rem" }}>
        <Card.Img variant="top" src={props.img} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <div className="tech-stack">
            <span className="badge" style={{ background: "#8993be" }}>
              {props.php}
            </span>
            <span className="badge" style={{ background: "#e34c26" }}>
              {props.html}
            </span>
            <span className="badge" style={{ background: "#264de4" }}>
              {props.css}
            </span>
            <span className="badge" style={{ background: "#f0db4f" }}>
              {props.javascript}
            </span>
            <span className="badge" style={{ background: "#7cc5d9" }}>
              {props.react}
            </span>
            <span className="badge" style={{ background: "#8B7D6B" }}>
              {props.python}
            </span>
            <span className="badge" style={{ background: "#1FBED6" }}>
              {props.java}
            </span>
            <span className="badge" style={{ background: "" }}>
              {props.cpp}
            </span>
            <span className="badge" style={{ background: "" }}>
              {props.nextjs}
            </span>
            <span className="badge" style={{ background: "" }}>
              {props.typescript}
            </span>
          </div>
          <Card.Text>{props.description}</Card.Text>
          <div className="project-card-links">
            <a
              href={props.sourcecode}
              target="_blank"
              rel="noreferrer"
              className="btn-source-code btn btn-secondary"
            >
              <i className="bi bi-code-slash"></i>
            </a>
            <a
              href={props.liveview}
              target="_blank"
              rel="noreferrer"
              className="btn-live-view btn"
              style={{
                background: "var(--primary-color)",
                color: "var(--text-primary-color)",
              }}
            >
              {props.btnText}
            </a>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProjectCard;
