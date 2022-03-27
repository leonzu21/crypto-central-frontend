import PropTypes from "prop-types";
import { useState } from "react";
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

import GaugeChart from "react-gauge-chart";

import CreditCardIcon from "@mui/icons-material/CreditCard";

export const IcoCard = ({ deleteIco, ico, ...rest }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
          }}
        >
          <GaugeChart
            colors={["#FF5F6D", "#10B981"]}
            hideText
            style={{ width: "35%" }}
            cornerRadius={6}
            nrOfLevels={10}
            // textColor="#5048E5"
            percent={ico.confidenceLevel / 10}
            arcPadding={0.1}
          />

          {/* <Avatar>
            <CreditCardIcon color="primary" />{" "}
          </Avatar> */}
        </Box>
        <NextLink href={`/icos/${getHalId(ico)}`}>
          <a style={{ textDecoration: "none" }}>
            <Typography
              align="center"
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              {ico.name}
            </Typography>
          </a>
        </NextLink>
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
            <NextLink href={`/icos/${getHalId(ico)}`}>
              <Button
                onClick={() => setIsOpening(true)}
                sx={{ p: 0 }}
                size="small"
                color="success"
              >
                {isOpening ? (
                  <CircularProgress color="info" sx={{ p: 1 }} />
                ) : (
                  <span>See more</span>
                )}
              </Button>
            </NextLink>
            <NextLink href={`/icos/edit/${getHalId(ico)}`}>
              <Button
                onClick={() => setIsEditing(true)}
                sx={{ p: 0 }}
                size="small"
                color="info"
              >
                {isEditing ? (
                  <CircularProgress color="info" sx={{ p: 1 }} />
                ) : (
                  <span>Edit</span>
                )}
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
