export function handleThemeToggle(
  getCurrentTheme: () => "dark" | "light" | "system",
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light" | "system">>
) {
  return (): void => {
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
}
