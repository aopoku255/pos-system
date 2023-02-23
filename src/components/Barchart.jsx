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
import axios from "../api/axios";
import axioss from "axios";

export default class Barchart extends PureComponent {
  //   static demoUrl = 'https://codesandbox.io/s/tiny-bar-chart-35meb';
  constructor(props) {
    var userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
    var accessToken = userinfo.refreshToken;
    let id = userinfo.id;
    super(props);
    this.state = {
      data: [],
      shop_id: id,
      accessToken: accessToken,
    };
  }

  componentDidMount() {
    axios
      .post(
        "sales/day-sales",
        { shop_id: this.state.shop_id },
        { headers: { "auth-token": this.state.accessToken } }
      )
      .then((res) => this.setState({ data: res.data.data }))
      .catch((err) => console.log(err));
  }

  render() {
    // console.log(this.state.data)

    const datas = [
      {
        name: "Mon",
        uv: 0,
      },
      {
        name: "Tue",
        uv: 0,
      },
      {
        name: "Wed",
        uv: 0,
      },
      {
        name: "Thu",
        uv: 0,
      },
      {
        name: "Fri",
        uv: 0,
      },
      {
        name: "Sat",
        uv: 0,
      },
      {
        name: "Sun",
        uv: 0,
      },
    ];

    this.state.data.forEach(({ name, sale }) => {
      datas.forEach((item) => {
        if (item.name === name) {
          item.uv = sale;
        }
       
      });
    });

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={datas}>
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
