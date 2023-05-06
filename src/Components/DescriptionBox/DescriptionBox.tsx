/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from "react";
import TriangleIcon from "../../../public/assets/TriangleIcon";

interface IProps {
  title?: string;
  children: React.ReactNode;
  isSpecial?: boolean;
  openAtFirst?: boolean;
}

const mountedStyle = {
  animation: "inAnimation 250ms ease-in",
  height: "100%",
  animationFillMode: "both"
};
const unmountedStyle = {
  animation: "outAnimation 270ms ease-out",
  height: "0px",
  animationFillMode: "both"
};

export function DescriptionBox({
  title,
  children,
  isSpecial,
  openAtFirst
}: IProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(openAtFirst);
  const toggleOpen = (): void => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`${
        isOpen ? "grid-tab-description open" : "grid-tab-description closed"
      }`}
      onClick={toggleOpen}>
      <h3 className="description-title">
        <TriangleIcon className={`triangle-icon ${isOpen ? "up" : "down"}`} />
        {title}
      </h3>

      {isOpen && (
        <div
          className="description-wrapper"
          style={isOpen ? mountedStyle : unmountedStyle}>
          {children}
        </div>
      )}
    </div>
  );
}
