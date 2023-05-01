import React from "react";
import { type IInfoBoxBG, type IPerson } from "../../App";
import { AboutTab } from "../../Pages/About/AboutTab";
import { InfoBoxTab } from "../../Pages/InfoBox/InfoBoxTab";
import { BackgroundTab } from "../../Pages/Background/BackgroundTab";
import { ChecklistTab } from "../../Pages/checklist/ChecklistTab";
import "./style.css";

interface IProps {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  updatePerson: (field: string, value: string) => void;
  setInfoBoxBG: React.Dispatch<React.SetStateAction<IInfoBoxBG>>;
  InfoBoxBG: IInfoBoxBG;
  Person: IPerson;
  setPerson: React.Dispatch<React.SetStateAction<IPerson>>;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
  toggleModal: () => void;
}

export const PageBody: React.FC<IProps> = ({
  tab,
  setTab,
  updatePerson,
  setInfoBoxBG,
  InfoBoxBG,
  imageUrl,
  setImageUrl,
  Person,
  setPerson,
  toggleModal
}: IProps) => {
  return (
    <>
      {tab === "about" && <AboutTab setTab={setTab} Person={Person} />}
      {tab === "infoBox" && (
        <InfoBoxTab
          updatePerson={updatePerson}
          setInfoBoxBG={setInfoBoxBG}
          InfoBoxBG={InfoBoxBG}
          Person={Person}
          setPerson={setPerson}
          setTab={setTab}
          toggleModal={toggleModal}
        />
      )}
      {tab === "background" && (
        <BackgroundTab
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setTab={setTab}
        />
      )}
      {tab === "checklist" && <ChecklistTab setTab={setTab} />}
    </>
  );
};
