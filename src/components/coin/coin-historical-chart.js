import {
  Card,
  CardHeader,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import useSWR from "swr";
import { GetCurrentDate } from "src/utils/get-current-date";
import moment from "moment";
import nFormatter from "src/utils/n-formatter";
import DatePicker from "@mui/lab/DatePicker";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ChartLoadingSpinner } from "../utils/chart-loading-spinner";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const CoinHistoricalChart = ({ coin, ...rest }) => {
  const currDate = parseInt(
    (new Date(GetCurrentDate()["fullDate"]).getTime() / 1000).toFixed(0)
  );

  const [alignment, setAlignment] = useState("24h");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [from, setFrom] = useState(currDate - 86401);
  const [to, setTo] = useState(currDate);
  const [valueFrom, setValueFrom] = useState(new Date(Date.now() - 86400000));
  const [valueTo, setValueTo] = useState(new Date());
  const [toMinDate, setToMinDate] = useState(new Date());
  const [toMaxDate, setToMaxDate] = useState(new Date());
  const [fromMinDate, setFromMinDate] = useState(null);
  const [fromMaxDate, setFromMaxDate] = useState(
    new Date(Date.now() - 86400000)
  );

  const setTimePeriod = (period) => {
    const currDate = parseInt(
      (new Date(GetCurrentDate()["fullDate"]).getTime() / 1000).toFixed(0)
    );

    setTo(currDate);
    switch (period) {
      case "24h":
        setFrom(currDate - 86401);
        break;
      case "7d":
        setFrom(currDate - 86400 * 7);
        break;
      case "14d":
        setFrom(currDate - 86400 * 14);
        break;
      case "30d":
        setFrom(currDate - 86400 * 30);
        break;
      case "90d":
        setFrom(currDate - 86400 * 90);
        break;
      case "180d":
        setFrom(currDate - 86400 * 180);
        break;
      case "1y":
        setFrom(currDate - 86400 * 365);
        break;
      case "Max":
        setFrom(currDate - 86400 * 365 * 10);
        break;
    }
  };

  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,
    fetcher
  );
  let chartDisplay = <ChartLoadingSpinner />;

  let prices = null;
  if (data) {
    prices = data.prices.map((item, index) => {
      const keyValue = {
        Price: item[1],
        timestamp: moment(item[0]).format("DD-MM-yyyy HH:mm:ss"),
      };
      return keyValue;
    });

    chartDisplay = (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={prices}
          margin={{
            top: 5,
            right: 25,
            left: 25,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            axisLine={false}
            dataKey="timestamp"
            ticks={[
              prices[0].timestamp,
              prices[Math.round(prices.length / 6)].timestamp,
              prices[Math.round(prices.length / 3)].timestamp,
              prices[Math.round(prices.length / 2)].timestamp,
              prices[Math.round((2 * prices.length) / 3)].timestamp,
              prices[Math.round((5 * prices.length) / 6)].timestamp,
              prices[prices.length - 1].timestamp,
            ]}
            tickFormatter={(date) => {
              const timestamp = moment(date, "DD-MM-yyyy HH:mm:ss").valueOf();
              return moment(timestamp).format("HH:00 Do");
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            mirror
            type="number"
            allowDuplicatedCategory={false}
            domain={[
              (dataMin) =>
                dataMin != 0 ? Math.abs(dataMin) - Math.abs(dataMin) / 100 : 0,
              (dataMax) =>
                dataMax != 0 ? Math.abs(dataMax) + Math.abs(dataMax) / 100 : 0,
            ]}
            tickCount={10}
            tickFormatter={(value) =>
              value > 30
                ? new Intl.NumberFormat("en-us", {
                    style: "currency",
                    currency: "USD",
                  }).format(Math.round(value))
                : new Intl.NumberFormat("en-us", {
                    style: "currency",
                    currency: "USD",
                  }).format(value)
            }
          />

          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat("en-us", {
                style: "currency",
                currency: "USD",
              }).format(value)
            }
          />
          <Legend />
          <Line type="monotone" dataKey="Price" stroke="#4DB6AC" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <Card>
      <CardHeader
        title={coin.name + " Price Chart (" + coin.symbol.toUpperCase() + ")"}
      />
      <Grid container>
        <Grid item xs={12} sx={{ mr: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
                onClick={() => setTimePeriod("24h")}
              >
                24h
              </ToggleButton>
              <ToggleButton
                sx={{ pl: { md: 2, xs: 1 }, pr: { md: 2, xs: 1 } }}
                value="7d"
                onClick={() => setTimePeriod("7d")}
              >
                7d
              </ToggleButton>
              <ToggleButton
                sx={{ pl: { md: 2, xs: 1 }, pr: { md: 2, xs: 1 } }}
                value="14d"
                onClick={() => setTimePeriod("14d")}
              >
                14d
              </ToggleButton>
              <ToggleButton
                sx={{ pl: { md: 2, xs: 1 }, pr: { md: 2, xs: 1 } }}
                value="30d"
                onClick={() => setTimePeriod("30d")}
              >
                30d
              </ToggleButton>
              <ToggleButton
                sx={{ pl: { md: 2, xs: 1 }, pr: { md: 2, xs: 1 } }}
                value="90d"
                onClick={() => setTimePeriod("90d")}
              >
                90d
              </ToggleButton>
              <ToggleButton
                sx={{ pl: { md: 2, xs: 1 }, pr: { md: 2, xs: 1 } }}
                value="180d"
                onClick={() => setTimePeriod("180d")}
              >
                180d
              </ToggleButton>
              <ToggleButton
                sx={{ pl: { md: 2, xs: 1 }, pr: { md: 2, xs: 1 } }}
                value="1y"
                onClick={() => setTimePeriod("1y")}
              >
                1y
              </ToggleButton>
              <ToggleButton
                sx={{ pl: { md: 2, xs: 1 }, pr: { md: 2, xs: 1 } }}
                value="Max"
                onClick={() => setTimePeriod("Max")}
              >
                Max
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ mr: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "end", m: 1 }}>
            <DatePicker
              minDate={fromMinDate}
              maxDate={fromMaxDate}
              value={valueFrom}
              onChange={(newValue) => {
                setValueFrom(newValue);
                const afterMidnight = new Date(newValue.setHours(0, 1, 0, 0)).getTime();
                setFrom(Math.floor(afterMidnight / 1000));
                setToMinDate(new Date(newValue.getTime() + 86400000))
              }}
              renderInput={(params) => (
                <TextField
                  size="small"
                  fullWidth
                  fontSize="small"
                  {...params}
                  sx={{ width: { md: 1 / 5 } }}
                />
              )}
            />
            <Typography
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                m: 1,
              }}
              color="textSecondary"
              variant="caption"
            >
              <ArrowForwardIcon fontSize="25%" />
            </Typography>
            <DatePicker
              minDate={toMinDate}
              maxDate={toMaxDate}
              value={valueTo}
              onChange={(newValue) => {
                setValueTo(newValue);
                const beforeMidnight = new Date(newValue.setHours(23, 59, 0, 0)).getTime() - 86400000;
                setTo(Math.floor(beforeMidnight / 1000));
                setFromMaxDate(new Date(newValue.getTime() - 86400000))
              }}
              renderInput={(params) => (
                <TextField
                  size="small"
                  fullWidth
                  fontSize="small"
                  {...params}
                  sx={{ width: { md: 1 / 5 } }}
                />
              )}
            />
          </Box>
        </Grid>
      </Grid>
      <div style={{ width: "100%", height: 500 }}>{chartDisplay}</div>
    </Card>
  );
};
