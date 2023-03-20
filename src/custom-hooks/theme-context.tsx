import { createContext, PropsWithChildren, useContext, useState } from 'react';

type Props = PropsWithChildren;

const ThemeContext = createContext(false);
const ThemeUpdateThemeContext = createContext(() => {});

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateThemeContext);
}

export function ThemeProvider(props: Props) {
  const [darkTheme, setDarkTheme] = useState(true);

  function toggleTheme() {
    setDarkTheme((prev) => !prev);
  }

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateThemeContext.Provider value={toggleTheme}>{props.children}</ThemeUpdateThemeContext.Provider>
    </ThemeContext.Provider>
  );
}
