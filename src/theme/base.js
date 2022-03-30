import { lightTheme, darkTheme } from "src/theme";

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export default function getTheme(theme) {
  return themes[theme];
}
