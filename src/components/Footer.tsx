"use client";

import Link from "next/link";
import styles from "@/styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2>
            Status<span>Quest</span>
          </h2>
          <p>Master HTTP status codes with ease 🚀</p>
        </div>

        <div className={styles.links}>
          <Link href="/learn">Docs</Link>
          <Link
            href="https://github.com/yourrepo"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <Link href="/feedback">Feedback</Link>
        </div>

        <div className={styles.copy}>
          <p>
            &copy; {new Date().getFullYear()} StatusQuest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;