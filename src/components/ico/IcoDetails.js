import { useRouter } from "next/router";
import { useState } from "react";
import React from "react";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import CakeIcon from "@mui/icons-material/Cake";
import Head from "next/head";
import ShowMoreText from "react-show-more-text";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GaugeChart from "react-gauge-chart";
import LinkIcon from "@mui/icons-material/Link";
import TabIcon from "@mui/icons-material/Tab";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Box,
  Button,
  Container,
  Avatar,
  Card,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
// import { Link } from 'components';

import LinearProgress from "@mui/material/LinearProgress";
import { WindowSharp } from "@mui/icons-material";

export { IcoDetails };

function IcoDetails(props) {
  const [expand, setExpand] = useState(false);
  const onClick = () => {
    setExpand(!expand);
  };
  const ico = props?.ico;
  const isAddMode = !ico;
  const router = useRouter();
  let icoDetailsDisplay = <LinearProgress />;

  if (ico) {
    icoDetailsDisplay = (
      <>
        <Grid container>
          <Grid item md={4} xs={12}>
            <Card
              sx={{
                mb: 3,
                mr: 1,
              }}
            >
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  m: 1,
                }}
              >
                <Avatar sx={{ mr: 2 }}>
                  <CurrencyBitcoinIcon color="primary" />
                </Avatar>
                <Typography color="textPrimary" variant="h5">
                  {ico.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  ml: 1,
                }}
              >
                <Grid container>
                  <Grid item md={5} xs={12}>
                    <Button
                      size="small"
                      onClick={() => {
                        window.open(
                          ico.website ? ico.website : "https://example.com"
                        );
                      }}
                      style={{
                        backgroundColor: "#EFF2F5",
                        padding: "2px 4px 2px 4px",
                        marginBottom: 3,
                      }}
                    >
                      <LinkIcon color="action" fontSize="small" />
                      <text
                        style={{
                          color: "black",
                          paddingRight: 3,
                          paddingLeft: 3,
                        }}
                      >
                        {ico.website ? ico.website : "https://example.com"}
                      </text>
                      <TabIcon color="action" fontSize="small" />
                    </Button>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Button
                      size="small"
                      onClick={() => {
                        window.open(
                          ico.whitepaper
                            ? ico.whitepaper
                            : "https://example.com"
                        );
                      }}
                      style={{
                        backgroundColor: "#EFF2F5",
                        padding: "2px 4px 2px 4px",
                        marginBottom: 3,
                      }}
                    >
                      <LinkIcon color="action" fontSize="small" />
                      <text
                        style={{
                          color: "black",
                          paddingRight: 3,
                          paddingLeft: 3,
                        }}
                      >
                        {"Whitepaper"}
                      </text>
                      <TabIcon color="action" fontSize="small" />
                    </Button>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <Button
                      size="small"
                      style={{
                        backgroundColor: "#EFF2F5",
                        padding: "2px 4px 2px 4px",
                        marginBottom: 3,
                      }}
                    >
                      <text
                        style={{
                          color: "black",
                          paddingRight: 3,
                          paddingLeft: 3,
                        }}
                      >
                        {"Community"}
                      </text>
                    </Button>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Button
                      size="small"
                      onClick={() => {
                        window.open(
                          `https://bscscan.com/token/${ico.contract}`
                        );
                      }}
                      style={{
                        backgroundColor: "#EFF2F5",
                        padding: "2px 4px 2px 4px",
                        marginBottom: 3,
                      }}
                    >
                      <text
                        style={{
                          color: "black",
                          paddingRight: 3,
                          paddingLeft: 3,
                        }}
                      >
                        {`Contract: ${ico.contract}`}
                      </text>
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
          <Grid item md={2} xs={12}>
            <Card
              sx={{
                mb: 3,
                mr: 1,
              }}
            >
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  ml: 1,
                }}
              >
                <GaugeChart
                  colors={["#FF5F6D", "#10B981"]}
                  hideText
                  // style={{ width: "80%" }}
                  cornerRadius={6}
                  nrOfLevels={10}
                  // textColor="#5048E5"
                  percent={ico.confidenceLevel / 10}
                  arcPadding={0.1}
                />
              </Box>
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            <Card
              sx={{
                mb: 3,
              }}
            >
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  m: 1,
                }}
              >
                <Typography color="textPrimary" variant="h6">
                  About {ico.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  ml: 1,
                }}
              >
                <ShowMoreText
                  lines={3}
                  more={<ExpandMore />}
                  less={<ExpandLess />}
                  onClick={onClick}
                  expanded={expand}
                >
                  <Typography color="textPrimary" variant="body">
                    {ico.description}
                  </Typography>{" "}
                </ShowMoreText>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <Divider />
        <Card>
          <Grid container>
            <Grid
              sx={{
                m: 2,
              }}
              item
              md={12}
              xs={12}
            >
              <CakeIcon color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="body2"
              >
                {ico.birthday}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box
                sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
              >
                <Typography color="textSecondary" variant="caption">
                  Tokens for Sale
                </Typography>
                <Typography color="textPrimary" variant="caption">
                  {ico.tokensSale
                    ? `${ico.tokensSale.toLocaleString()}`
                    : "TBA"}
                </Typography>
              </Box>
              <Divider />
              <Box
                sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
              >
                <Typography color="textSecondary" variant="caption">
                  ICO Price
                </Typography>
                <Typography color="textPrimary" variant="caption">
                  {ico.price ? `$${ico.price.toLocaleString()}` : "TBA"}
                </Typography>
              </Box>

              <Divider />
              <Box
                sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
              >
                <Typography color="textSecondary" variant="caption">
                  Soft Cap
                </Typography>
                <Typography color="textPrimary" variant="caption">
                  {ico.softCap ? `$${ico.softCap.toLocaleString()}` : "TBA"}
                </Typography>{" "}
              </Box>

              <Divider />
              <Box
                sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
              >
                <Typography color="textSecondary" variant="caption">
                  Fundraising Goal
                </Typography>
                <Typography color="textPrimary" variant="caption">
                  {ico.fundGoal ? `$${ico.fundGoal.toLocaleString()}` : "TBA"}
                </Typography>{" "}
              </Box>

              <Divider />
              <Box
                sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
              >
                <Typography color="textSecondary" variant="caption">
                  Personal Cap
                </Typography>
                <Typography color="textPrimary" variant="caption">
                  {ico.personalCap
                    ? `$${ico.personalCap.toLocaleString()}`
                    : "TBA"}
                </Typography>{" "}
              </Box>
            </Grid>

            <Grid item md={6} xs={12}>
              <Box
                sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
              >
                <Typography color="textSecondary" variant="caption">
                  Tokens Sold
                </Typography>
                <Typography color="textPrimary" variant="caption">
                  {ico.tokensSold
                    ? `$${ico.tokensSold.toLocaleString()}`
                    : "N/A"}
                </Typography>
              </Box>
              <Divider />
              <Box
                sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
              >
                <Typography color="textSecondary" variant="caption">
                  Where to Buy
                </Typography>
                <Typography color="textPrimary" variant="caption">
                  {ico.buyOn ? `${ico.buyOn.toLocaleString()}` : "N/A"}
                </Typography>
              </Box>

              <Divider />
              <Box
                sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
              >
                <Typography color="textSecondary" variant="caption">
                  % of Total Supply
                </Typography>
                <Typography color="textPrimary" variant="caption">
                  {ico.centTotal ? `${ico.centTotal.toLocaleString()}%` : "N/A"}
                </Typography>
              </Box>

              <Divider />
              <Box
                sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
              >
                <Typography color="textSecondary" variant="caption">
                  Accept
                </Typography>
                <Typography color="textPrimary" variant="caption">
                  {ico.accept ? `${ico.accept.toLocaleString()}` : "N/A"}
                </Typography>
              </Box>

              <Divider />
              <Box
                sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
              >
                <Typography color="textSecondary" variant="caption">
                  Access
                </Typography>
                <Typography color="textPrimary" variant="caption">
                  {ico.access ? `${ico.access.toLocaleString()}` : "N/A"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{ico ? `${ico.name}` : null} | Crypto Central</title>
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
                {icoDetailsDisplay}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
