import React from "react";
import "../../style.css";
// import { BackgroundTab } from "../../Pages/Background/BackgroundTab";
// import { hexToRgb } from "../../utils/hexToRgb";

interface InfoBoxProps {
  name: string;
  jobTitle: string;
  email: string;
  font: string;
  hexBackgroundColor: string;
  rgbaBackgroundColor: string;
  borderRadius: number;
  alpha: number;
  fullHeight: boolean;
  fontColor: string;
  shadow: boolean;
}

export const InfoBox: React.FC<InfoBoxProps> = ({
  name,
  jobTitle,
  email,
  fontColor,
  hexBackgroundColor,
  rgbaBackgroundColor,
  borderRadius,
  shadow,
  font,
  alpha,
  fullHeight
}: InfoBoxProps) => {
  const FullHeightInfoBoxStyle = {
    backgroundColor: rgbaBackgroundColor,
    borderRadius: 0,
    height: "100%",

    transform: "translateY(0%)",
    top: 0,
    right: 0,
    borderRight: "1px solid transparent",
    borderTop: "1px solid transparent",
    borderBottom: "1px solid transparent",
    transition:
      "top 0s ease-in-out 0s, border 0.2s ease-in-out 0s, right 0.5s ease 0s, height 0.9s cubic-bezier(0.87,-1.47, 0, 2.76) 0.9s, translate 3s ease-in-out 0s, border-radius 0.3s ease-in-out 0s"
  };

  const InfoBoxStyle = {
    backgroundColor: rgbaBackgroundColor,
    height: "80%",
    borderRadius: `${borderRadius}` + "px",
    top: "50%",
    transform: "translateY(-50%)",
    // right: "40px",
    // display: "flex",
    // padding: "55px 35px",
    // justifyContent: "center",
    border: "1px solid rgba(103, 116, 116, 0.3)",
    transition:
      "top 0s ease-in-out 0s, border 3s ease-in-out 0s, height 0.5s cubic-bezier(1.87,-1.47, 0, 2.76) 0.2s, translate 1s ease 0.2s, right 1s ease-in-out 0.1s, border-radius 0.3s ease-in-out 0s"
  };

  const NameFont = {
    fontFamily: font,
    color: fontColor,
    textShadow: `${shadow ? "0px 0px 5px #00000045" : "none"}`,
    transition: "all 0.2s ease 0s"
  };

  return (
    <div
      className="grid-info-box"
      style={fullHeight ? FullHeightInfoBoxStyle : InfoBoxStyle}>
      {name.length > 0 && (
        <h2 className="InfoBox_name" style={NameFont}>
          {name}
        </h2>
      )}
      {jobTitle.length > 0 && <p className="InfoBox_job_title">{jobTitle}</p>}
      {email.length > 0 && <p className="InfoBox_email">{email}</p>}
    </div>
  );
};
