/* eslint-disable multiline-ternary */
import React, { Fragment } from "react";
import useTypingAnimation from "../../hooks/useTypingAnimation";
import "./style.css";

interface IProps {
  setTab: (tab: string) => void;
  text: string;
  speed: number;
  Person: {
    name: string;
    jobTitle: string;
    email: string;
    font: string;
    fontColor: string;
    shadow: boolean;
  };
}
export const AboutTab: React.FC<IProps> = ({ setTab, Person }) => {
  const text = "But let's make it a bit more discoverable.";
  const speed = 30;
  const displayText = useTypingAnimation(text, speed);

  const panicText1 = "Oh $#!t";
  const panicText2 = "You weren't supposed to see this!";
  const panicText3 = "You should've followed the natural user journey.";
  const panicDotDotDot = "...";

  const displayPanicText1 = useTypingAnimation(panicText1, speed);
  const displayPanicDotDotDot = useTypingAnimation(panicDotDotDot, 150, 1000);
  const displayPanicText2 = useTypingAnimation(panicText2, speed, 2500);
  const displayPanicText3 = useTypingAnimation(panicText3, speed, 5000);
  const CapitalisedPersonName = Person.name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <div className="grid-tab-info">
        <div className="grid-tab-title">
          {/* if Person.name is not empty, display name, else display "It's Your LinkedIn Profile,
"  */}
          {Person.name !== "Wanna Get Discovered?" ? (
            <div style={{ color: "var(--accent-red)" }}>
              Hacking{" "}
              <span style={{ color: "var(--text-color)" }}>
                {CapitalisedPersonName}
              </span>
              &apos;s Linked
              <span className="in">In</span> Profile...
            </div>
          ) : (
            <>
              It&apos;s Your Linked<span className="in">In</span> Profile,
            </>
          )}
        </div>

        <div className="grid-tab-subtitle">
          {Person.name === "Wanna Get Discovered?" ? (
            <div>{displayText}</div>
          ) : (
            <>
              <strong style={{ color: "var(--accent-red)" }}>FBI 👀 :</strong>{" "}
              {displayPanicText1}
              {displayPanicDotDotDot} {displayPanicText2} {displayPanicText3}
            </>
          )}
        </div>
      </div>

      <div className="grid-tab-description">
        <h3 className="description-title">What is this.covered?</h3>
        <p>
          this.covered is a simple cover image generator to make your LinkedIn
          profile stand out to employers at first glance.
        </p>
      </div>

      <div className="grid-button-row">
        <div className="grid-button-back"></div>
        <div className="grid-button-middle"></div>
        <div className="grid-button-forward">
          {" "}
          <button
            className="cta_button"
            onClick={() => {
              setTab("background");

              window.scrollTo({
                top: document.querySelector(".grid-tab-bar")?.clientHeight,
                behavior: "smooth"
              });

              // window.scrollTo(0, document.querySelector(".grid-tab-bar"));
            }}>
            Start Editing
          </button>
        </div>
      </div>
    </>
  );
};
