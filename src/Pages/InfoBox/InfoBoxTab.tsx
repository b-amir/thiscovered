import React, { useState } from "react";
import { type IInfoBoxBG } from "../../types/IInfoBoxBG";
import { type IPerson } from "../../types/IPerson";
import { hexToRgb } from "../../utils/hexToRgb";
import useTypingAnimation from "../../hooks/useTypingAnimation";
import DownloadIcon from "../../../public/assets/DownloadIcon";
import { downloadImage } from "../../utils/downloadImage";
import { PageTitle } from "../../Components/PageTitle";
import { DescriptionBox } from "../../Components/DescriptionBox";
import { ButtonRow } from "../../Components/ButtonRow";
import { scrollToClass } from "../../utils/scrollTo";

interface IProps {
  updatePerson: (field: string, value: string) => void;
  setInfoBoxBG: React.Dispatch<React.SetStateAction<IInfoBoxBG>>;
  InfoBoxBG: IInfoBoxBG;
  Person: IPerson;
  setPerson: React.Dispatch<React.SetStateAction<IPerson>>;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  toggleModal: () => void;
}

export const InfoBoxTab: React.FC<IProps> = ({
  updatePerson,
  setInfoBoxBG,
  InfoBoxBG,
  Person,
  setTab,
  setPerson,
  toggleModal
}: IProps) => {
  const text =
    " And for the final touch, let's make it obvious who you are at the first impression.";
  const speed = 30;
  const animatedSubtitle = useTypingAnimation(text, speed);
  const [showDescription, setShowDescription] = useState(false);
  const handleDownloadImage = downloadImage();

  return (
    <>
      <PageTitle title="Make it your banner" subtitle={animatedSubtitle} />

      <div className="grid-tab-control-box">
        <div className="grid-control-col grid-col-1">
          <h4>Information</h4>

          <div className="inner-control-col">
            <label>
              <span>Full Name:</span>
              <input
                type="text"
                onChange={(e) => {
                  updatePerson("name", e.target.value);
                }}
                placeholder="ex. Daenerys Targaryen"
              />
            </label>

            <div className="inner-control-col control-row">
              <label>
                <span>Font:</span>
                <select
                  onChange={(e) => {
                    setPerson({
                      ...Person,
                      font: e.target.value
                    });
                  }}>
                  <option value="">Default</option>
                  <option value="var(--font-oleo)">Oleo Script</option>
                  <option value="var(--font-anton)">Anton</option>
                  <option value="var(--font-fira)">Fira Sans</option>
                  <option value="var(--font-fjalla)">Fjalla One</option>
                  <option value="var(--font-merriweather)">Merriweather</option>
                  <option value="var(--font-pacifico)">Pacifico</option>
                  <option value="var(--font-patum)">Patua One</option>
                </select>
              </label>

              <label>
                <span>Shadow:</span>
                <input
                  type="checkbox"
                  id="shadow-switch"
                  className="toggle-input"
                  checked={Person.shadow}
                  onChange={(e) => {
                    setPerson({
                      ...Person,
                      shadow: e.target.checked
                    });
                  }}
                />
                <label htmlFor="shadow-switch" className="toggle-label">
                  Shadow:
                </label>{" "}
              </label>

              <label>
                <span>Text Color:</span>
                <input
                  type="color"
                  value={Person.fontColor}
                  onChange={(e) => {
                    setPerson({
                      ...Person,
                      fontColor: e.target.value
                    });
                  }}
                />
              </label>
            </div>

            <label>
              <span>Job Title:</span>
              <input
                type="text"
                onChange={(e) => {
                  updatePerson("jobTitle", e.target.value);
                }}
                placeholder="ex. Queen of the Andals and the First Men, Khaleesi of the Great Grass Sea, Breaker of Chains, and Mother of Dragons"
              />
            </label>

            <label>
              <span>Email:</span>
              <input
                type="email"
                onChange={(e) => {
                  updatePerson("email", e.target.value);
                }}
                placeholder="ex. dany.stormborn282@gmail.com"
              />
            </label>
          </div>
        </div>

        <div className="grid-control-col grid-col-2">
          <h4>The Box</h4>

          <div className="inner-control-col">
            <div className="inner-control-col control-row">
              <label>
                <span>Full Height:</span>
                <input
                  type="checkbox"
                  id="toggle-switch"
                  className="toggle-input"
                  checked={InfoBoxBG.fullHeight}
                  onChange={(e) => {
                    setInfoBoxBG({
                      ...InfoBoxBG,
                      fullHeight: e.target.checked
                    });
                  }}
                />
                <label htmlFor="toggle-switch" className="toggle-label">
                  Full Height:
                </label>{" "}
              </label>
              <label>
                <span> Background Color:</span>
                <input
                  type="color"
                  value={InfoBoxBG.hexBackgroundColor}
                  onChange={(e) => {
                    setInfoBoxBG({
                      ...InfoBoxBG,
                      hexBackgroundColor: e.target.value,
                      rgbaBackgroundColor: `rgba(${hexToRgb(e.target.value)}, ${
                        InfoBoxBG.alpha
                      })`
                    });
                  }}
                />
              </label>
            </div>

            <label>
              <span>Color intensity:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={InfoBoxBG.alpha}
                onChange={(e) => {
                  setInfoBoxBG({
                    ...InfoBoxBG,
                    alpha: Number(e.target.value),
                    // and then the rgbaBackgroundColor is set
                    rgbaBackgroundColor: `rgba(${hexToRgb(
                      InfoBoxBG.hexBackgroundColor
                    )}, ${e.target.value})`
                  });
                }}
              />
            </label>

            <label>
              <span>Roundness:</span>
              <input
                type="range"
                min="1"
                max="16"
                value={InfoBoxBG.borderRadius}
                onChange={(e) => {
                  setInfoBoxBG({
                    ...InfoBoxBG,
                    borderRadius: Number(e.target.value)
                  });
                }}
              />
            </label>
          </div>
        </div>
      </div>

      {showDescription && (
        <DescriptionBox title="About the blur effect" isSpecial={false}>
          <p>
            <strong>Note:</strong> You might have noticed that{" "}
            <u>the cool background blur effect</u> is missing from the
            downloaded image. It&apos;s still a fairly new feature and the
            support is not quite there. <br />
            <br />
            <strong>Workaround:</strong> For now, here&apos;s a simple solution:
          </p>
          <ol>
            <li>Open screenshot mode.</li>
            <li> Take a normal screenshot.</li>{" "}
            <li>
              While uploading cover to linkedin, use it&apos;s embeded crop
              tool.
            </li>
          </ol>

          <button
            onClick={toggleModal}
            className="secondary-button screenshot-mode">
            Screenshot mode
          </button>
        </DescriptionBox>
      )}

      <ButtonRow
        leftButton={
          <div
            className="tertiary-button"
            onClick={() => {
              setTab("checklist");
              scrollToClass("grid-tab-bar");
            }}>
            Want more tips?
          </div>
        }
        rightButton={
          <button
            style={{ display: "flex" }}
            className="primary-button"
            onClick={() => {
              handleDownloadImage();
              setShowDescription(true);
              setTimeout(() => {
                window.scrollTo({
                  top:
                    document.querySelector(".grid-tab-description")?.offsetTop -
                    189,
                  behavior: "smooth"
                });
              }, 0);
            }}>
            <DownloadIcon />
            Download
          </button>
        }
      />
    </>
  );
};
