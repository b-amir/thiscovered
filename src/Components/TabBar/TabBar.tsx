import React from "react";
import "./style.css";

export interface IProps {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}
export const TabBar: React.FC<IProps> = ({ tab, setTab }: IProps) => {
  return (
    <div
      // className="tabs"
      className="grid-tab-bar">
      <div
        className={tab === "about" ? "tab active" : "tab"}
        onClick={() => {
          setTab("about");
        }}>
        About
      </div>
      <div
        className={tab === "background" ? "tab active" : "tab"}
        onClick={() => {
          setTab("background");
        }}>
        Background
      </div>
      <div
        className={tab === "infoBox" ? "tab active" : "tab"}
        onClick={() => {
          setTab("infoBox");
        }}>
        Info Box
      </div>
      <div
        className={tab === "checklist" ? "bonus tab active" : "bonus tab"}
        onClick={() => {
          setTab("checklist");
        }}>
        Checklist
      </div>
    </div>
  );
};
