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
            <Header />
            <div className="container">
              <div className="cards_grid mt-5">
                <Card
                  name="Total Products"
                  amount="350,897"
                  percentage="3.48%"
                  icon={<HiDatabase size={20} />}
                  bgclass="card_icon"
                />
                <Card
                  name="Total Products"
                  amount="350,897"
                  percentage="3.48%"
                  icon={<BsPieChartFill size={20} />}
                  bgclass="card_icon2"
                />
                <Card
                  name="SALES"
                  amount="350,897"
                  percentage="3.48%"
                  icon={<BsClipboardData size={20} />}
                  bgclass="card_icon3"
                />
                <Card
                  name="Stocks"
                  amount="350,897"
                  percentage="3.48%"
                  icon={<MdDataUsage size={20} />}
                  bgclass="card_icon4"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-sm-8"
              style={{ width: "50rem", height: "50rem" }}
            >
              <Example />
            </div>
            <div className="col-sm-4"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
