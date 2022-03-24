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
import CakeIcon from "@mui/icons-material/Cake";

import NextLink from "next/link";

export const IcoCard = ({ ico, ...rest }) => {
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
            {/* <Button
              component={NextLink}
              href={`/icos/edit/${ico.id}`}
              sx={{ p: 0 }}
              size="small"
              color="info"
            >
              Edit
            </Button> */}

            <Button sx={{ p: 0 }} size="small" color="error">
              Delete
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
