import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import useSWRInfinite from "swr/infinite";
import WhaleAlertRow from "./whale-alert-row";

import DatePicker from "@mui/lab/DatePicker";

import { format } from "date-fns";
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
  Button,
  ButtonGroup,
  TextField,
  Grid,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import daysToWeeks from "date-fns/fp/daysToWeeks";

const getCurrentDate = (separator = "-") => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return {
    currDate: `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}`,
    day: date < 10 ? `0${date}` : `${date}`,
    month: month < 10 ? `0${month}` : `${month}`,
    year: year,
  };
};

const fetcher = (url) => fetch(url).then((res) => res.json());

export const WhaleAlertListResults = ({ ...rest }) => {
  const [endpoint, setEndpoint] = useState(
    `findAllByDayOrderByAmountDesc?theDate=${getCurrentDate()["currDate"]}`
  );
  const [date, setDate] = useState(null);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [value, setValue] = useState(Date());
  const [filterBy, setFilterBy] = useState("Day");

  useEffect(() => {
    const currentDate = getCurrentDate();
    console.log(`[useEffect] -----> ${day}`);
    if (!day) {
      setDate(currentDate["currDate"]);
      setDay(currentDate["day"]);
      setMonth(currentDate["month"]);
      setYear(currentDate["year"]);
      setEndpoint(
        `findAllByDayOrderByAmountDesc?theDate=${currentDate["year"]}-${currentDate["month"]}-${currentDate["day"]}`
      );
    }
  }, []);

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    endpoint
      ? (index) =>
          `https://dmc8ptcuv1dn8.cloudfront.net/api/transactions/search/${endpoint}&page=${index}`
      : null,
    fetcher
  );
  if (!data) return "Loading...";

  const transactions = data ? [].concat(...data) : [];
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
      <Box sx={{ m: 1 }}>
        <Grid container>
          <Grid item xs={8} md={8}>
            <ButtonGroup size="small" color="primary" aria-label="small group">
              <Button
                onClick={() => {
                  console.log(`[Daily onClick] -----> ${day}`);
                  setEndpoint(
                    `findAllByDayOrderByAmountDesc?theDate=${year}-${month}-${day}`
                  );
                  setFilterBy("Day");
                }}
              >
                Daily
              </Button>
              <Button
                onClick={() => {
                  setEndpoint(
                    `findAllByMonthOrderByAmountDesc?theDate=${year}-${month}`
                  );
                  setFilterBy("Month");
                }}
              >
                Monthly
              </Button>
              <Button
                onClick={() => {
                  setEndpoint(`findAllByYearOrderByAmountDesc?theDate=${year}`);
                  setFilterBy("Year");
                }}
              >
                Yearly
              </Button>
            </ButtonGroup>
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
                      `findAllBy${filterBy}OrderByAmountDesc?theDate=${calYear}-${calMonth}-${calDay}`
                    );
                    break;
                  case "Month":
                    setEndpoint(
                      `findAllBy${filterBy}OrderByAmountDesc?theDate=${calYear}-${calMonth}`
                    );
                    break;
                  case "Year":
                    setEndpoint(
                      `findAllBy${filterBy}OrderByAmountDesc?theDate=${calYear}`
                    );
                    break;
                  default:
                    setEndpoint(
                      `findAllBy${filterBy}OrderByAmountDesc?theDate=${calYear}-${calMonth}-${calYear}`
                    );
                    break;
                }
                calDay = calDay < 10 ? `0${calDay}` : `${calDay}`;
                setDay(calDay);
                setMonth(calMonth);
                setYear(calYear);
              }}
              renderInput={(params) => (
                <TextField size="small" fontSize="small" {...params} />
              )}
            />
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
