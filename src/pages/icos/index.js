import { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { icoService } from "../../services/ico.service";
import { IcoListToolbar } from "src/components/ico/ico-list-toolbar";
import { IcoCard } from "../../components/ico/ico-card";
import { getHalId } from "src/utils/get_hal_id";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

const Icos = ({ userSession }) => {
  const [icos, setIcos] = useState(null);


  let toolbar = "You must be logged in to add ICOs";

  if (userSession) {
    useEffect(() => {
      icoService
        .getAll(userSession.session.accessToken, userSession.session.userId)
        .then((x) => setIcos(x._embedded.icoes));
    }, []);

    toolbar = <IcoListToolbar />;
  }

  function deleteIco(id) {
    setIcos(
      icos.map((x) => {
        if (getHalId(x) === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    icoService.delete(id, userSession.session.accessToken).then(() => {
      setIcos((icos) => icos.filter((x) => getHalId(x) !== id));
    });
  }

  return (
    <>
      <Head>
        <title>ICO | Material Kit</title>
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
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {icos &&
                icos.map((ico) => (
                  <Grid item key={getHalId(ico)} lg={4} md={6} xs={12}>
                    <IcoCard deleteIco={deleteIco} ico={ico} />
                  </Grid>
                ))}
            </Grid>
          </Box>
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Pagination color="primary" count={3} size="small" />
          </Box> */}
        </Container>
      </Box>
    </>
  );
};

Icos.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export async function getServerSideProps(context) {
  // Get the user
  const userSession = await getServerSession(context, authOptions);

  return {
    props: {
      userSession,
    },
  };
}

export default Icos;
