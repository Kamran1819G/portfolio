"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./PageTransition.module.css";

export default function PageTransition({ children, className }) {
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    setLoading(false);
    const timer = setTimeout(() => {
      if (contentRef.current) contentRef.current.classList.add(styles.loaded);
    }, 50); // delay 100ms before animation is triggered

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={contentRef} className={`${styles.content} ${className}`}>
      {children}
    </div>
  );
}
