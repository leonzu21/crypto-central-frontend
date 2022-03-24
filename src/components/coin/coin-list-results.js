import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import useSWRInfinite from "swr/infinite";
import Link from "next/link";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TableContainer,
  Paper,
  tableCellClasses,
} from "@mui/material";
import { getInitials } from "src/utils/get-initials";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const CoinListResults = ({ ...rest }) => {
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(1);
  const [noOfCoins, setNoOfCoins] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=${page}&sparkline=true&price_change_percentage=1h,24,7d
      `,
    fetcher
  );

  if (!data) return "Loading...";
  // const transactions = data ? [].concat(...data) : [];
  const coins = data[0];

  return (
    <Card>
      <TableContainer component={Paper}>
        <Table
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "1px inset #E0E0E0",
            },
          }}
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Coin</TableCell>
              <TableCell></TableCell>
              <TableCell>Price</TableCell>
              <TableCell>1h</TableCell>
              <TableCell>24h</TableCell>
              <TableCell>7d</TableCell>
              <TableCell>24h Volume</TableCell>
              <TableCell>Mkt Cap</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coins.slice(0, limit).map((coin) => (
              <TableRow hover key={coin.id}>
                <TableCell>{coin.market_cap_rank}</TableCell>

                <TableCell
                  style={{
                    position: "sticky",
                    left: 0,
                    background: "white",
                  }}
                >
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Avatar src={coin.image} sx={{ mr: 2 }} />
                    <Link href={`/coins/${coin.id}`}>
                      <a>
                        <Typography color="textPrimary" variant="body1">
                          {coin.name}
                        </Typography>
                      </a>
                    </Link>
                  </Box>
                </TableCell>

                <TableCell>{coin.symbol}</TableCell>
                <TableCell>${coin.current_price.toLocaleString()}</TableCell>
                <TableCell
                  style={{
                    color:
                      coin.price_change_percentage_1h_in_currency < 0
                        ? "#D50000"
                        : "#2E7D32",
                  }}
                >
                  {coin.price_change_percentage_1h_in_currency.toFixed(1)}%
                </TableCell>
                <TableCell
                  style={{
                    color:
                      coin.price_change_percentage_24h < 0
                        ? "#D50000"
                        : "#2E7D32",
                  }}
                >
                  {coin.price_change_percentage_24h.toFixed(1)}%
                </TableCell>
                <TableCell
                  style={{
                    color:
                      coin.price_change_percentage_7d_in_currency < 0
                        ? "#D50000"
                        : "#2E7D32",
                  }}
                >
                  {coin.price_change_percentage_7d_in_currency.toFixed(1)}%
                </TableCell>
                <TableCell>${coin.total_volume.toLocaleString()}</TableCell>
                <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={1200}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[25, 50, 100]}
      />
    </Card>
  );
};
