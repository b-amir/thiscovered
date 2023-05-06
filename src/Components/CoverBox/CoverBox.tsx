/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect } from "react";
import { InfoBox } from "./InfoBox";
import { type IInfoBoxBG } from "../../types/IInfoBoxBG";
import { type IPerson } from "../../types/IPerson";
import { useDrag } from "../../hooks/useDrag";
import { ProfilePic } from "../ProfilePic";
import { type Size, useWindowSize } from "../../hooks/useWindowSize";

interface IProps {
  imageUrl: string;
  Person: IPerson;
  InfoBoxBG: IInfoBoxBG;
}

export const CoverBox: React.FC<IProps> = ({
  imageUrl,
  Person,
  InfoBoxBG
}: IProps) => {
  const {
    position,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    zoom,
    handleScroll,
    enableScroll,
    disableScroll,
    handleTouchStart,
    handleTouchMove
  } = useDrag();

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // add a listener to the window to update the dimensions
  // of the cover box when the window is resized
  const size: Size = useWindowSize();

  let backgroundsize: string | number;
  if (size.width != null && size.width < 425) {
    // for visual porpuses, the mobile version's proportions
    // doesnt follow the usual aspect ratio. hence this trick:
    backgroundsize = "";
  } else {
    backgroundsize = `${zoom * 100}%`;
  }

  return (
    <div
      className="grid-cover-box"
      onMouseDown={handleMouseDown}
      onWheel={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onMouseEnter={disableScroll}
      onMouseLeave={enableScroll}
      id="cover"
      style={{
        backgroundImage: `url(${
          imageUrl !== "" ? imageUrl : "./assets/defaultBG.svg"
        })`,
        backgroundPosition: `${position.x}px ${position.y}px`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${backgroundsize}`,
        touchAction: "none",
        filter: `${imageUrl === "" ? "var(--filter-pp)" : "none"}`
      }}>
      {size.width < 425 ? <ProfilePic /> : null}
      <InfoBox
        name={Person.name}
        email={Person.email}
        jobTitle={Person.jobTitle}
        font={Person.font}
        fontColor={Person.fontColor}
        shadow={Person.shadow}
        hexBackgroundColor={InfoBoxBG.hexBackgroundColor}
        rgbaBackgroundColor={InfoBoxBG.rgbaBackgroundColor}
        borderRadius={InfoBoxBG.borderRadius}
        alpha={InfoBoxBG.alpha}
        fullHeight={InfoBoxBG.fullHeight}
      />
    </div>
  );
};
