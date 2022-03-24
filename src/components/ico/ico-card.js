import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import CakeIcon from "@mui/icons-material/Cake";
import { getHalId } from "src/utils/get_hal_id";

import NextLink from "next/link";

export const IcoCard = ({ deleteIco, ico, ...rest }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      {...rest}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar alt="Ico" src={ico.media} variant="square" />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {ico.name}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
          }}
        >
          {ico.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <CakeIcon color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {ico.birthday}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <NextLink href={`/icos/edit/${getHalId(ico)}`}>
              <Button sx={{ p: 0 }} size="small" color="info">
                Edit
              </Button>
            </NextLink>

            <Button
              onClick={() => deleteIco(getHalId(ico))}
              sx={{ p: 0 }}
              size="small"
              color="error"
            >
              {ico.isDeleting ? (
                <CircularProgress color="error" sx={{ p: 1 }} />
              ) : (
                <span>Delete</span>
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

IcoCard.propTypes = {
  ico: PropTypes.object.isRequired,
};
