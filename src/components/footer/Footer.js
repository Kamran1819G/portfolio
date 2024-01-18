import React from 'react'
import './Footer.scss'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <>
    <footer className="sticky bg-light">
      <Container>
        <Row className="pt-4 pb-4">
          <Col lg={12} className="d-flex justify-content-between">
            <div className="float-left float_none my-2 ">
              <p className="copy-rights text-muted mb-0">
                @2022 Kamran Khan
              </p>
            </div>
            <div className="my-2">
              <p >
                Tech Stack Used: ReactJS | Bootstrap | React-Router | Github | Vercel
              </p>
            </div>
            <div className="float-right float_none my-2">
              <ul className="list-inline fot_social mb-0">
                <li className="list-inline-item">
                  <a
                    href="https://github.com/kamran1819g"
                    className="social-icon text-muted"
                    ><i className= "bi bi-github"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://facebook.com/kamran1819g"
                    className="social-icon text-muted"
                    ><i className="bi bi-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://www.linkedin.com/in/kamran1819g"
                    className="social-icon text-muted">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://www.instagram.com/kamran1819g"
                    className="social-icon text-muted"
                    ><i className="bi bi-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
    </>
  )
}

export default Footer