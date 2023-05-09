/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React, { useEffect } from "react";
import { type Size, useWindowSize } from "../../hooks/useWindowSize";
import { scrollToTop, scrollToClass } from "../../utils/scrollTo";

export interface IProps {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

export const TabBar: React.FC<IProps> = ({ tab, setTab }: IProps) => {
  useEffect(() => {
    const marker = document.querySelector(".marker");
    const activeTab = document.querySelector(".tab.active");

    function indicator(e: Element | null): void {
      if (marker !== null) {
        marker.style.left = e.offsetLeft + "px";
        marker.style.width = e.offsetWidth + "px";
      }
    }

    indicator(activeTab);

    // Remove event listener on unmount
    return () => {
      // setTab(null); // Reset the tab state when the component unmounts
    };
  }, [tab]);
  const size: Size = useWindowSize();

  return (
    <div className="grid-tab-bar">
      <div className="marker" />
      <div
        className={tab === "about" ? "tab active" : "tab"}
        onClick={() => {
          setTab("about");
          size.width && size.width < 768
            ? scrollToTop()
            : scrollToClass("grid-tab-bar");
        }}>
        About
      </div>
      <div
        className={tab === "background" ? "tab active" : "tab"}
        onClick={() => {
          setTab("background");
          size.width && size.width < 768
            ? scrollToTop()
            : scrollToClass("grid-tab-bar");
        }}>
        Background
      </div>
      <div
        className={tab === "infoBox" ? "tab active" : "tab"}
        onClick={() => {
          setTab("infoBox");
          size.width && size.width < 768
            ? scrollToTop()
            : scrollToClass("grid-tab-bar");
        }}>
        Info Box
      </div>
      <div
        className={tab === "checklist" ? "bonus tab active" : "bonus tab"}
        onClick={() => {
          setTab("checklist");
          size.width && size.width < 768
            ? scrollToTop()
            : scrollToClass("grid-tab-bar");
        }}>
        Checklist
      </div>
    </div>
  );
};
