import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { CoinListResults } from "../components/coin/coin-list-results";
import { CoinListToolbar } from "../components/coin/coin-list-toolbar";

const Coins = (props) => (
  <>
    <Head>
      <title>Coins | Crypto Central</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <CoinListToolbar />
        <Box sx={{ mt: 3 }}>
          <CoinListResults />
        </Box>
      </Container>
    </Box>
  </>
);
Coins.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;


export default Coins;
