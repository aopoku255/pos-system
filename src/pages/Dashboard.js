import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { ImArrowUp2 } from "react-icons/im";
import { HiDatabase } from "react-icons/hi";
import { BsPieChartFill, BsClipboardData } from "react-icons/bs";
import { TbChartInfographic } from "react-icons/tb";
import { MdDataUsage } from "react-icons/md";

import Card from "../components/Card";
import LineChart from "../components/LineChart";
import Example from "../components/LineChart";
import Barchart from "../components/Barchart";
import axios from "../api/axios";

const Dashboard = () => {
  const userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const accessToken = userinfo.refreshToken;
  const id = userinfo.id;

  // SALES TODAY
  const [salesToday, setSalesToday] = useState({});
  const [value, setValue] = useState(0);
  useEffect(() => {
    axios
      .post(
        "sales/sales-today",
        { shop_id: id },
        { headers: { "auth-token": accessToken } }
      )
      .then((res) => {
        setSalesToday({ ...res.data.data });
        setValue(Number(value));
      })
      .catch((err) => console.log(err));
  }, []);

  // SALES TODAY
  const [salesMonth, setSalesMonth] = useState({});
  useEffect(() => {
    axios
      .post(
        "sales/sales-current-month",
        { shop_id: id },
        { headers: { "auth-token": accessToken } }
      )
      .then((res) => setSalesMonth({ ...res.data.data }))
      .catch((err) => console.log(err));
  }, []);

  // SALES TODAY
  const [totalRev, setTotalRev] = useState(0);
  useEffect(() => {
    axios
      .post(
        "sales/total-sales",
        { shop_id: id },
        { headers: { "auth-token": accessToken } }
      )
      .then((res) => setTotalRev(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // TOTAL PRODUCTS
  const [data, setData] = useState(0);

  // FETCH PRODUCTS
  useEffect(() => {
    axios
      .post(
        "product/fetch-product",
        { store_id: id },
        { headers: { "auth-token": accessToken } }
      )
      .then((res) => setData(res.data.data.length))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="d-flex">
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN PAGE */}
        <main className="main">
          {/* Header */}
          <div className="card_container">
            <Header name="DASHBOARD" />
            <div className="container">
              <div className="cards_grid mt-3">
                <Card
                  name="SALES TODAY"
                  amount={salesToday.sale}
                  percentage={`${value}% `}
                  icon={<MdDataUsage size={20} />}
                  bgclass="card_icon"
                  bgcolor="bgcolor_1"
                  iconcolor="#825ee4"
                  since="Since last yesterday"
                />
                <Card
                  name="SALES THIS MONTH"
                  amount={salesMonth.sale}
                  percentage="3.48%"
                  icon={<BsPieChartFill size={20} />}
                  bgclass="card_icon2"
                  bgcolor="bgcolor_2"
                  iconcolor="#2dcecc"
                />
                <Card
                  name="TOTAL REVENUE"
                  amount={totalRev}
                  percentage="3.48%"
                  icon={<BsClipboardData size={20} />}
                  bgclass="card_icon3"
                  bgcolor="bgcolor_3"
                  iconcolor="#fbb140"
                />
                <Card
                  name="TOTAL PRODUCT"
                  amount={data}
                  icon={<HiDatabase size={20} />}
                  percentage="3.48%"
                  bgclass="card_icon4"
                  bgcolor="bgcolor_4"
                  iconcolor="#f56036"
                />
              </div>
              <div className="d-flex justify-content-center align-items-center my-5">
                <div
                  className="card border-0 col-md-8 mx-auto"
                  style={{
                    backgroundColor: "#172b4d",
                    height: "70vh",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="py-3">
                      <h6
                        className="text-white mx-4"
                        style={{ fontSize: "10px" }}
                      >
                        OVERVIEW
                      </h6>
                      <h3
                        className="text-white mx-4"
                        style={{ fontSize: "14px", fontWeight: "bold" }}
                      >
                        SALES VALUE
                      </h3>
                    </div>
                    <div className="py-3">
                      <h6
                        className="text-white mx-4"
                        style={{ fontSize: "10px" }}
                      >
                        {salesMonth.name}
                      </h6>
                      <h3
                        className="text-white mx-4"
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                      >
                        GH₵{salesMonth.sale}
                      </h3>
                    </div>
                  </div>
                  <hr className="my-0 pb-4" />
                  <Example />
                </div>
                <div
                  className="col-md-4 card border-0 shadow mx-3"
                  style={{
                    backgroundColor: "#fff",
                    height: "70vh",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="py-3">
                      <h6
                        className="mx-4"
                        style={{ fontSize: "10px", color: "#8898aa" }}
                      >
                        PERFOMANCE
                      </h6>
                      <h3
                        className="mx-4"
                        style={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          color: "#32325d",
                        }}
                      >
                        DAILY SALES
                      </h3>
                    </div>
                    <div className="py-3">
                      <h6
                        className="mx-4"
                        style={{ fontSize: "10px", color: "#8898aa" }}
                      >
                        {salesToday.name}
                      </h6>
                      <h3
                        className="mx-4"
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "#32325d",
                        }}
                      >
                        GH₵{salesToday.sale}
                      </h3>
                    </div>
                  </div>
                  <hr className="text-secondary my-0 pb-4" />
                  <Barchart />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
