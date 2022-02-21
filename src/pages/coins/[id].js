import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { CoinListResults } from "../../components/coin/coin-list-results";
import { CoinListToolbar } from "../../components/coin/coin-list-toolbar";
import { CoinDetails } from "../../components/coin/coin-details";
import { CoinHistoricalChart } from "src/components/coin/coin-historical-chart";

export const getStaticPaths = async () => {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/list`);
  const data = await res.json();

  const paths = data.map((coin) => {
    return {
      params: { id: coin.id.toString() },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
  const data = await res.json();

  return {
    props: { coin: data },
  };
};

const Coin = ({ coin }) => {
  console.log(coin);
  return (
    <>
      <Head>
        <title>{coin.name} | Crypto Central</title>
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
                md={7}
              >
                <CoinDetails coin={coin} />
              </Grid>
              <Grid
                sx={{ m: { xs: 1, md: 1 }, ml: { xs: 0 }, mr: { xs: 0 } }}
                item
                xs={12}
                md={4}
              >
                <CoinDetails coin={coin} />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container>
              <Grid
                sx={{ m: { xs: 1, md: 1 }, ml: { xs: 0 }, mr: { xs: 0 } }}
                item
                xs={12}
                md={7}
              >
                <CoinHistoricalChart coin={coin} />
              </Grid>
              {/* <Grid
                sx={{ m: { xs: 1, md: 1 }, ml: { xs: 0 }, mr: { xs: 0 } }}
                item
                xs={12}
                md={4}
              >
                <CoinHistoricalChart coin={coin} />
              </Grid> */}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};
Coin.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Coin;
