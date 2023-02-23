import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import axios from "../api/axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const InventoryRecords = () => {
  const [data, setData] = useState([]);

  const userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const accessToken = userinfo.refreshToken;
  const id = userinfo.id;
  // FETCH PRODUCTS
  useEffect(() => {
    axios
      .post(
        "inventory/inventory-records",
        { product_id: sessionStorage.getItem("prodid") },
        { headers: { "auth-token": accessToken } }
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <main className="main">
          <Header name="INVENTORY RECORDS" />
          <div className="table-responsive mt-3 mb-5 shadow mx-3 rounded">
            <Table striped>
              <thead className="bg-light text-secondary text-center text-uppercase small">
                <th>#</th>
                <th>Date Modified</th>
                <th>Stock Added</th>
                <th>Current Stock</th>
              </thead>
              <tbody>
                {data.map(
                  ({ current_stock, stock_added, createdAt }, index) => (
                    <tr>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{`${new Date(
                        createdAt
                      ).getDate()}/${
                        new Date(createdAt).getMonth() + 1
                      }/${new Date(createdAt).getFullYear()}`}</td>
                      <td className="text-center">{stock_added}</td>
                      <td className="text-center">{current_stock}</td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InventoryRecords;
