import { createContext, useState } from "react";

type DarkThemeContextProviderProps = {
  children: React.ReactNode;
};

type DarkThemeContext = {
  isDarkTheme: boolean;
  setIsDarkTheme: (value: boolean) => void;
};

const DefaultDarkThemeContext: DarkThemeContext = {
  isDarkTheme: false,
  setIsDarkTheme: () => {
    console.warn("setIsDarkTheme function is not wrapped in a Provider");
  },
};

export const DarkThemeContext = createContext<DarkThemeContext>(
  DefaultDarkThemeContext
);

export const DarkThemeContextProvider = ({
  children,
}: DarkThemeContextProviderProps) => {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  return (
    <DarkThemeContext.Provider
      value={{
        isDarkTheme,
        setIsDarkTheme,
      }}
    >
      {children}
    </DarkThemeContext.Provider>
  );
};
