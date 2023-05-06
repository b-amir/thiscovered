export function handleGetCurrentTheme(theme: "dark" | "light" | "system") {
  return (): "dark" | "light" | "system" => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      return theme;
    }
  };
}
