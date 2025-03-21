import React, { useEffect, useMemo, useState } from "react";
import { Theme, ThemeProviderContext, ThemeProviderStates } from "./theme-context";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme: Theme;
};

export const ThemeProvider: React.FC<Readonly<ThemeProviderProps>> = ({ children, defaultTheme, ...props }) => {
  const [theme, setTheme] = useState<ThemeProviderStates["theme"]>(
    () => (localStorage.getItem("@notes-app/app-theme") as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const providerStates = useMemo(
    () =>
      ({
        theme,
        setTheme: (theme: Theme) => {
          localStorage.setItem("@notes-app/app-theme", theme);
          setTheme(theme);
        },
      } as const satisfies ThemeProviderStates),
    [theme]
  );

  return (
    <ThemeProviderContext.Provider {...props} value={providerStates}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
