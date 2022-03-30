import React, { useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useContainerDimensions } from "src/hooks/useContainerDimensions";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { useTheme } from "@mui/material";

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

const TotalChart = ({ data, filterBy, symbol, ...rest }) => {
  const componentRef = useRef();

  const { width, height } = useContainerDimensions(componentRef);
  const isDesktopFormat = useMediaQuery("(min-width:700px)");
  const customWidth = isDesktopFormat ? width : width * 1.5;
  const theme = useTheme();

  return (
    <div ref={componentRef}>
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
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            axisLine={false}
            dataKey="Timestamp"
            tickFormatter={(tick) => formatAxis(tick, filterBy)}
          />
          <YAxis
            mirror
            axisLine={false}
            tickFormatter={(tick) => {
              return symbol ? `${nFormatter(tick)}` : `$${nFormatter(tick)}`;
            }}
          />
          <Tooltip
            cursor={{ opacity: 0.1 }}
            contentStyle={{
              backgroundColor: theme.palette.background.default,
            }}
            formatter={(value) => {
              return symbol
                ? `${new Intl.NumberFormat("en").format(value)}`
                : `$${new Intl.NumberFormat("en").format(value)}`;
            }}
          />
          <Legend />
          <Bar dataKey="Total" fill="#5048E5" />
        </BarChart>
      </PerfectScrollbar>
    </div>
  );
};

export default TotalChart;
