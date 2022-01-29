import Head from "next/head";
import useSWR from "swr";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { TransactionListResults } from "../components/transaction/transaction-list-results";
import { TransactionListToolbar } from "../components/transaction/transaction-list-toolbar";

// // This gets called on every request
// export const getStaticProps = async () => {
//     // Fetch data from external API
//     const res = await fetch(`http://cryptocentral-env.eba-vphjzryf.eu-central-1.elasticbeanstalk.com/api/transactions`)
//     const data = await res.json()

//     // Pass data to the page via props
//     return {props: { data }}
//   }

const fetcher = async () => {
  const res = await fetch(
    `https://dmc8ptcuv1dn8.cloudfront.net/api/transactions`, 
  )
  const data = await res.json()
  return data
};

const WhaleAlerts = () => {
  const { data, error } = useSWR("whalealerts", fetcher);

  console.log(data);

  if (error) {
      console.log(error);
      return "An error has occured";
  }
  if (!data) return "Loading...";
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
          <TransactionListToolbar />
          <Box sx={{ mt: 3 }}>
              {data[0].title}
            <TransactionListResults transactions={data} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
WhaleAlerts.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default WhaleAlerts;
