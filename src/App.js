import "./App.scss";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";
import { Route, Switch } from "react-router-dom";
import "jquery-ui-dist/jquery-ui.min";
import { useEffect } from "react";

import Navbar from "./components/navbar/Navbar";
import Cursor from "./components/cursor/Cursor";
import Education from "./pages/Education";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

function App() {
  useEffect(() => {

    // loader Script
    // $("body").prepend(
    //   '<div class="loader_bg"><div class="loader"><h1>print("Hello World! 🌏")</h1></div></div>'
    // );
    // $(document).ready(function () {
    //   setTimeout(function () {
    //     $(".loader_bg").remove();
    //   }, 3500);
    // });
  }, []);
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/education" component={Education} />
        <Route path="/experience" component={Experience} />
        <Route path="/contact" component={Contact} />
      </Switch>
      <Footer />
      <Cursor />
    </>
  );
}

export default App;
