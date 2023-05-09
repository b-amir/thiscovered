export function scrollToClass(cssClass: string): void {
  window.scrollTo({
    top: document.querySelector("." + cssClass)?.clientHeight,
    behavior: "smooth"
  });
}
export function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
