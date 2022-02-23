import Head from "next/head";
import { Box, Container, Grid, Divider, Chip } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { CoinListResults } from "../../components/coin/coin-list-results";
import { CoinListToolbar } from "../../components/coin/coin-list-toolbar";
import { CoinDetails } from "../../components/coin/coin-details";
import { CoinHistoricalChart } from "src/components/coin/coin-historical-chart";
import { useRouter } from "next/router";
import useSWR from "swr";
import { WhaleAlertCharts } from "src/components/whale-alert/whale-alert-charts";
import { WhaleAlertListResults } from "src/components/whale-alert/whale-alert-list-results";

const fetcher = (url) => fetch(url).then((res) => res.json());

// export const getStaticProps = async (context) => {
//   const id = context.params.id;
//   const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
//   const data = await res.json();

//   return {
//     props: { coin: data },
//   };
// };

const Coin = () => {
  const router = useRouter();

  const coinId = router.query.id;

  const { data, error } = useSWR(
    coinId ? `https://api.coingecko.com/api/v3/coins/${coinId}` : null,
    fetcher
  );
  const coin = null;
  if (data) coin = data;
  return (
    <>
      <Head>
        <title>{coin ? `${coin.name}` : null} | Crypto Central</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          {/* <CoinListToolbar /> */}
          <Box>
            <Grid container>
              <Grid
                sx={{ m: { xs: 1, md: 1 }, ml: { xs: 0 }, mr: { xs: 0 } }}
                item
                xs={12}
                md={12}
              >
                <CoinDetails coin={coin} />
              </Grid>
              {/* <Grid
                sx={{ m: { xs: 1, md: 1 }, ml: { xs: 0 }, mr: { xs: 0 } }}
                item
                xs={12}
                md={4}
              >
                <CoinDetails coin={coin} />
              </Grid> */}
            </Grid>
          </Box>
          <Box>
            <Grid container>
              <Grid
                sx={{ m: { xs: 1, md: 1 }, ml: { xs: 0 }, mr: { xs: 0 } }}
                item
                xs={12}
                md={12}
              >
                {coin ? <CoinHistoricalChart coin={coin} /> : null}
              </Grid>
            </Grid>
          </Box>
          <Grid
            sx={{ m: { xs: 1, md: 1 }, ml: { xs: 0 }, mr: { xs: 0 } }}
            item
            xs={12}
          >
            {coin ? <WhaleAlertCharts propSymbol={coin.symbol} /> : null}
          </Grid>
          <Grid
            sx={{ m: { xs: 1, md: 1 }, ml: { xs: 0 }, mr: { xs: 0 } }}
            item
            xs={12}
          >
            {coin ? <WhaleAlertListResults propSymbol={coin.symbol} /> : null}
          </Grid>
        </Container>
      </Box>
    </>
  );
};
Coin.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Coin;
