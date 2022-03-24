import { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { icoService } from "../../services/ico.service";
import { IcoListToolbar } from "src/components/ico/ico-list-toolbar";
import { IcoCard } from '../../components/ico/ico-card';

const Icos = () => {
  const [icos, setIcos] = useState(null);

  useEffect(() => {
    icoService.getAll().then(x => setIcos(x._embedded.icoes))
  }, []);

  console.log(icos);
  function deleteIco(id) {
    setIcos(
      icos.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    icoService.delete(id).then(() => {
      setIcos((icos) => icos.filter((x) => x.id !== id));
    });
  }

  return (
    <>
    <Head>
      <title>
        Products | Material Kit
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
        <IcoListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {icos && icos.map((ico) => (
              <Grid
                item
                key={ico.id}
                lg={4}
                md={6}
                xs={12}
              >
                <IcoCard ico={ico} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Box>
  </>
  );
};

Icos.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Icos;
