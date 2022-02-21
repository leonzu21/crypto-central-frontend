import { Card, CardHeader } from "@mui/material";
import useSWR from "swr";
import { GetCurrentDate } from "src/utils/get-current-date";
import moment from "moment";
import nFormatter from "src/utils/n-formatter";

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
    (new Date(GetCurrentDate()["currDate"]).getTime() / 1000).toFixed(0)
  );

  const [from, setFrom] = useState(currDate - 86400);
  const [to, setTo] = useState(currDate);

  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,
    fetcher
  );
  let prices = null;
  if (data) {
    prices = data.prices.map((item, index) => {
      const keyValue = {
        price: item[1],
        timestamp: moment(item[0]).format("DD-MM-yyyy hh:mm:ss"),
      };
      return keyValue;
    });

    console.log(prices);
  }

  return (
    <Card>
      <CardHeader title={coin.name + " Price Chart (" + coin.symbol.toUpperCase() + ")"} />
      <div style={{ width: "100%", height: 500 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={prices}
            margin={{
              top: 5,
              right: 30,
              left: 50,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis
              type="number"
              domain={[
                (dataMin) =>
                  dataMin != 0
                    ? Math.round(Math.abs(dataMin) - (Math.abs(dataMin)) / 100)
                    : 0,
                (dataMax) =>
                  dataMax != 0
                    ? Math.round(Math.abs(dataMax) + (Math.abs(dataMax)) / 100)
                    : 0,
              ]}
              tickCount={10}
              tickFormatter={(value) => new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' }).format(Math.round(value))}
            />

            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' }).format(value)
              }
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#82ca9d"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
