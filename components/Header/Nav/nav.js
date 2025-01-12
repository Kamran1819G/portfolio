"use client";

import React from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import { perspective, slideIn } from "./anim";
import { motion } from "framer-motion";
import { useResumeLink } from "@/hooks/useResumeLink";

const baseLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Educations",
    href: "/education",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

const footerLinks = [
  {
    title: "GitHub",
    href: "https://github.com/kamran1819g",
  },
  {
    title: "LinkedIn",
    href: "https://linkedin.com/in/kamran1819g",
  },
  {
    title: "Instagram",
    href: "https://instagram.com/kamran1819g",
  },
  {
    title: "Twitter",
    href: "https://x.com/kamran1819g",
  },
];

export default function Nav() {
  const { resumeLink, loading, error } = useResumeLink();

  // Combine base links with dynamic resume link
  const links = [
    ...baseLinks.slice(0, 2),
    {
      title: "Resume",
      href: error ? "/" : resumeLink,
      disabled: loading || !resumeLink,
    },
    ...baseLinks.slice(2),
  ];

  return (
    <div className={styles.nav}>
      <div className={styles.body}>
        {links.map((link, i) => {
          const { title, href, disabled } = link;
          return (
            <div key={`b_${i}`} className={styles.linkContainer}>
              <Link
                href={href}
                style={{ pointerEvents: disabled ? "none" : "" }}
              >
                <motion.div
                  custom={i}
                  variants={perspective}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  style={{ opacity: disabled ? 0.5 : 1 }}
                >
                  {title}
                </motion.div>
              </Link>
            </div>
          );
        })}
      </div>
      <motion.div className={styles.footer}>
        {footerLinks.map((link, i) => {
          const { title, href } = link;
          return (
            <motion.a
              variants={slideIn}
              href={href}
              custom={i}
              initial="initial"
              animate="enter"
              exit="exit"
              key={`f_${i}`}
            >
              {title}
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
