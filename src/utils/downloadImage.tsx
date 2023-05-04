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
