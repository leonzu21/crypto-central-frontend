import React from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

import PerfectScrollbar from "react-perfect-scrollbar";

import { useTheme } from "@mui/material";

const SituationPieChart = ({ symbols, ...rest }) => {
  const theme = useTheme();

  return (
    <div>
      {/* <PerfectScrollbar> */}
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={symbols}
            cx="50%"
            cy="50%"
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              percent,
              index,
            }) => {
              const RADIAN = Math.PI / 180;

              // eslint-disable-next-line
              const radius = 25 + innerRadius + (outerRadius - innerRadius);
              // eslint-disable-next-line
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              // eslint-disable-next-line
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                >
                  {`${symbols[index].symbol}(${(percent * 100).toFixed(0)}%)`}
                </text>
              );
            }}
            outerRadius={100}
            fill={theme.palette.info.main}
            dataKey="symbolInvestment"
          ></Pie>
        </PieChart>
      </ResponsiveContainer>
      {/* </PerfectScrollbar> */}
    </div>
  );
};

export default SituationPieChart;
