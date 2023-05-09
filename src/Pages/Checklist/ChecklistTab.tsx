/* eslint-disable multiline-ternary */
import React, { useState } from "react";
import useTypingAnimation from "../../hooks/useTypingAnimation";
import TheChecklist from "./TheChecklist";
import ShareIcon from "../../../public/assets/ShareIcon";
import { DescriptionBox } from "../../Components/DescriptionBox";
import { PageTitle } from "../../Components/PageTitle";
import { ButtonRow } from "../../Components/ButtonRow";
import { scrollToClass } from "../../utils/scrollTo";

interface IProps {
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

export const ChecklistTab: React.FC<IProps> = ({ setTab }: IProps) => {
  const text =
    "Here's a todo list to get you started. Click each item to mark as done.";
  const speed = 30;
  const animatedSubtitle = useTypingAnimation(text, speed);
  const [isCopied, setIsCopied] = useState(false);

  function handleCopyLinkClick(): void {
    void navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);

    // Reset isCopied state after 5 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  }

  return (
    <>
      <PageTitle title="Checklist" subtitle={animatedSubtitle} />

      <DescriptionBox title="It's open-source">
        <p>
          This is an open source project. If you have any suggestions or
          improvements, please feel free to{" "}
          <a
            className="description-link"
            href="https://github.com/b-amir/thiscovered"
            target="_blank"
            rel="noopener noreferrer">
            contribute on GitHub
          </a>
          .
        </p>
      </DescriptionBox>

      <div className="grid-tab-control-box checklist">
        <TheChecklist />
      </div>

      <ButtonRow
        leftButton={
          <div
            className="tertiary-button"
            onClick={() => {
              setTab("about");
              scrollToClass("grid-tab-bar");
            }}>
            What is this.covered?
          </div>
        }
        rightButton={
          <button
            style={{ display: "flex", alignItems: "center" }}
            className="primary-button"
            onTouchStart={handleCopyLinkClick}
            // onClick={handleCopyLinkClick}
            onMouseDown={handleCopyLinkClick}>
            {isCopied ? (
              "Link copied"
            ) : (
              <>
                <ShareIcon /> Share
              </>
            )}
          </button>
        }
      />
    </>
  );
};
