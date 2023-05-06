import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { PageBody } from "./Components/PageBody";
import { Header } from "./Components/Header";
import { CoverBox } from "./Components/CoverBox";
import { TabBar } from "./Components/TabBar";
import { Footer } from "./Components/Footer";
import { ProfilePic } from "./Components/ProfilePic";
import Modal from "./Components/Modal";
import useModal from "./hooks/useModal";
import { type Size, useWindowSize } from "./hooks/useWindowSize";
import { createPortal } from "react-dom";
import { type IPerson } from "./types/IPerson";
import { type IInfoBoxBG } from "./types/IInfoBoxBG";
import { handleSwipe } from "./utils/handleSwipe";
import { handleThemeToggle } from "./utils/handleThemeToggle";
import { handleGetCurrentTheme } from "./utils/handleGetCurrentTheme";

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

  const getCurrentTheme = handleGetCurrentTheme(theme);
  const toggleTheme = handleThemeToggle(getCurrentTheme, setTheme);
  const swipeHandlers = handleSwipe(tab, setTab);

  const updatePerson = (field: string, value: string): void => {
    setPerson({ ...Person, [field]: value });
  };

  useEffect(() => {
    visibleModal ? setShowPortal(true) : setShowPortal(false);
  }, [visibleModal]);

  const size: Size = useWindowSize();

  return (
    <>
      <Header
        setTab={setTab}
        toggleTheme={toggleTheme}
        getCurrentTheme={getCurrentTheme}
      />
      <section className="main" {...swipeHandlers}>
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
          {/* <ProfilePic /> */}
          {size.width > 425 ? <ProfilePic /> : null}
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
      </section>
      <Footer />
    </>
  );
}
