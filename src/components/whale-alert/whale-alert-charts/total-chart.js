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

const TotalChart = ({ data, filterBy, ...rest }) => {
  const componentRef = useRef();

  const { width, height } = useContainerDimensions(componentRef);
  const isDesktopFormat = useMediaQuery("(min-width:700px)");
  const customWidth = isDesktopFormat ? width : width * 1.5;

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
          <Bar dataKey="Total" fill="#4DB6AC" />
        </BarChart>
      </PerfectScrollbar>
    </div>
  );
};

export default TotalChart;
