import React from "react";

interface IProps {
  setTab: React.Dispatch<React.SetStateAction<string>>;
  toggleTheme: () => void;
  getCurrentTheme: () => "dark" | "light" | "system";
}
export const Navbar: React.FC<IProps> = ({
  setTab,
  toggleTheme,
  getCurrentTheme
}) => {
  return (
    <nav className="navbar">
      <h1
        className="logo"
        onClick={() => {
          setTab("about");
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
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
