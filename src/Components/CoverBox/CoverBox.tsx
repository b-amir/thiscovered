import React, { useRef } from "react";
import { InfoBox } from "./InfoBox";
import { type IPerson, type IInfoBoxBG } from "../../App";
import "./style.css";
// import {
//   exportComponentAsJPEG,
//   exportComponentAsPDF,
//   exportComponentAsPNG
// } from "react-component-export-image";
import { domToPng } from "modern-screenshot";

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
  // const componentRef = useRef();

  const printRef = useRef();

  const handleDownloadImage = async () => {
    await domToPng(document.querySelector("#cover"), {
      quality: 1,
      width: 1584,
      height: 396,
      scale: 2,
      maximumCanvasSize: 1584,
      minimumCanvasSize: 1584,
      style: {
        borderRadius: "0px",
        // display: "flex",
        flexDirection: "row-reverse",

        justifyContent: "flex-start",
        alignItems: "flex-start"
      }

      // filter: true
    }).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "screenshot.png";
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div
      ref={printRef}
      onClick={() => handleDownloadImage()}
      className="grid-cover-box"
      id="cover"
      style={{
        backgroundImage: `url(${
          imageUrl !== "" ? imageUrl : "./assets/defaultBG.svg"
        })`
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
