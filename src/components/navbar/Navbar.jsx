import React, { useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import "./Navbar.scss";
import logoDark from "../../assets/images/logo dark.png";

function MyNavbar() {
  useEffect(() => {
    $(window).on("scroll", function () {
      $(window).scrollTop() >= 50
        ? $(".sticky").addClass("stickyadd")
        : $(".sticky").removeClass("stickyadd");
    });
  }, []);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" fixed="top" className="custom-nav sticky">
        <Container>
          <Navbar.Brand className="navbar-brand logo" to="/home">
            <img src={logoDark} alt="Logo" className="img-fluid logo-dark" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NavLink to="/home" className="nav-link">
                Intro
              </NavLink>
              <NavLink to="/education" className="nav-link">
                Education
              </NavLink>
              <NavLink to="/experience" className="nav-link">
                Experience
              </NavLink>
              <NavLink to="/contact" className="nav-link">
                Contact Me
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;
