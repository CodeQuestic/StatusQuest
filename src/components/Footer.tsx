"use client";

import Link from "next/link";
import styles from "@/styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h2 className={styles.logo}><Link href="/">StatusQuest</Link></h2>

        <div className={styles.links}>
          <Link
            href="https://github.com/CodeQuestic/StatusQuest"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repo
          </Link>
          <Link
            href="https://github.com/CodeQuestic"
            target="_blank"
            rel="noopener noreferrer"
          >
            CodeQuestic
          </Link>
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
