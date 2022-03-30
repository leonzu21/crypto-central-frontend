import React, { useContext } from "react";
import { IconButton } from "@mui/material";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import { CustomThemeContext } from "../../context/CustomThemeProvider";

const ThemeModeToggle = ({ fontSize }) => {
  const { appTheme, setTheme } = useContext(CustomThemeContext);
  // console.log("ThemeModeToggle", appTheme);

  const handleThemeChange = (appTheme, setTheme) => {
    if (appTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <IconButton onClick={() => handleThemeChange(appTheme, setTheme)}>
      {appTheme === "light" ? (
        <Brightness5Icon fontSize={fontSize} color="warning" />
      ) : (
        <Brightness2Icon fontSize={fontSize} color="primary" />
      )}
    </IconButton>
  );
};

export default ThemeModeToggle;
