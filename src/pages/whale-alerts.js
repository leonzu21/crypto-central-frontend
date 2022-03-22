import Head from "next/head";
import useSWRInfinite from "swr/infinite";
import {
  Box,
  Container,
  Grid,
  Typography,
  Demo,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Chip,
} from "@mui/material";
import React from "react";
import FolderIcon from "@mui/icons-material/ArrowRightTwoTone";
import { DashboardLayout } from "../components/dashboard-layout";
import { WhaleAlertListResults } from "../components/whale-alert/whale-alert-list-results";
import { WhaleAlertListToolbar } from "../components/whale-alert/whale-alert-list-toolbar";
import { WhaleAlertCharts } from "../components/whale-alert/whale-alert-charts";

const WhaleAlerts = (props) => {
  return (
    <>
      <Head>
        <title>Whale Alerts | Crypto Central</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <WhaleAlertListToolbar />

          <Box sx={{ mt: 3 }}>
            <Grid
              sx={{ m: { xs: 1, md: 1 }, ml: { xs: 0 }, mr: { xs: 0 } }}
              item
              xs={12}
            >
              <WhaleAlertCharts coins={props.coins} />
            </Grid>
            <Grid
              sx={{ m: { xs: 1, md: 1 }, ml: { xs: 0 }, mr: { xs: 0 } }}
              item
              xs={12}
            >
              <WhaleAlertListResults coins={props.coins} />
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};
WhaleAlerts.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default WhaleAlerts;
