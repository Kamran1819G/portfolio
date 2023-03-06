import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import { Route, Switch } from "react-router-dom";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui.min";
import { useEffect } from "react";

import Navbar from "./components/navbar/Navbar";
import Cursor from "./components/cursor/Cursor";
import Education from "./pages/Education";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Opensource from "./pages/Opensource";
import Contact from "./pages/Contact";
import Footer from "./components/footer/Footer";

function App() {
  useEffect(() => {
    // Cursor Script
    var cursor = document.getElementById("cursor");
    document.onmousemove = function (e) {
      cursor.style.left = e.pageX - 25 + "px";
      cursor.style.top = e.pageY - 25 + "px";
      cursor.style.display = "block";
    };

    // loader Script
    // $("body").prepend(
    //   '<div class="loader_bg"><div class="loader"><h1>print("Hello World! 🌏")</h1></div></div>'
    // );
    // $(document).ready(function () {
    //   setTimeout(function () {
    //     $(".loader_bg").remove();
    //   }, 3500);
    // });

    //Navbar
    $(window).on("scroll", function () {
      $(window).scrollTop() >= 50
        ? $(".sticky").addClass("stickyadd")
        : $(".sticky").removeClass("stickyadd");
    });
  }, []);
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/education" component={Education} />
        <Route path="/experience" component={Experience} />
        <Route path="/opensource" component={Opensource} />
        <Route path="/contact" component={Contact} />
      </Switch>
      <Footer />
      <Cursor />
    </>
  );
}

export default App;
