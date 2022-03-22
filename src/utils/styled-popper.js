import Popper from "@mui/material/Popper";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";


export const StyledPopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
      boxSizing: "border-box",
      "& ul": {
        padding: 0,
        margin: 0,
      },
    },
  });