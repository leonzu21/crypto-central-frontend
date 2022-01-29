import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { CoinListResults } from '../components/coin/coin-list-results';
import { CoinListToolbar } from '../components/coin/coin-list-toolbar';


const Coins = (props) => (
  <>
    <Head>
      <title>
        Coins | Crypto Central
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <CoinListToolbar />
        <Box sx={{ mt: 3 }}>
          <CoinListResults coins={props.data} />
        </Box>
      </Container>
    </Box>
  </>
);
Coins.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


// This gets called on every request
export async function getStaticProps() {
    // Fetch data from external API
    const res = await fetch(`http://cryptocentral-env.eba-vphjzryf.eu-central-1.elasticbeanstalk.com/api/coins`)
    const data = await res.json()
  
    // Pass data to the page via props
    return { 
          props: { data },
          revalidate: 5 }
      }

export default Coins;
