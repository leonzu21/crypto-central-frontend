import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  ReferenceLine,
  Cell,
  Line,
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

const DifferenceChart = ({ data, filterBy, ...rest }) => {
  const isDesktopFormat = useMediaQuery("(min-width:700px)");

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
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
          <ReferenceLine y={0} stroke="#000" />
          {!isDesktopFormat ? (
            <Brush dataKey="name" height={30} stroke="#8884d8" />
          ) : null}
          <Bar dataKey="Difference" fill="#EF5350">
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry["Difference"] < 0 ? "#EF5350" : "#4DB6AC"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DifferenceChart;
