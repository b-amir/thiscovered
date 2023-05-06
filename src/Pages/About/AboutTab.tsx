/* eslint-disable multiline-ternary */
import React from "react";
import useTypingAnimation from "../../hooks/useTypingAnimation";
import { DescriptionBox } from "../../Components/DescriptionBox";
import { PageTitle } from "../../Components/PageTitle";
import { ButtonRow } from "../../Components/ButtonRow";

interface IProps {
  setTab: (tab: string) => void;
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
  const animatedSubtitle = useTypingAnimation(text, speed);

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
      <PageTitle
        title={
          Person.name !== "Wanna Get Discovered?" ? (
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
          )
        }
        subtitle={
          Person.name === "Wanna Get Discovered?" ? (
            <div>{animatedSubtitle}</div>
          ) : (
            <>
              <strong style={{ color: "var(--accent-red)" }}>FBI 👀 :</strong>{" "}
              {displayPanicText1}
              {displayPanicDotDotDot} {displayPanicText2} {displayPanicText3}
            </>
          )
        }
      />

      <DescriptionBox title="What is this.covered?">
        <p>
          this.covered is a simple cover image generator to make your LinkedIn
          profile stand out to employers at first glance.
        </p>
      </DescriptionBox>

      <ButtonRow
        rightButton={
          <button
            className="cta_button"
            onClick={() => {
              setTab("background");
              window.scrollTo({
                top: document.querySelector(".grid-tab-bar")?.clientHeight,
                behavior: "smooth"
              });
            }}>
            Start Editing
          </button>
        }
      />
    </>
  );
};
