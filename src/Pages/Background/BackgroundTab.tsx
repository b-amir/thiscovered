/* eslint-disable multiline-ternary */
import React, { useState } from "react";
import UploadImage from "./Upload";
import useTypingAnimation from "../../hooks/useTypingAnimation";
import ExactImageSearch from "./ExactImageSearch";
import { LooseImageSearch } from "./LooseImageSearch";
import { DescriptionBox } from "../../Components/DescriptionBox";
import { PageTitle } from "../../Components/PageTitle";
import { ButtonRow } from "../../Components/ButtonRow";

interface IProps {
  setTab: React.Dispatch<React.SetStateAction<string>>;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
}

export const BackgroundTab: React.FC<IProps> = ({
  setTab,
  imageUrl,
  setImageUrl
}: IProps) => {
  const text = "Shall we start by finding you a suitable background image?";
  const speed = 30;
  const animatedSubtitle = useTypingAnimation(text, speed);

  const [PrivateApiOn, setPrivateApiOn] = React.useState(false);
  const [query, setQuery] = useState("");

  function resetImagePosition(): void {
    // find #cover dom element and revert its background-position to center
    const cover = document.getElementById("cover");
    if (cover) {
      cover.style.backgroundPosition = "center";
    }
  }

  return (
    <>
      <PageTitle title="A nice image" subtitle={animatedSubtitle} />

      <DescriptionBox title="How to use it?">
        <p>
          You&apos;re given three options to find an image: <br />
          <br />
          <strong>1. Casual search</strong> - Simply type in your desired
          keyword and submit the form. <br />
          for example: <code>abstract green</code> or <code>web developer</code>{" "}
          <br /> <br />
          <strong>2. Unsplash private API</strong> - if you&apos;re not getting
          the right image from casual search,{" "}
          <span style={{ textDecoration: "underline" }}>
            toggle &apos;Exact match&apos; on
          </span>{" "}
          and try again. <br />
          <span style={{ color: "#8d8d8d" }}>
            Downside: limited number of requests / hour.
          </span>
          <br /> <br />
          <strong>3. Your own image</strong> - Upload an image from your
          computer.
        </p>
      </DescriptionBox>

      <div className="grid-tab-control-box background-tab">
        <div className="grid-control-col grid-col-1">
          <h4>Find an image</h4>
          <div className="inner-control-col">
            {PrivateApiOn ? (
              <ExactImageSearch
                setImageUrl={setImageUrl}
                query={query}
                setQuery={setQuery}
                resetImagePosition={resetImagePosition}
              />
            ) : (
              <LooseImageSearch
                setImageUrl={setImageUrl}
                imageUrl={imageUrl}
                query={query}
                setQuery={setQuery}
                resetImagePosition={resetImagePosition}
              />
            )}

            <label>
              <span>Exact match:</span>
              <div className="switch-with-tip">
                <p className="control-tip">
                  toggle on if you&apos;re not getting the right image
                </p>
                <input
                  type="checkbox"
                  id="api-switch"
                  className="toggle-input"
                  // defaultChecked={false}
                  // when PrivateApiOn is true the checkbox is checked
                  checked={PrivateApiOn}
                  onChange={(e) => {
                    setPrivateApiOn(!PrivateApiOn);
                  }}
                />{" "}
                <label htmlFor="api-switch" className="toggle-label">
                  Exact match:
                </label>{" "}
              </div>
            </label>
          </div>
        </div>

        <div className="grid-control-col grid-col-2">
          <h4>Or bring your own</h4>
          <div className="inner-control-col">
            <UploadImage
              setImageUrl={setImageUrl}
              resetImagePosition={resetImagePosition}
            />
          </div>
        </div>
      </div>

      <ButtonRow
        rightButton={
          <button
            className="primary-button"
            onClick={() => {
              setTab("infoBox");
              window.scrollTo({
                top: document.querySelector(".grid-tab-bar")?.clientHeight,
                behavior: "smooth"
              });
            }}>
            Next Step
          </button>
        }
      />
    </>
  );
};
