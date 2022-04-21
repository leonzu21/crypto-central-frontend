import Head from "next/head";
import { Box, Container } from "@mui/material";
import React from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import { PortfolioListToolbar } from "../components/portfolio/portfolio-list-toolbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { portfolioService, portfolioTransactionService } from "../services";
import { useState, useEffect } from "react";
import { PortfolioListResults } from "src/components/portfolio/portfolio-list-results";
import { PortfolioSituation } from "src/components/portfolio/portfolio-situation";

import { getHalId } from "src/utils/get_hal_id";

import InitPortfolio from "src/components/portfolio/init-portfolio";

const Portfolio = (props) => {
  const [portfolio, setPortfolio] = useState(null);
  const [portfolioReceived, setPortfolioReceived] = useState(false);
  const [transactions, setTransactions] = useState(null);
  const [situation, setSituation] = useState(null);

  let toolbar = <PortfolioListToolbar />;
  function fetchPortfolio() {
    portfolioService
      .getAll(
        props.userSession.session.accessToken,
        props.userSession.session.userId
      )
      .then((x) => {
        setPortfolio(x._embedded.portfolios[0]);
        setPortfolioReceived(true);
      });
  }

  function fetchTransactions() {
    portfolioTransactionService
      .getAllByPortfolio(
        props.userSession.session.accessToken,
        getHalId(portfolio)
      )
      .then((x) => setTransactions(x._embedded.portfolioTransactions));
  }

  function fetchSituation() {
    portfolioService
      .getSituation(props.userSession.session.accessToken, getHalId(portfolio))
      .then((x) => setSituation(x));
  }

  function submitTransactionForm() {
    fetchTransactions();
    fetchSituation();
  }

  let portfolioShow = "You must be logged in to see your Portfolio.";

  let portfolioSituation = null;

  if (props.userSession) {
    useEffect(() => {
      fetchPortfolio();
    }, []);

    useEffect(() => {
      if (portfolioReceived) {
        fetchTransactions();
        fetchSituation();
      }
    }, [portfolioReceived]);

    if (!portfolio) {
      portfolioShow = (
        <InitPortfolio
          submitForm={fetchPortfolio}
          userSession={props.userSession}
        />
      );
    } else {
      if (transactions && situation) {
        portfolioShow = (
          <PortfolioListResults
            userSession={props.userSession}
            portfolio={portfolio}
            transactions={transactions}
            submitForm={submitTransactionForm}
            totalBinance={situation.total2binance}
          />
        );

        portfolioSituation = <PortfolioSituation situation={situation} />;
      }
    }
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
          <Box sx={{ mt: 3 }}>{portfolioSituation}</Box>
          <Box sx={{ mt: 3 }}>{portfolioShow}</Box>
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
