import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import nFormatter from "src/utils/n-formatter";

import moment from 'moment';


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
          <XAxis dataKey="Timestamp" tickFormatter={(tick) => formatAxis(tick, filterBy)} />
          <YAxis
            tickFormatter={(tick) => {
              return nFormatter(tick);
            }}
          />
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
          <Legend />
          <Bar dataKey="Total" fill="#4DB6AC" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalChart;
