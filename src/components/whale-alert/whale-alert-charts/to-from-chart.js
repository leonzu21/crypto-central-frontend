import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import PerfectScrollbar from "react-perfect-scrollbar";
import useWindowDimensions from "src/hooks/useWindowDimensoins";

import {
  BarChart,
  Bar,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import useSWR from "swr";
import nFormatter from "src/utils/n-formatter";
import moment from "moment";

const formatAxis = (tickItem, filterBy) => {
  let format = "HH";
  switch (filterBy) {
    case "dai":
      format = "HH";
      break;
    case "month":
      format = "DD";
      break;
    case "year":
      format = "MMM";
      break;
  }
  return moment(tickItem).format(format);
};

const ToFromChart = ({ data, filterBy, ...rest }) => {
  const { height, width } = useWindowDimensions();
  const isDesktopFormat = useMediaQuery("(min-width:700px)");
  const customWidth = isDesktopFormat
    ? width
    : width * 1.5;

  return (
    <div>
      <PerfectScrollbar>
        <BarChart
          data={data}
          height={350}
          width={customWidth}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          label={{
            value: "random text",
            position: "insideBottomRight",
            offset: -20,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis
            dataKey="Timestamp"
            tickFormatter={(tick) => formatAxis(tick, filterBy)}
          />
          <YAxis
            tickFormatter={(tick) => {
              return nFormatter(tick);
            }}
          />
          <Tooltip
            formatter={(value) => new Intl.NumberFormat("en").format(value)}
          />
          <Legend />
          {/* {!isDesktopFormat ? (
              <Brush dataKey="name" height={30} stroke="#8884d8" />
            ) : null} */}

          <Bar dataKey="To Wallet" fill="#4DB6AC" />
          <Bar dataKey="From Wallet" fill="#EF5350" />
        </BarChart>
      </PerfectScrollbar>
    </div>
  );
};

export default ToFromChart;
