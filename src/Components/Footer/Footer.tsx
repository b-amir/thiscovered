import React from "react";
import "./style.css";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <h1>
          <span className="logo_this">this</span>
          <span className="logo_dot">.</span>
          <span className="logo_covered">covered</span>
        </h1>{" "}
      </div>

      <div className="footer-divider">/*</div>
      <div className="footer-info">
        Hey, I&apos;m{" "}
        <a
          href="https://www.linkedin.com/in/amirbazgir/"
          target="_blank"
          rel="noopener noreferrer">
          <img
            className="linkedin-logo footer-icon"
            src="./assets/linkedin.svg"
            alt="linkedin logo"
            // width={12}
            height={14}
          />
          Amir Bazgir
        </a>{" "}
        and I make quirky things on the internet.
      </div>
      <div className="footer-divider">*/</div>
      <div className="footer-info">
        <a
          href="https://www.github.com/theamirm/"
          target="_blank"
          rel="noopener noreferrer">
          <img
            className="github-logo footer-icon"
            src="./assets/github2.svg"
            alt="github logo"
            // width={12}
            height={16}
          />
          Edit on github
        </a>
      </div>
    </footer>
  );
};
