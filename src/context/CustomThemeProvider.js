import React, { createContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "../theme";
import Cookie from "js-cookie";
import getTheme from "src/theme/base";

export const CustomThemeContext = createContext({
  // Set the default theme and setter.
  appTheme: 'dark',
  setTheme: null,
});

const CustomThemeProvider = ({ children, initialAppTheme }) => {
  // State to hold selected theme
  const [themeName, _setThemeName] = useState(initialAppTheme);

  // Retrieve theme object by theme name
  const theme = getTheme(themeName);

  // Wrap setThemeName to store new theme names as cookie.
  const setThemeName = (name) => {
    // console.log("CustomThemeProvider, SetThemeName", name);
    Cookie.set("appTheme", name);
    _setThemeName(name);
  };

  const contextValue = {
    appTheme: themeName,
    setTheme: setThemeName,
  };

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;
