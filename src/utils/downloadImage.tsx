import domtoimage from "dom-to-image-more";

export function downloadImage() {
  return (): void => {
    const coverElement = document.getElementById("cover");

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

      const options = {
        scale: scaleFactor,
        width,
        height,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
          borderRadius: "0px"
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
