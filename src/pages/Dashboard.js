import React from "react";
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

const Dashboard = () => {
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
              <div className="cards_grid mt-5">
                <Card
                  name="Total Revenue"
                  amount="350,897"
                  percentage="3.48%"
                  icon={<HiDatabase size={20} />}
                  bgclass="card_icon"
                  bgcolor="bgcolor_1"
                  iconcolor="#825ee4"
                />
                <Card
                  name="Total Products"
                  amount="350,897"
                  percentage="3.48%"
                  icon={<BsPieChartFill size={20} />}
                  bgclass="card_icon2"
                  bgcolor="bgcolor_2"
                  iconcolor="#2dcecc"
                />
                <Card
                  name="SALES"
                  amount="350,897"
                  percentage="3.48%"
                  icon={<BsClipboardData size={20} />}
                  bgclass="card_icon3"
                  bgcolor="bgcolor_3"
                  iconcolor="#fbb140"
                />
                <Card
                  name="Stocks"
                  amount="350,897"
                  percentage="3.48%"
                  icon={<MdDataUsage size={20} />}
                  bgclass="card_icon4"
                  bgcolor="bgcolor_4"
                  iconcolor="#f56036"
                />
              </div>
            </div>
          </div>
          <div
            className="card border-0 mx-auto  px-3 mb-5"
            style={{
              width: "calc(100% - 3rem)",
              height: "75%",
              backgroundColor: "#172b4d",
            }}
          >
            <div className="py-3">
              <h6 className="text-white mx-4" style={{ fontSize: "10px" }}>
                OVERVIEW
              </h6>
              <h3
                className="text-white mx-4"
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                SALES VALUE
              </h3>
            </div>
            <Example />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
