/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect } from "react";
import { InfoBox } from "./InfoBox";
import { type IPerson, type IInfoBoxBG } from "../../App";
import "./style.css";
import { useDrag } from "../../hooks/useDrag";
import { useWindowSize } from "../../hooks/useWindowSize";
import type { Size } from "../../hooks/useWindowSize";
import domtoimage from "dom-to-image-more";

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

  const handleDownloadImage = (): void => {
    const coverElement = document.getElementById("cover");

    // to always get the 1584x396 size, regardless of the client's screen size:
    const standardCoverWidth = 1584;
    const clientCoverWidth = coverElement?.clientWidth;
    const scaleFactor = clientCoverWidth
      ? standardCoverWidth / clientCoverWidth
      : 1;

    // Fetch the CSS content of the web font
    // const fontCSSURL =
    //   "https://fonts.googleapis.com/css2?family=Anton&family=Domine:wght@400;700&family=Fira+Sans+Condensed:wght@300;500;900&family=Fjalla+One&family=Merriweather+Sans:wght@400;800&family=Oleo+Script&family=Pacifico&family=Patua+One&display=swap";
    // const fontCSSText = await fetchCSS(fontCSSURL);

    if (coverElement) {
      const aspectRatio = 4 / 1;
      const width = coverElement.clientWidth;
      const height = width / aspectRatio;

      const options = {
        scale: scaleFactor,
        width,
        height,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
          borderRadius: "0px"
        }
        // filter: (node) => {
        //   if (node.tagName === "style") {
        //     const style = document.createElement("style");
        //     // style.innerHTML = fontCSSText;
        //     node.parentNode.insertBefore(style, node);
        //     node.parentNode.removeChild(node);
        //   }
        //   return true;
        // }
      };

      domtoimage
        .toBlob(coverElement, options)
        .then((blob: Blob | MediaSource) => {
          const link = document.createElement("a");
          link.download = "linkedin-cover.jpeg";
          link.href = URL.createObjectURL(blob);
          link.click();
        })
        .catch((error: any) => {
          console.error("Error generating image:", error);
        });
    } else {
      console.error("Element with id 'cover' not found");
    }
  };

  return (
    <div
      // ref={printRef}
      onClick={() => {
        handleDownloadImage();
      }}
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
