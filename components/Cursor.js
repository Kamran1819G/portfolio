"use client";

import React, { useEffect } from "react";

function Cursor() {
  useEffect(() => {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".circle");

    const colors = [
      "#F4FFE6",
      "#EFFFDA",
      "#E9FFCD",
      "#E4FFC0",
      "#DEFFB2",
      "#D4FE95",
      "#CEFE85",
      "#C9FD74",
    ];

    circles.forEach((circle, index) => {
      circle.x = 0;
      circle.y = 0;
      circle.style.backgroundColor = colors[index % colors.length];
    });

    window.addEventListener("mousemove", (e) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    });

    function animateCircles() {
      let x = coords.x;
      let y = coords.y;

      circles.forEach((circle, index) => {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";

        circle.style.transform = `scale(${
          (circles.length - index) / circles.length
        })`;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
      });

      requestAnimationFrame(animateCircles);
    }

    animateCircles();
  }, []);

  // Inline style object for the circle
  const circleStyle = {
    height: "24px",
    width: "24px",
    borderRadius: "50%",
    backgroundColor: "black",
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 99999999, // Ensure it's on top of all other elements
  };

  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="circle" style={circleStyle}></div>
      ))}
    </>
  );
}

export default Cursor;
