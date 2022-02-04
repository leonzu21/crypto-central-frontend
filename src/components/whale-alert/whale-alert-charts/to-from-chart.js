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

import useSWR from "swr";
import nFormatter from "src/utils/n-formatter";



const ToFromChart = ({ data, ...rest }) => {
  

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
          <XAxis dataKey={new Date("Timestamp").getHours()} />
          <YAxis
            tickFormatter={(tick) => {
              return nFormatter(tick);
            }}
          />
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
          <Legend />
          <Bar dataKey="To Wallet" fill="#4DB6AC" />
          <Bar dataKey="From Wallet" fill="#EF5350" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ToFromChart;
