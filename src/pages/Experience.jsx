import React from "react";
import ExperienceCard from "../components/experience/ExperienceCard";
import "../css/Experience.css";
import ManWorking from "../assets/images/man-working.gif";

function Experience() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-space-between">
              <div className="section-img">
                <img src={ManWorking} alt="Man Working" />
              </div>
              <div className="section-text text-center">
                <h1 className="section-title">Experience</h1>
                <h3 className="section-subtitle">
                  Work, Internship and Volunteership
                </h3>
                <p className="section-description">
                  I have worked with many evolving startups as ML Developer,
                  Designer and Software Architect. I have also worked with some
                  well established companies mostly as AI Developer. I love
                  organising events and that is why I am also involved with many
                  opensource communities as a representative.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h1 className="section-title mb-5">Experiences</h1>
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-evenly">
              <ExperienceCard
                bgColor="rgb(20, 124, 244)"
                companyName="Google"
                img="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iOTYiIGhlaWdodD0iOTYiCnZpZXdCb3g9IjAgMCA0OCA0OCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBmaWxsPSIjZmJjMDJkIiBkPSJNNDMuNjExLDIwLjA4M0g0MlYyMEgyNHY4aDExLjMwM2MtMS42NDksNC42NTctNi4wOCw4LTExLjMwMyw4Yy02LjYyNywwLTEyLTUuMzczLTEyLTEyCXM1LjM3My0xMiwxMi0xMmMzLjA1OSwwLDUuODQyLDEuMTU0LDcuOTYxLDMuMDM5bDUuNjU3LTUuNjU3QzM0LjA0Niw2LjA1MywyOS4yNjgsNCwyNCw0QzEyLjk1NSw0LDQsMTIuOTU1LDQsMjRzOC45NTUsMjAsMjAsMjAJczIwLTguOTU1LDIwLTIwQzQ0LDIyLjY1OSw0My44NjIsMjEuMzUsNDMuNjExLDIwLjA4M3oiPjwvcGF0aD48cGF0aCBmaWxsPSIjZTUzOTM1IiBkPSJNNi4zMDYsMTQuNjkxbDYuNTcxLDQuODE5QzE0LjY1NSwxNS4xMDgsMTguOTYxLDEyLDI0LDEyYzMuMDU5LDAsNS44NDIsMS4xNTQsNy45NjEsMy4wMzkJbDUuNjU3LTUuNjU3QzM0LjA0Niw2LjA1MywyOS4yNjgsNCwyNCw0QzE2LjMxOCw0LDkuNjU2LDguMzM3LDYuMzA2LDE0LjY5MXoiPjwvcGF0aD48cGF0aCBmaWxsPSIjNGNhZjUwIiBkPSJNMjQsNDRjNS4xNjYsMCw5Ljg2LTEuOTc3LDEzLjQwOS01LjE5MmwtNi4xOS01LjIzOEMyOS4yMTEsMzUuMDkxLDI2LjcxNSwzNiwyNCwzNgljLTUuMjAyLDAtOS42MTktMy4zMTctMTEuMjgzLTcuOTQ2bC02LjUyMiw1LjAyNUM5LjUwNSwzOS41NTYsMTYuMjI3LDQ0LDI0LDQ0eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMxNTY1YzAiIGQ9Ik00My42MTEsMjAuMDgzTDQzLjU5NSwyMEw0MiwyMEgyNHY4aDExLjMwM2MtMC43OTIsMi4yMzctMi4yMzEsNC4xNjYtNC4wODcsNS41NzEJYzAuMDAxLTAuMDAxLDAuMDAyLTAuMDAxLDAuMDAzLTAuMDAybDYuMTksNS4yMzhDMzYuOTcxLDM5LjIwNSw0NCwzNCw0NCwyNEM0NCwyMi42NTksNDMuODYyLDIxLjM1LDQzLjYxMSwyMC4wODN6Ij48L3BhdGg+PC9zdmc+"
                imgAlt="Google"
                position="Software Engineer"
                year="Someday in Future"
                description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua."
                point1="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                point2="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
              />
              <ExperienceCard
                bgColor="rgb(34, 34, 34)"
                companyName="Microsoft"
                img="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iOTYiIGhlaWdodD0iOTYiCnZpZXdCb3g9IjAgMCA0OCA0OCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBmaWxsPSIjZmY1NzIyIiBkPSJNNiA2SDIyVjIySDZ6IiB0cmFuc2Zvcm09InJvdGF0ZSgtMTgwIDE0IDE0KSI+PC9wYXRoPjxwYXRoIGZpbGw9IiM0Y2FmNTAiIGQ9Ik0yNiA2SDQyVjIySDI2eiIgdHJhbnNmb3JtPSJyb3RhdGUoLTE4MCAzNCAxNCkiPjwvcGF0aD48cGF0aCBmaWxsPSIjZmZjMTA3IiBkPSJNMjYgMjZINDJWNDJIMjZ6IiB0cmFuc2Zvcm09InJvdGF0ZSgtMTgwIDM0IDM0KSI+PC9wYXRoPjxwYXRoIGZpbGw9IiMwM2E5ZjQiIGQ9Ik02IDI2SDIyVjQySDZ6IiB0cmFuc2Zvcm09InJvdGF0ZSgtMTgwIDE0IDM0KSI+PC9wYXRoPjwvc3ZnPg=="
                imgAlt="Microsoft"
                position="Software Engineer"
                year="Someday in Future"
                description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua."
                point1="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                point2="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
              />
              <ExperienceCard
                bgColor="rgb(20, 124, 244)"
                companyName="Facebook"
                img="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBmaWxsPSIjMDM5YmU1IiBkPSJNMjQgNUExOSAxOSAwIDEgMCAyNCA0M0ExOSAxOSAwIDEgMCAyNCA1WiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yNi41NzIsMjkuMDM2aDQuOTE3bDAuNzcyLTQuOTk1aC01LjY5di0yLjczYzAtMi4wNzUsMC42NzgtMy45MTUsMi42MTktMy45MTVoMy4xMTl2LTQuMzU5Yy0wLjU0OC0wLjA3NC0xLjcwNy0wLjIzNi0zLjg5Ny0wLjIzNmMtNC41NzMsMC03LjI1NCwyLjQxNS03LjI1NCw3LjkxN3YzLjMyM2gtNC43MDF2NC45OTVoNC43MDF2MTMuNzI5QzIyLjA4OSw0Mi45MDUsMjMuMDMyLDQzLDI0LDQzYzAuODc1LDAsMS43MjktMC4wOCwyLjU3Mi0wLjE5NFYyOS4wMzZ6Ij48L3BhdGg+PC9zdmc+"
                imgAlt="FaceBook"
                position="Software Engineer"
                year="Someday in Future"
                description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua."
                point1="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                point2="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Experience;
