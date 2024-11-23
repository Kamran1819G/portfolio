"use client";

import React from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import { perspective, slideIn } from "./anim";
import { motion } from "framer-motion";

const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Educations",
    href: "/education",
  },
  {
    title: "Resume",
    href: "/",
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
  return (
    <div className={styles.nav}>
      <div className={styles.body}>
        {links.map((link, i) => {
          const { title, href } = link;
          return (
            <div key={`b_${i}`} className={styles.linkContainer}>
              <Link href={href}>
                <motion.div
                  custom={i}
                  variants={perspective}
                  initial="initial"
                  animate="enter"
                  exit="exit"
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
