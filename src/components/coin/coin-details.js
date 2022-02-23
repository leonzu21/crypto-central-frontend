import {
  Box,
  Card,
  Avatar,
  Typography,
  CardHeader,
  Divider,
  Grid,
  Skeleton,
} from "@mui/material";

import LinearProgress from "@mui/material/LinearProgress";

export const CoinDetails = ({ coin, ...rest }) => {
  let coinDetailsDisplay = <LinearProgress />;
  if (coin) {
    coinDetailsDisplay = (
      <>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            m: 1,
          }}
        >
          <Avatar src={coin.image.small} sx={{ mr: 2 }} />
          <Typography color="textPrimary" variant="h6">
            {coin.name} ({coin.symbol.toUpperCase()})
          </Typography>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            ml: 1,
          }}
        >
          <Typography color="textPrimary" variant="h5">
            ${coin.market_data.current_price.usd.toLocaleString()}
          </Typography>
        </Box>
        <Divider />
        <Grid container>
          <Grid item md={6} xs={12}>
            <Box
              sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
            >
              <Typography color="textSecondary" variant="caption">
                Market Cap
              </Typography>
              <Typography color="textPrimary" variant="caption">
                ${coin.market_data.market_cap.usd.toLocaleString()}
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
            >
              <Typography color="textSecondary" variant="caption">
                24 Hour Trading Vol
              </Typography>
              <Typography color="textPrimary" variant="caption">
                ${coin.market_data.total_volume.usd.toLocaleString()}
              </Typography>
            </Box>

            <Divider />
            <Box
              sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
            >
              {coin.market_data.fully_diluted_valuation.usd ? (
                <>
                  {" "}
                  <Typography color="textSecondary" variant="caption">
                    Fully Diluted Valuation
                  </Typography>
                  <Typography color="textPrimary" variant="caption">
                    $
                    {coin.market_data.fully_diluted_valuation.usd.toLocaleString()}
                  </Typography>{" "}
                </>
              ) : null}
            </Box>
          </Grid>

          <Grid item md={6} xs={12}>
            <Box
              sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
            >
              <Typography color="textSecondary" variant="caption">
                Circulating Supply
              </Typography>
              <Typography color="textPrimary" variant="caption">
                {coin.market_data.circulating_supply.toLocaleString()}
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
            >
              <Typography color="textSecondary" variant="caption">
                Total Supply
              </Typography>
              <Typography color="textPrimary" variant="caption">
                {coin.market_data.total_supply ? (
                  coin.market_data.total_supply.toLocaleString()
                ) : (
                  <span>&infin;</span>
                )}
              </Typography>
            </Box>

            <Divider />
            <Box
              sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
            >
              <Typography color="textSecondary" variant="caption">
                Max Supply
              </Typography>
              <Typography color="textPrimary" variant="caption">
                {coin.market_data.max_supply ? (
                  coin.market_data.max_supply.toLocaleString()
                ) : (
                  <span>&infin;</span>
                )}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Card>{coinDetailsDisplay}</Card>
    </>
  );
};
