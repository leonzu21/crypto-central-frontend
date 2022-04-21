import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
  Paper,
  Grid,
} from "@mui/material";

import { useTheme } from "@mui/material";

import SituationPieChart from "./situation-pie-chart";

export const PortfolioSituation = ({ situation, ...rest }) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography sx={{ m: 1 }} variant="h5">
        Situation
      </Typography>
      <Grid container spacing={3}>
        <Grid item lg={8} md={12} xs={12}>
          <Card>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Coin</TableCell>
                    <TableCell>Investment ($)</TableCell>
                    <TableCell>Count</TableCell>
                    <TableCell>Coin Average ($)</TableCell>
                    <TableCell>Current Price ($)</TableCell>
                    <TableCell>whereLambo ($)</TableCell>
                    <TableCell>DCA Invest?</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {situation.symbols.map((coin) => {
                    return (
                      <TableRow hover key={coin.symbol}>
                        <TableCell>{coin.symbol}</TableCell>
                        <TableCell>
                          {coin.symbolInvestment.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {coin.symbolCount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {coin.symbolAvgPrice.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {coin.symbolCurrentPrice.toLocaleString()}
                        </TableCell>
                        <TableCell
                          style={{
                            color:
                              coin.whereLambo < 0
                                ? theme.palette.error.main
                                : theme.palette.secondary.main,
                          }}
                        >
                          {coin.whereLambo.toLocaleString()}
                        </TableCell>
                        <TableCell
                          style={{
                            color:
                              coin.dcaInvest < 0
                                ? theme.palette.error.main
                                : theme.palette.secondary.main,
                          }}
                        >
                          {coin.dcaInvest.toLocaleString()}%
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
        <Grid item lg={4} md={12} xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Card>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Tendies ($)</TableCell>
                        <TableCell align="center">
                          Total Investment ($)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          style={{
                            color:
                              situation.tendies < 0
                                ? theme.palette.error.main
                                : theme.palette.secondary.main,
                          }}
                          align="center"
                        >
                          {situation.tendies.toLocaleString()}
                        </TableCell>
                        <TableCell
                          style={{
                            color: theme.palette.secondary.main,
                          }}
                          align="center"
                        >
                          {situation.totalInvestment.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <SituationPieChart symbols={situation.symbols} />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
