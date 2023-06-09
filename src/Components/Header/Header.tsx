import React from "react";
import { scrollToTop } from "../../utils/scrollTo";

interface IProps {
  setTab: React.Dispatch<React.SetStateAction<string>>;
  toggleTheme: () => void;
  getCurrentTheme: () => "dark" | "light" | "system";
}
export const Header: React.FC<IProps> = ({
  setTab,
  toggleTheme,
  getCurrentTheme
}) => {
  return (
    <nav className="header">
      <h1
        className="logo"
        onClick={() => {
          setTab("about");
          scrollToTop();
        }}>
        <span className="logo-this">this</span>
        <span className="logo-dot">.</span>
        <span className="logo-covered">covered</span>
      </h1>
      <div className="theme-switch-wrapper">
        <label className="switch">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={getCurrentTheme() === "dark"}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </nav>
  );
};
