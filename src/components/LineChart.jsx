import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import axios from "../api/axios";



export default class Example extends PureComponent {
  // static demoUrl = "https://codesandbox.io/s/simple-line-chart-kec3v";


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
        "sales/monthly-sales",
        { shop_id: this.state.shop_id },
        { headers: { "auth-token": this.state.accessToken } }
      )
      .then((res) => this.setState({ data: res.data.data }))
      .catch((err) => console.log(err));
  }

  render() {

    const data = [
      {
        name: "Jan",
        pv: 0,
      },
      {
        name: "Feb",
        pv: 0,
      },
      {
        name: "Mar",
        pv: 0,
      },
      {
        name: "Apr",
        pv: 0,
      },
      {
        name: "May",
        pv: 0,
      },
      {
        name: "Jun",
        pv: 0,
      },
      {
        name: "Jul",
        pv: 0,
      },
      {
        name: "Aug",
        pv: 0,
      },
      {
        name: "Sep",
        pv: 0,
      },
      {
        name: "Oct",
        pv: 0,
      },
      {
        name: "Nov",
        pv: 0,
      },
      {
        name: "Dec",
        pv: 0,
      },
    ];

    this.state.data.forEach(({ name, sale }) => {
      data.forEach((item) => {
        if (item.name === name) {
          item.pv = sale;
        }
      });
    });

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            height={50}
            fontSize={14}
            stroke="#8898aa"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={14}
            stroke="#8898aa"
          />
          <Tooltip cursor={false} />

          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            strokeWidth={4}
            // animationBegin={1000}
            animationDuration={1000}
            animationEasing="ease-in"
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
