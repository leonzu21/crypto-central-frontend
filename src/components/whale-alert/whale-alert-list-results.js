import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import useSWRInfinite from "swr/infinite";
import WhaleAlertRow from "./whale-alert-row";
import "react-perfect-scrollbar/dist/css/styles.css";

import DatePicker from "@mui/lab/DatePicker";

import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Grid,
  CardHeader,
  Autocomplete,
} from "@mui/material";

import { GetCurrentDate } from "src/utils/get-current-date";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const WhaleAlertListResults = ({ propSymbol, ...rest }) => {
  const [date, setDate] = useState(null);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [value, setValue] = useState(Date());
  const [filterBy, setFilterBy] = useState("Day");
  const [symbol, setSymbol] = useState(propSymbol ? propSymbol : "");
  const [symbolValue, setSymbolValue] = useState(
    propSymbol ? propSymbol : null
  );
  const [bySymbol, setBySymbol] = useState(propSymbol ? "BySymbol" : "");
  const [coins, setCoins] = useState(null);
  const [endpoint, setEndpoint] = useState(
    `findAll${bySymbol}ByDayOrderByAmountDesc?theDate=${
      GetCurrentDate()["currDate"]
    }`
  );
  const [alignment, setAlignment] = useState("24h");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    const currentDate = GetCurrentDate();
    if (!day) {
      setDate(currentDate["currDate"]);
      setDay(currentDate["day"]);
      setMonth(currentDate["month"]);
      setYear(currentDate["year"]);
      setEndpoint(
        `findAll${bySymbol}ByDayOrderByAmountDesc?theDate=${currentDate["year"]}-${currentDate["month"]}-${currentDate["day"]}`
      );
    }
  }, []);

  // 3. Create out useEffect function
  useEffect(() => {
    fetch("https://dmc8ptcuv1dn8.cloudfront.net/api/symbols/all")
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data) => setCoins(data));
  }, []);

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    endpoint
      ? (index) =>
          `https://dmc8ptcuv1dn8.cloudfront.net/api/transactions/search/${endpoint}&page=${index}`
      : null,
    fetcher
  );
  if (!data) return "Loading...";
  // const transactions = data ? [].concat(...data) : [];
  const transactions = data;
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 6);
  const isRefreshing = isValidating && data && data.length === size;

  let transactionsDisplay = transactions.map((t) => {
    return t["_embedded"]["transactions"].map((transaction) => {
      return (
        <WhaleAlertRow
          key={transaction.whalealertId}
          transaction={transaction}
        />
      );
    });
  });

  return (
    <Card {...rest}>
      <CardHeader title="Biggest Whale Alerts" />
      <Box sx={{ m: 1 }}>
        <Grid container>
          <Grid item xs={8} md={4} sx={{ mb: { xs: 1 } }}>
            <ToggleButtonGroup
              size="small"
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton
                sx={{ pl: { md: 2, xs: 1 }, pr: { md: 2, xs: 1 } }}
                value="24h"
                onClick={() => {
                  setEndpoint(
                    `findAll${bySymbol}ByDayOrderByAmountDesc?theDate=${year}-${month}-${day}${symbol}`
                  );
                  setFilterBy("Day");
                }}
              >
                24h
              </ToggleButton>
              <ToggleButton
                sx={{ pl: { md: 2, xs: 1 }, pr: { md: 2, xs: 1 } }}
                value="30d"
                onClick={() => {
                  setEndpoint(
                    `findAll${bySymbol}ByMonthOrderByAmountDesc?theDate=${year}-${month}${symbol}`
                  );
                  setFilterBy("Month");
                }}
              >
                30d
              </ToggleButton>
              <ToggleButton
                sx={{ pl: { md: 2, xs: 1 }, pr: { md: 2, xs: 1 } }}
                value="1y"
                onClick={() => {
                  setEndpoint(
                    `findAll${bySymbol}ByYearOrderByAmountDesc?theDate=${year}${symbol}`
                  );
                  setFilterBy("Year");
                }}
              >
                1y
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={4} md={4}>
            <DatePicker
              label="Choose a date"
              value={value}
              onChange={(newValue) => {
                let calDay = newValue.getDate();
                let calMonth = newValue.getMonth() + 1;
                calMonth = calMonth < 10 ? `0${calMonth}` : `${calMonth}`;
                let calYear = newValue.getFullYear();
                setValue(newValue);
                switch (filterBy) {
                  case "Day":
                    setEndpoint(
                      `findAll${bySymbol}By${filterBy}OrderByAmountDesc?theDate=${calYear}-${calMonth}-${calDay}${symbol}`
                    );
                    break;
                  case "Month":
                    setEndpoint(
                      `findAll${bySymbol}By${filterBy}OrderByAmountDesc?theDate=${calYear}-${calMonth}${symbol}`
                    );
                    break;
                  case "Year":
                    setEndpoint(
                      `findAll${bySymbol}By${filterBy}OrderByAmountDesc?theDate=${calYear}${symbol}`
                    );
                    break;
                  default:
                    setEndpoint(
                      `findAll${bySymbol}By${filterBy}OrderByAmountDesc?theDate=${calYear}-${calMonth}-${calYear}${symbol}`
                    );
                    break;
                }
                calDay = calDay < 10 ? `0${calDay}` : `${calDay}`;
                setDay(calDay);
                setMonth(calMonth);
                setYear(calYear);
              }}
              renderInput={(params) => (
                <TextField
                  size="small"
                  sx={{ width: { md: 300 } }}
                  fontSize="small"
                  {...params}
                />
              )}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            {coins ? (
              <Autocomplete
                isOptionEqualToValue={(option, value) => option.label === value}
                size="small"
                disablePortal
                id="combo-box-demo"
                value={symbolValue}
                options={coins}
                sx={{ width: { md: 300 } }}
                onInputChange={(event, newValue) => {
                  setSymbolValue(newValue);
                  let symb = newValue ? `&theSymbol=${newValue}` : "";
                  let bySymb = newValue ? "BySymbol" : "";
                  setSymbol(symb);
                  setBySymbol(bySymb);
                  switch (filterBy) {
                    case "Day":
                      setEndpoint(
                        `findAll${bySymb}By${filterBy}OrderByAmountDesc?theDate=${year}-${month}-${day}${symb}`
                      );
                      break;
                    case "Month":
                      setEndpoint(
                        `findAll${bySymb}By${filterBy}OrderByAmountDesc?theDate=${year}-${month}${symb}`
                      );
                      break;
                    case "Year":
                      setEndpoint(
                        `findAll${bySymb}By${filterBy}OrderByAmountDesc?theDate=${year}${symb}`
                      );
                      break;
                    default:
                      setEndpoint(
                        `findAll${bySymb}By${filterBy}OrderByAmountDesc?theDate=${year}-${month}-${day}${symb}`
                      );
                      break;
                  }

                }}
                renderInput={(params) => <TextField {...params} label="All" />}
              />
            ) : null}
          </Grid>
        </Grid>
      </Box>
      <PerfectScrollbar>
        <Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>USD</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{transactionsDisplay}</TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>

      <div component="div">
        <p>
          <Button
            disabled={isLoadingMore || isReachingEnd}
            onClick={() => setSize(size + 1)}
          >
            {isLoadingMore
              ? "loading..."
              : isReachingEnd
              ? "no more transactions"
              : "load more"}
          </Button>
          <Button
            disabled={isRefreshing}
            onClick={() => {
              mutate();
              setSize(1);
            }}
          >
            {isRefreshing ? "refreshing..." : "refresh"}
          </Button>
          <Button disabled={!size} onClick={() => setSize(0)}>
            clear
          </Button>
        </p>
      </div>
    </Card>
  );
};
