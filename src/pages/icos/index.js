import { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { Link } from "../../components/utils/Link";
import { icoService } from "../../services/ico.service";
import { ProductListToolbar } from "src/components/product/product-list-toolbar";
import { ProductCard } from '../../components/product/product-card';

const Icos = () => {
  const [icos, setIcos] = useState(null);

  useEffect(() => {
    icoService.getAll().then(x => setIcos(x._embedded.icoes))
  }, []);


  function deleteIco(id) {
    setUsers(
      users.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    icoService.delete(id).then(() => {
      setUsers((users) => users.filter((x) => x.id !== id));
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
        <ProductListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {icos && icos.map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard product={product} />
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
