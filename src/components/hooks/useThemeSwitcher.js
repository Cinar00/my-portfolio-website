import { useEffect, useState } from "react";

const useThemeSwitcher = () => {
  const preferDarkQuery = "(prefer-color-scheme: dark)";
  const [mode, setMode] = useState("");

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === "dark") {
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);
    const userPref = window.localStorage.getItem("theme");

    if (userPref) {
      let check = userPref === "dark" ? "dark" : "light";
      handleModeChange(check);
    } else {
      let check = mediaQuery.matches ? "dark" : "light";
      handleModeChange(check);
    }

    const handleChange = () => {
      let check = mediaQuery.matches ? "dark" : "light";
      handleModeChange(check);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return [mode, handleModeChange];
};

export default useThemeSwitcher;
