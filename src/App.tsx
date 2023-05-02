import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { PageBody } from "./Components/PageBody/PageBody";
import { Navbar } from "./Components/Navbar/Navbar";
import { CoverBox } from "./Components/CoverBox/CoverBox";
import { TabBar } from "./Components/TabBar/TabBar";
import { Footer } from "./Components/Footer/Footer";
import { ProfilePic } from "./Components/ProfilePic/ProfilePic";
import Modal from "./Components/Modal/Modal";
import useModal from "./hooks/useModal";
import { createPortal } from "react-dom";
// import { modalRef } from "./Components/Modal/Modal";

export interface IPerson {
  name: string;
  jobTitle: string;
  email: string;
  font: string;
  fontColor: string;
  shadow: boolean;
}
export interface IInfoBoxBG {
  hexBackgroundColor: string;
  rgbaBackgroundColor: string;
  borderRadius: number;
  alpha: number;
  fullHeight: boolean;
}

export default function App(): JSX.Element {
  const [tab, setTab] = useState<string>(
    (localStorage.getItem("tab") as string) ?? "about"
  );
  useEffect(() => {
    localStorage.setItem("tab", tab);
  }, [tab]);

  const { toggleModal, visibleModal } = useModal();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [InfoBoxBG, setInfoBoxBG] = useState<IInfoBoxBG>({
    rgbaBackgroundColor: "rgba(134, 134, 134, 0.35)",
    hexBackgroundColor: "#868686",
    borderRadius: 14,
    alpha: 0.35,
    fullHeight: false
  });
  const emptyNameFiller = "Wanna Get Discovered?";
  const [Person, setPerson] = useState<IPerson>({
    name: emptyNameFiller,
    jobTitle: "you got this covered!",
    email: "",
    font: "",
    fontColor: "#ffffff",
    shadow: true
  });

  const [showPortal, setShowPortal] = useState(false);
  const portalContainerRef = useRef<HTMLDivElement>(null);

  // context for dark/light theme. default is system theme
  const [theme, setTheme] = useState<"dark" | "light" | "system">(
    // if there is a theme in local storage, use that. otherwise, use system theme
    (localStorage.getItem("theme") as "dark" | "light" | "system") ?? "system"
  );

  // set the theme on page load
  React.useLayoutEffect(() => {
    const currentTheme = getCurrentTheme();
    setTheme(currentTheme);
    document.documentElement.setAttribute("color-scheme", currentTheme);
  }, []);

  const getCurrentTheme = (): "dark" | "light" | "system" => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      return theme;
    }
  };

  const toggleTheme = (): void => {
    const currentTheme = getCurrentTheme();
    if (currentTheme === "dark") {
      setTheme("light");
      document.documentElement.setAttribute("color-scheme", "light");
      localStorage.setItem("theme", "light");
    }
    if (currentTheme === "light") {
      setTheme("dark");
      document.documentElement.setAttribute("color-scheme", "dark");
      localStorage.setItem("theme", "dark");
    }
  };

  // console.log("theme", theme);

  const updatePerson = (field: string, value: string): void => {
    setPerson({ ...Person, [field]: value });
  };

  useEffect(() => {
    visibleModal ? setShowPortal(true) : setShowPortal(false);
  }, [visibleModal]);

  return (
    <>
      <Navbar
        setTab={setTab}
        toggleTheme={toggleTheme}
        getCurrentTheme={getCurrentTheme}
      />
      <section className="main">
        <CoverBox imageUrl={imageUrl} Person={Person} InfoBoxBG={InfoBoxBG} />

        {showPortal &&
          createPortal(
            <CoverBox
              imageUrl={imageUrl}
              Person={Person}
              InfoBoxBG={InfoBoxBG}
            />,
            portalContainerRef.current
          )}

        <Modal
          visibleModal={visibleModal}
          toggleModal={toggleModal}
          portalContainerRef={portalContainerRef}
        />
        <div className="grid-divider">
          {ProfilePic()}
          <TabBar tab={tab} setTab={setTab} />
        </div>

        <PageBody
          tab={tab}
          setTab={setTab}
          updatePerson={updatePerson}
          setInfoBoxBG={setInfoBoxBG}
          InfoBoxBG={InfoBoxBG}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          Person={Person}
          setPerson={setPerson}
          toggleModal={toggleModal}
        />
        {/* </div> */}
      </section>
      <Footer />
    </>
  );
}
