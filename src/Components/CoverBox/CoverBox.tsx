/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect } from "react";
import { InfoBox } from "./InfoBox";
import { type IPerson, type IInfoBoxBG } from "../../App";
import "./style.css";
import { useDrag } from "../../hooks/useDrag";
import { useWindowSize } from "../../hooks/useWindowSize";
import type { Size } from "../../hooks/useWindowSize";
import { downloadImage } from "../../utils/downloadImage";

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

  // use domtoiamge to download the #cover element and all it's children as a png

  // const fetchCSS = async (url) => {
  //   const response = await fetch(url);
  //   const cssText = await response.text();
  //   return cssText;
  // };

  const handleDownloadImage = downloadImage();

  return (
    <div
      //   onClick={() => {
      //     handleDownloadImage();
      //   }}
      onMouseDown={handleMouseDown}
      onWheel={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onMouseEnter={disableScroll}
      onMouseLeave={enableScroll}
      className="grid-cover-box"
      id="cover"
      style={{
        backgroundImage: `url(${
          imageUrl !== "" ? imageUrl : "./assets/defaultBG.svg"
        })`,
        backgroundPosition: `${position.x}px ${position.y}px`,
        backgroundRepeat: "no-repeat",
        //   width: "100%",
        //  height: "100%",
        backgroundSize: `${backgroundsize}`,
        touchAction: "none"
        //  width: "1584px",
        //    height: "396px"
      }}>
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
