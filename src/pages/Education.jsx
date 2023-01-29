import React from "react";
import "../css/Education.css";
import EducationDetails from "../components/education/EducationDetails";
import CertificateDetails from "../components/education/CertificateDetails";
import Studying from "../assets/images/Studying.png";
import BVPDU from "../assets/images/BVPDU.png";
import AES from "../assets/images/AES.png";
import SPHS from "../assets/images/SPHS.png";

function Education() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex text-center justify-content-between">
              <div className="section-img">
                <img src={Studying} alt="Studying" />
              </div>
              <div className="section-text">
                <h1 className="section-title">Education</h1>
                <p className="section-subtitle">
                  Qualification and Certifications
                </p>
                <div
                  className="competitive-sites-main-div"
                  data-aos="fade-left"
                >
                  <ul className="dev-icons">
                    <li className="competitive-sites-inline" name="HackerRank">
                      <i
                        href="https://www.hackerrank.com/kamran1819g"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          aria-hidden="true"
                          focusable="false"
                          width="1em"
                          height="1em"
                          style={{
                            transform: "rotate(360deg)",
                            color: "rgb(46, 200, 102)",
                          }}
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 24 24"
                          className="iconify"
                          data-icon="simple-icons:hackerrank"
                          data-inline="false"
                        >
                          <path
                            fill="currentColor"
                            d="M0 0v24h24V0zm9.95 8.002h1.805c.061 0 .111.05.111.111v7.767c0 .061-.05.111-.11.111H9.95a.111.111 0 0 1-.111-.11v-2.87H7.894v2.87c0 .06-.05.11-.11.11H5.976a.11.11 0 0 1-.11-.11V8.112c0-.06.05-.11.11-.11h1.806c.061 0 .11.05.11.11v2.869H9.84v-2.87c0-.06.05-.11.11-.11zm2.999 0h5.778c.061 0 .111.05.111.11v7.767a.11.11 0 0 1-.11.112h-5.78a.11.11 0 0 1-.11-.11v-7.77c0-.06.05-.11.11-.11z"
                          ></path>
                        </svg>
                      </i>
                    </li>
                    <li className="competitive-sites-inline" name="Codechef">
                      <i
                        href="https://www.codechef.com/users/kamran1819g"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          aria-hidden="true"
                          focusable="false"
                          width="1em"
                          height="1em"
                          style={{
                            transform: "rotate(360deg)",
                            color: "rgb(91, 70, 56)",
                          }}
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 24 24"
                          className="iconify"
                          data-icon="simple-icons:codechef"
                          data-inline="false"
                        >
                          <path
                            fill="currentColor"
                            d="M11.257.004c-.37.01-.735.04-1.1.095c-.54.054-1.08.325-1.675.595c-.757.324-1.515.649-2.218.703c-1.19.378-1.568.919-1.892 1.351c0 .054-.054.108-.054.108c-.433.865-.487 1.73-.325 2.595c.162.541.378 1.029.54 1.515c.38 1.028.758 2 .92 3.136c.163.325.324.757.432 1.19c.27.865.542 1.838 1.353 2.595l.006-.003c.017.019.03.04.048.057l.021-.01l-.02-.584c.648-.974 1.566-1.623 2.864-1.893c.52-.11 1.081-.15 1.663-.128a8.773 8.773 0 0 1 1.798.236c1.46.378 2.595 1.136 2.65 1.785c.027.354.04.695.032 1.036c0 .064-.004.128-.007.193l.136.068a.639.639 0 0 0 .206-.19l.003-.003l.006-.008c.04-.054.075-.124.11-.194c.02-.037.038-.086.056-.129c.205-.462.362-1.153.538-1.963c.054-.27.11-.487.163-.703c.433-.973 1.027-1.838 1.622-2.65c.973-1.35 1.892-2.595 1.784-4.055c-1.784-3.461-4.272-4.002-5.57-4.272c-.216-.054-.323-.054-.485-.108c-1.338-.244-2.494-.396-3.605-.365zM16.3 14.383a9.86 9.86 0 0 0-.032-.983c-.054-.703-1.19-1.46-2.704-1.838a9.536 9.536 0 0 0-1.744-.236a6.761 6.761 0 0 0-1.555.128c-1.244.27-2.216.92-2.811 1.892l.051 1.431c.667-.355 1.733-.874 3.14-1c.065-.005.136-.005.204-.009c.117-.013.266-.044.444-.044c1.607 0 3.268.534 4.877 1.648c.039-.274.06-.549.07-.823l.045.023c.002-.063.014-.127.015-.19zM11.256.058c.124-.004.254.01.379.011c-.23-.002-.459.003-.687.016c.103-.006.205-.024.308-.027zm.498.015zM10.44.13c-.076.009-.153.013-.229.024c-.817.117-1.774.701-2.75 1.045c.355-.132.714-.296 1.075-.45c.54-.27 1.135-.541 1.621-.595c.094-.014.189-.013.283-.024zm-.229.24c.162 0 .379 0 .541.054a.995.995 0 0 0-.37-.014a1.174 1.174 0 0 1 .316.068c.58 1-.426 5.279-.679 8.149a57.37 57.37 0 0 0 .463 2.72c-.703-1.784-1.406-4.921-1.515-7.354c-.054-.973.001-1.839.218-2.487C9.4.855 9.725.423 10.21.369zm3.136.27c-.81 2.11-.918 6.11-.972 7.354c-.054.54 0 1.73.054 2.595c0 .216.054.432.054.649c0-.217-.054-.379-.054-.595c-.433-3.244-.974-7.136.918-10.002zm3.352.379c-.27 2.162-1.405 3.19-1.783 5.3c-.108 1.676-.325 3.622-.379 5.298c-.054-1.676 0-3.46.27-5.245c.27-1.838.865-3.677 1.892-5.353zM6.32 1.45zm.21.197a.856.856 0 0 1 .6.236l-.014-.007c.133.092.266.209.393.384c-.204.968.255 3.032.04 4.67c.076 1.548.071 3.18.849 4.459c-.98-1.51-1.176-3.438-1.322-5.236c-.113-1.09-.204-2.097-.464-2.903c-.144-.305-.269-.575-.384-.822c-.024-.037-.044-.079-.07-.114a.582.582 0 0 1-.162-.377c0-.054.053-.162.108-.162c.054-.054.161-.056.215-.11a1.013 1.013 0 0 1 .21-.018zm-1.347.613c-.06.02-.092.041-.14.061c.177-.034.362.034.52.318c-.188.892.436 3.369.428 5.104c.313 1.848.55 3.85 1.572 5.115c-1.19-1.351-1.676-3.73-2.054-5.731c-.325-1.568-.596-2.92-1.136-3.352c-.054-.108-.108-.163-.108-.271c0-.162 0-.379.108-.595c-.277.634-.405 1.267-.37 1.901a3.844 3.844 0 0 1 .37-1.901c0-.054.054-.054.054-.108c.012-.016.031-.035.044-.051a.878.878 0 0 1 .226-.257c.055-.061.096-.12.159-.182c-.053.056-.088.11-.134.165c.027-.018.052-.037.084-.052a.49.49 0 0 1 .377-.164zm-.377.164c-.004.007-.008.01-.012.018l.037-.03l-.025.012zm14.76 1.134l-.005.015c.038-.005.075-.017.113-.015c-.037-.002-.076.01-.115.02c-.863 2.642-1.887 5.284-2.911 7.926a.018.018 0 0 1-.002.003c-.087.465-.234.884-.54 1.19c.433-.487.486-1.191.54-2.056c.054-.811.054-1.676.487-2.542c0-.053.001-.105.053-.159l.001-.002c.097-.353.202-.689.317-1.018c.418-1.29 1.14-3.166 2.013-3.34c.016-.006.034-.019.05-.022zM8.374 16.21l-.324.108c.162.217.27.38.378.433a.784.784 0 0 0 .379.108c.054 0 .161 0 .215-.054l.812-.27c.054 0 .108-.054.162-.054c.108 0 .162 0 .27.054l.271.27l.27-.054c-.108-.162-.27-.323-.378-.377c-.108-.054-.217-.11-.379-.11h-.108l-.866.325h-.161c-.109 0-.216 0-.27-.054c-.054-.054-.163-.162-.271-.325zm-2.596.541c-.27.162-.649.433-1.19.649c-.54.216-.973.433-1.19.649c-.215.216-.323.432-.323.649c0 .108.054.163.162.217c.054.054.163.054.217.108a27.9 27.9 0 0 1 2.216 1.08c.109.054.217.163.272.217c.054.054.107.054.161.054c.109 0 .27-.053.378-.162c.108-.108.163-.217.163-.325c0-.108-.055-.161-.163-.215c0 0-.433-.217-1.19-.541a11.967 11.967 0 0 1-1.188-.595c.162-.27.486-.487.973-.703c.54-.216.92-.433 1.081-.595c.054-.054.054-.108.054-.162a.412.412 0 0 0-.108-.217a.415.415 0 0 0-.27-.108zm11.247 0a.408.408 0 0 0-.216.108c-.054.108-.109.163-.109.217v.054c.162.162.38.27.704.378c.27.054.54.163.811.217c.324.108.54.27.649.486v.055c0 .054-.109.162-.325.27c-.108.054-.325.217-.595.433c-.27.162-.433.323-.595.377c-.216.109-.378.217-.432.326c-.054.054-.054.107-.054.161c0 .108.054.108.108.216s.162.11.216.11c.054 0 .108-.056.162-.056c.27-.162.65-.378 1.082-.757c.486-.378.865-.648 1.082-.81c.216-.108.323-.217.323-.38c0-.053 0-.161-.108-.215c-.378-.433-.918-.702-1.567-.919c-.108-.054-.27-.109-.595-.163c-.162-.054-.325-.108-.433-.108zm-2.974.81c-.27 0-.487.056-.649.218c-.216.162-.27.432-.216.757c0 .27.108.486.27.703c.162.216.379.325.595.325c.162 0 .27-.056.433-.11c.27-.162.379-.432.379-.918c0-.379-.109-.649-.271-.81a.915.915 0 0 0-.541-.164zm-4.488.055c-.27 0-.486.055-.648.217c-.217.162-.27.432-.216.757c0 .27.107.486.27.702s.378.326.594.326c.163 0 .271-.056.433-.11c.27-.162.378-.432.378-.918c0-.433-.108-.703-.27-.81a.915.915 0 0 0-.54-.164zm0 .65c.163 0 .271.108.271.27c0 .162-.163.27-.27.27c-.163 0-.27-.108-.27-.27s.107-.27.27-.27zm4.38.054c.162 0 .271.107.271.27c0 .108-.109.27-.27.27c-.163 0-.27-.108-.27-.27c0-.163.107-.27.27-.27zm-2.703 2.108l.162.324a.947.947 0 0 0 .216.271c.054.054.163.162.27.162h.109c.108 0 .161 0 .215-.054c.054-.054.164-.054.218-.108l.161-.162c.054-.054.108-.109.108-.163c.054-.054.054-.108.108-.162c0-.054.054-.108.054-.108c-.054.108-.162.216-.216.324c-.108.054-.161.163-.27.163c-.107.054-.216.054-.324.054s-.216 0-.27-.054c-.108 0-.163-.054-.217-.108l-.162-.163c-.054-.054-.108-.162-.162-.216zm-.866 1.028c-1.136 0-1.838 1.514-3.46.162c-.432 2.65 2.758 2.866 4.11 1.73c.92-.81.648-1.946-.65-1.892zm2.866 0c-1.297-.054-1.568 1.082-.648 1.893c1.351 1.135 4.54.918 4.108-1.731c-1.622 1.352-2.27-.162-3.46-.162z"
                          ></path>
                        </svg>
                      </i>
                    </li>
                    <li className="competitive-sites-inline" name="Codeforces">
                      <i href="#" target="_blank" rel="noreferrer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          aria-hidden="true"
                          focusable="false"
                          width="1em"
                          height="1em"
                          style={{
                            transform: "rotate(360deg)",
                            color: "rgb(31, 138, 203)",
                          }}
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 24 24"
                          className="iconify"
                          data-icon="simple-icons:codeforces"
                          data-inline="false"
                        >
                          <path
                            fill="currentColor"
                            d="M4.5 7.5A1.5 1.5 0 0 1 6 9v10.5A1.5 1.5 0 0 1 4.5 21h-3C.673 21 0 20.328 0 19.5V9c0-.828.673-1.5 1.5-1.5h3zm9-4.5A1.5 1.5 0 0 1 15 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-3c-.827 0-1.5-.672-1.5-1.5v-15c0-.828.673-1.5 1.5-1.5h3zm9 7.5A1.5 1.5 0 0 1 24 12v7.5a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5h3z"
                          ></path>
                        </svg>
                      </i>
                    </li>
                    <li className="competitive-sites-inline" name="Hackerearth">
                      <i href="#" target="_blank" rel="noreferrer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          aria-hidden="true"
                          focusable="false"
                          width="1em"
                          height="1em"
                          style={{
                            transform: "rotate(360deg)",
                            color: "rgb(50, 55, 84)",
                          }}
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 24 24"
                          className="iconify"
                          data-icon="simple-icons:hackerearth"
                          data-inline="false"
                        >
                          <path
                            fill="currentColor"
                            d="M18.447 20.936H5.553V19.66h12.894zM20.973 0H9.511v6.51h.104c.986-1.276 2.206-1.4 3.538-1.306c1.967.117 3.89 1.346 4.017 5.169v7.322c0 .089-.05.177-.138.177h-2.29c-.09 0-.253-.082-.253-.177V10.6c0-1.783-.58-3.115-2.341-3.115c-1.282 0-2.637.892-2.637 2.77v7.417c0 .089-.008.072-.102.072h-2.29c-.09 0-.29.022-.29-.072V0H3.178c-.843 0-1.581.673-1.581 1.515v20.996c0 .843.738 1.489 1.58 1.489h17.797c.843 0 1.431-.646 1.431-1.489V1.515c0-.842-.588-1.515-1.43-1.515"
                          ></path>
                        </svg>
                      </i>
                    </li>
                    <li className="competitive-sites-inline" name="Kaggle">
                      <i href="#" target="_blank" rel="noreferrer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          aria-hidden="true"
                          focusable="false"
                          width="1em"
                          height="1em"
                          style={{
                            transform: "rotate(360deg)",
                            color: "rgb(32, 190, 255)",
                          }}
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 24 24"
                          className="iconify"
                          data-icon="simple-icons:kaggle"
                          data-inline="false"
                        >
                          <path
                            fill="currentColor"
                            d="M.102 7.348c-.068 0-.102.034-.102.102v6.752c0 .068.034.102.102.102h.705c.068 0 .103-.034.103-.103v-1.48l.418-.4l1.502 1.91a.184.184 0 0 0 .143.072h.909c.048 0 .075-.013.082-.04c.013-.041.006-.075-.02-.102l-1.982-2.462l1.9-1.839c.02-.02.023-.05.01-.092c-.014-.034-.041-.05-.082-.05h-.94c-.047 0-.095.023-.143.07L.91 11.608V7.45c0-.068-.035-.102-.103-.102zm18.042 0c-.068 0-.102.034-.102.102v6.752c0 .068.034.101.102.101h.705c.068 0 .102-.034.102-.102V7.45c0-.068-.034-.102-.102-.102zM5.961 9.625c-.565 0-1.11.181-1.634.542c-.055.054-.065.102-.031.143l.368.52c.027.048.071.055.133.021c.394-.272.783-.409 1.164-.409c.293 0 .516.09.669.266a.84.84 0 0 1 .2.644c-.661.068-1.155.15-1.482.245c-.83.238-1.246.691-1.246 1.358c0 .422.153.77.46 1.042c.313.266.684.398 1.113.398c.47 0 .855-.112 1.154-.337v.143c0 .069.038.102.113.102h.704c.068 0 .102-.033.102-.102v-2.829c0-.66-.224-1.14-.674-1.44c-.306-.205-.677-.307-1.113-.307zm4.322 0c-.674 0-1.194.263-1.562.787c-.313.436-.47.967-.47 1.594c0 .66.163 1.208.49 1.644c.375.497.892.745 1.553.745c.531 0 .957-.132 1.277-.398v.531c0 .858-.413 1.287-1.236 1.287c-.361 0-.732-.19-1.114-.572a.098.098 0 0 0-.071-.03a.11.11 0 0 0-.082.03l-.48.48c-.04.062-.038.113.01.154c.136.115.256.212.358.29c.102.079.19.142.265.19c.354.197.729.296 1.124.296c.68 0 1.207-.193 1.578-.577c.371-.385.557-.949.557-1.69V9.82c0-.068-.034-.102-.102-.102h-.705c-.069 0-.102.034-.102.102v.204c-.348-.266-.777-.399-1.287-.399zm4.803 0c-.675 0-1.195.263-1.563.787c-.313.436-.47.967-.47 1.594c0 .66.163 1.208.49 1.644c.375.497.892.745 1.553.745c.531 0 .957-.132 1.277-.398v.531c0 .858-.412 1.287-1.236 1.287c-.361 0-.732-.19-1.114-.572a.098.098 0 0 0-.071-.03a.11.11 0 0 0-.082.03l-.48.48c-.04.062-.037.113.01.154c.136.115.256.212.358.29c.102.079.19.142.266.19c.354.197.728.296 1.123.296c.681 0 1.207-.193 1.578-.577c.371-.385.557-.949.557-1.69V9.82c0-.068-.034-.102-.102-.102h-.705c-.068 0-.102.034-.102.102v.204c-.348-.266-.777-.399-1.287-.399zm6.745 0c-.653 0-1.185.211-1.593.634c-.443.463-.664 1.028-.664 1.695c0 .709.225 1.29.674 1.747c.463.463 1.042.694 1.737.694c.646 0 1.215-.183 1.705-.551c.055-.041.055-.088 0-.143l-.48-.49c-.04-.041-.092-.041-.153 0c-.3.21-.637.316-1.011.316c-.423 0-.773-.119-1.052-.357a1.318 1.318 0 0 1-.43-.838h3.32c.068 0 .102-.034.102-.102l.01-.224c.035-.688-.166-1.26-.602-1.717a2.075 2.075 0 0 0-1.563-.664zm-.02.787a1.2 1.2 0 0 1 .837.317c.246.21.371.473.378.786h-2.461c.06-.327.207-.593.439-.797c.231-.204.5-.306.807-.306zm-11.425.102c.62 0 1.014.218 1.185.654v1.685c-.17.436-.576.654-1.216.654c-.313 0-.569-.099-.766-.296c-.266-.252-.398-.654-.398-1.206c0-.994.398-1.491 1.195-1.491zm4.802 0c.62 0 1.015.218 1.185.654v1.685c-.17.436-.576.654-1.216.654c-.313 0-.568-.099-.766-.296c-.265-.252-.398-.654-.398-1.206c0-.994.398-1.491 1.195-1.491zm-8.359 1.655v1.021c-.286.286-.667.412-1.144.378a.88.88 0 0 1-.45-.158a.516.516 0 0 1-.224-.363c-.034-.266.116-.47.45-.613c.245-.109.7-.197 1.368-.265z"
                          ></path>
                        </svg>
                      </i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h1 className="educations-header">Educations</h1>
          </div>
          <div className="row flex-direction-column">
            <div className="col-lg-12">
              <EducationDetails
                img={BVPDU}
                imgAlt="BVPDU"
                CollegeName="Bharati Vidyapeeth Deemed University College of Engineering Pune."
                education="Bachelor of Technology in Computer Science and Engineering (AIML)."
                year="2021 - Present"
                description="⚡ Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem excepturi nisi id. Aliquid veniam rem officia "
              />
              <EducationDetails
                img={AES}
                imgAlt="AES"
                CollegeName="The Andhra Education Society"
                education="12th Science PCMB"
                year="2019 - 2021"
                description="⚡ Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem excepturi nisi id. Aliquid veniam rem officia ipsam repellat eaque voluptatum? Quo eligendi earum tempora nisi eum minus molestias sequi adipisci?"
              />
              <EducationDetails
                img={SPHS}
                imgAlt="SPHS"
                CollegeName="Sitaram Prakash High School"
                education="10th"
                year="2018 - 2019"
                description="⚡ Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem excepturi nisi id. Aliquid veniam rem officia ipsam repellat eaque voluptatum? Quo eligendi earum tempora nisi eum minus molestias sequi adipisci?"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h1 className="certs-header">Certifications</h1>
          </div>
          <div className="row justify-content-evenly">
            <CertificateDetails
              certLink="https://www.coursera.org/account/accomplishments/certificate/AF99N4ZEREE8"
              certImg="https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~AF99N4ZEREE8/CERTIFICATE_LANDING_PAGE~AF99N4ZEREE8.jpeg"
              certName="Meta Front-End Developer Professional Certificate"
              from="- Meta Inc, Coursera"
            />
            <CertificateDetails
              certLink="#"
              certImg="https://resources.trifocal.eu.com/wp-content/uploads/2018/06/temp-logo-img.png"
              certName="Google UX Design Professional Certificate"
              from="- Google LLC, Coursera"
            />
            <CertificateDetails
              certLink="#"
              certImg="https://resources.trifocal.eu.com/wp-content/uploads/2018/06/temp-logo-img.png"
              certName="Cloud Computing"
              from="- Lorem"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Education;
