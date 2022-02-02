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
} from "@mui/material";
import React from "react";
import FolderIcon from "@mui/icons-material/ArrowRightTwoTone";
import { DashboardLayout } from "../components/dashboard-layout";
import { WhaleAlertListResults } from "../components/whale-alert/whale-alert-list-results";
import { WhaleAlertListToolbar } from "../components/whale-alert/whale-alert-list-toolbar";


const fetcher = (url) => fetch(url).then((res) => res.json());


const WhaleAlerts = () => {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `http://localhost:5000/api/transactions/search/findAllByDayOrderByAmountDesc?theDate=2022-02-01&page=${index}`,
    fetcher
  );
  if (!data) return "Loading...";

  const transactions = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 6);
  const isRefreshing = isValidating && data && data.length === size;
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
            <Grid item xs={12} md={12}>
              <WhaleAlertListResults/>
              
              {isEmpty ? <p>Yay, no transactions found.</p> : null}
            </Grid>
            {/* <button onClick={() => setSize(size + 1)}>Load More</button> */}
          </Box>
        </Container>
      </Box>
    </>
  );
};
WhaleAlerts.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default WhaleAlerts;
