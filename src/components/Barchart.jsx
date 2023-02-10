import React, { PureComponent } from "react";
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

const data = [
  {
    name: "Mon",
    uv: 4000,
  },
  {
    name: "Tue",
    uv: 3000,
  },
  {
    name: "Wed",
    uv: 2000,
  },
  {
    name: "Thur",
    uv: 2780,
  },
  {
    name: "Fri",
    uv: 1890,
  },
  {
    name: "Sat",
    uv: 2390,
  },
  {
    name: "Sun",
    uv: 3490,
  },
];

export default class Barchart extends PureComponent {
  //   static demoUrl = 'https://codesandbox.io/s/tiny-bar-chart-35meb';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip cursor={false} />
          <Bar
            dataKey="uv"
            fill="#fb6340"
            barSize={12}
            shape="cross"
            radius={10}
            type="monotype"
          />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            stroke="#8898aa"
            fontSize={12}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={12}
            stroke="#8898aa"
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
