import domtoimage from "dom-to-image-more";

export function downloadImage() {
  return (): void => {
    const coverElement = document.getElementById("cover");
    const infoboxElement = document.getElementById("infobox");
    // to always get the 1584x396 size, regardless of the client's screen size:
    const standardCoverWidth = 1584;
    const clientCoverWidth = coverElement?.clientWidth;
    const scaleFactor = clientCoverWidth
      ? standardCoverWidth / clientCoverWidth
      : 1;

    // Fetch the CSS content of the web font
    // const fontCSSURL =
    //   "https://fonts.googleapis.com/css2?family=Anton&family=Domine:wght@400;700&family=Fira+Sans+Condensed:wght@300;500;900&family=Fjalla+One&family=Merriweather+Sans:wght@400;800&family=Oleo+Script&family=Pacifico&family=Patua+One&display=swap";
    // const fontCSSText = await fetchCSS(fontCSSURL);
    if (coverElement) {
      const aspectRatio = 4 / 1;
      const width = coverElement.clientWidth;
      const height = width / aspectRatio;

      // untill support for backdrop-filter is better, we'll use a semi-transparent background in saved image.
      // change the infobox background opacity a little bit to avoid the complete transparency
      infoboxElement &&
        (infoboxElement.style.backgroundColor = "rgba(165, 165, 165, 0.81)");
      setTimeout(() => {
        infoboxElement &&
          (infoboxElement.style.backgroundColor = "rgba(134, 134, 134, 0.35)");
      }, 1);

      const options = {
        scale: scaleFactor,
        width,
        height,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
          borderRadius: "0px",
          border: "none"
        }
        // filter: (node) => {
        //   if (node.tagName === "style") {
        //     const style = document.createElement("style");
        //     // style.innerHTML = fontCSSText;
        //     node.parentNode.insertBefore(style, node);
        //     node.parentNode.removeChild(node);
        //   }
        //   return true;
        // }
      };

      domtoimage
        .toBlob(coverElement, options)
        .then((blob: Blob | MediaSource) => {
          const link = document.createElement("a");
          link.download = "linkedin-cover.jpeg";
          link.href = URL.createObjectURL(blob);
          link.click();
        })
        .catch((error: any) => {
          console.error("Error generating image:", error);
        });
    } else {
      console.error("Element with id 'cover' not found");
    }
  };
}
