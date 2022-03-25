import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import NextLink from "next/link";

import { Search as SearchIcon } from "../../icons/search";

export const IcoListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Upcomig Projects
      </Typography>
      <Box sx={{ m: 1 }}>
        <NextLink href={`/icos/add`}>
          <Button
            sx={{ p: 0 }}
            color="primary"
            variant="contained"
            sx={{ mr: 1 }}
          >
            Add project
          </Button>
        </NextLink>
        {/* <Button color="primary" variant="contained">
          Add project
        </Button> */}
      </Box>
    </Box>
  </Box>
);
