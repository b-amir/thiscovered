import React from "react";

export const ProfilePic = (): JSX.Element => {
  return (
    <div
      className="grid-profile-pic"
      style={{
        backgroundImage: "url(./assets/defaultPP.svg)"
      }}>
      <img
        className="glasses"
        src="./assets/glassesDWI.svg"
        alt="profile pic"
      />
    </div>
  );
};
