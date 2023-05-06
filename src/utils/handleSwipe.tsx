/* eslint-disable @typescript-eslint/explicit-function-return-type */
import useSwipe from "../hooks/useSwipe";

export function handleSwipe(
  tab: string,
  setTab: React.Dispatch<React.SetStateAction<string>>
) {
  return useSwipe({
    onSwipedRight: () => {
      // setTab to the previous tab
      if (tab === "about") {
        setTab("checklist");
      } else if (tab === "background") {
        setTab("about");
      } else if (tab === "infoBox") {
        setTab("background");
      } else if (tab === "checklist") {
        setTab("infoBox");
      }
    },
    onSwipedLeft: () => {
      // setTab to the next tab
      if (tab === "about") {
        setTab("background");
      } else if (tab === "background") {
        setTab("infoBox");
      } else if (tab === "infoBox") {
        setTab("checklist");
      } else if (tab === "checklist") {
        setTab("about");
      }
    }
  });
}
