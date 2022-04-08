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
import { PortfolioListToolbar } from "../components/portfolio/portfolio-list-toolbar";
import { WhaleAlertCharts } from "../components/whale-alert/whale-alert-charts";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

const Portfolio = ({ userSession }) => {
  let toolbar = "You must be logged in to see your Portfolio.";

  if (userSession) {
    toolbar = <PortfolioListToolbar />;
  }
  return (
    <>
      <Head>
        <title>Portfolio | Crypto Central</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          {toolbar}

          <Box sx={{ mt: 3 }}></Box>
        </Container>
      </Box>
    </>
  );
};
Portfolio.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export async function getServerSideProps(context) {
  // Get the user
  const userSession = await getServerSession(context, authOptions);

  return {
    props: {
      userSession,
    },
  };
}

export default Portfolio;
