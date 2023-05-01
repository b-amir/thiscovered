import React, { useState } from "react";
import useTypingAnimation from "../../hooks/useTypingAnimation";
// import { type ChecklistItem } from "./ChecklistPage";
// import { renderItems } from "./renderItems";
// import checklistData from "./checklist-data.json";
import Checklist from "./Checklist";

import "./style.css";
import CopyIcon from "../../../public/assets/CopyIcon";

interface IChecklistTabProps {
  setTab: React.Dispatch<React.SetStateAction<string>>;
  // items: ChecklistItem[];
}

export const ChecklistTab: React.FC<IChecklistTabProps> = ({
  setTab
}: {
  setTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const text =
    "Here's a todo list to get you started. Click each item to mark as done.";
  const speed = 30;
  const displayText = useTypingAnimation(text, speed);
  // const [items] = useState<ChecklistItem[]>(checklistData);
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
      <div className="grid-tab-info">
        <div className="grid-tab-title">Checklist</div>

        <div className="grid-tab-subtitle">{displayText}</div>
      </div>

      <div className="grid-tab-description">
        <h3 className="description-title">It&apos;s open-source</h3>
        <p>
          This is an open source project. If you have any suggestions or
          improvements, please feel free to{" "}
          <a
            className="description-link"
            href="https://www.github.com/theamirm/"
            target="_blank"
            rel="noopener noreferrer">
            contribute on GitHub
          </a>
          .
        </p>
      </div>

      <div className="grid-tab-control-box checklist">
        <Checklist />
      </div>
      <div className="grid-button-row">
        <div className="grid-button-back">
          <div
            className="tertiary-button"
            onClick={() => {
              setTab("about");

              window.scrollTo({
                top: document.querySelector(".grid-tab-bar")?.clientHeight,
                behavior: "smooth"
              });
            }}>
            What is this.covered?
          </div>
        </div>
        <div className="grid-button-middle"></div>
        <div className="grid-button-forward">
          <button
            style={{ display: "flex", alignItems: "center" }}
            className="cta_button"
            onTouchStart={handleCopyLinkClick}
            // onClick={handleCopyLinkClick}
            onMouseDown={handleCopyLinkClick}>
            {isCopied ? (
              "Link copied"
            ) : (
              <>
                <CopyIcon /> Share
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};
