import React from 'react'

function Footer() {
  return (
    <>
    <footer className="sticky bg-light">
      <div className="container">
        <div className="row pt-4 pb-4">
          <div className="col-lg-12 d-flex justify-content-between">
            <div className="float-left float_none mt-2 mb-2">
              <p className="copy-rights text-muted mb-0">
                Made with 💖 by Kamran Khan..
              </p>
            </div>
            <div className="float-right float_none mt-2 mb-2">
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
                    <i class="bi bi-linkedin"></i>
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
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer