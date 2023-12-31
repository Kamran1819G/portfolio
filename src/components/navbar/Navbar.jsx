import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import "./Navbar.scss";
import logoDark from "../../assets/images/logo dark.png";

function Navbar() {
  useEffect(() => {
    $(window).on("scroll", function () {
      $(window).scrollTop() >= 50
        ? $(".sticky").addClass("stickyadd")
        : $(".sticky").removeClass("stickyadd");
    });
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top custom-nav sticky">
        <div className="container">
          <NavLink className="navbar-brand logo" to="/home">
            <img src={logoDark} alt="Logo" className="img-fluid logo-dark" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to="/home" className="nav-link">
                  Intro
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/education" className="nav-link">
                  Education
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/experience" className="nav-link">
                  Experience
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">
                  Contact Me
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
