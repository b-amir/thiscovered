import React from "react";
import "./style.css";

export const ProfilePic = (): JSX.Element => {
  return (
    <div
      className="grid-profile-pic"
      style={{
        backgroundImage: "url(./assets/defaultPP.svg)",
        position: "relative",
        top: "-25px",
        left: "30px",
        width: "200px",
        height: "200px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "50%",
        border: "4px solid var(--border-color-pp)",
        filter: "drop-shadow(0px 0px 2px #00000030) var(--filter-pp)"
      }}>
      <img
        className="glasses"
        src="./assets/glassesDWI.svg"
        alt="profile pic"
      />
    </div>
  );
};
