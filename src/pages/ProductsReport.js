import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Table } from "reactstrap";
import axios from "../api/axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const ProductsReport = () => {
  const userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const accessToken = userinfo.refreshToken;
  const id = userinfo.shop_id;

  const [data, setData] = useState([]);

  // FETCH PRODUCTS
  useEffect(() => {
    axios
      .post(
        "reports/products-report",
        { shop_id: id },
        { headers: { "auth-token": accessToken } }
      )
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <main className="main">
          <Toaster />
          <Header name="PRODUCTS REPORT" />
          <div className="table-responsive mt-3 mb-5 shadow mx-3 rounded">
            <div className="p-3">
              <div className="col-4">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search product name"
                />
              </div>
              <div className="col-4"></div>
            </div>
            <Table bgcolor="white" border>
              <thead className="bg-light text-secondary text-center text-uppercase small">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity sold</th>
                  <th>Total sales</th>
                  {/* <th></th> */}
                </tr>
              </thead>
              <tbody className="text-center">
                {data
                  .filter(({ name }) =>
                    name.toLowerCase() === ""
                      ? name.toLowerCase()
                      : name.includes(search.toLowerCase())
                  )
                  .map(
                    (
                      { name, image, selling_price, totalValue, quantity },
                      index
                    ) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>
                          <img
                            src={image}
                            alt=""
                            style={{
                              width: "5rem",
                              height: "3rem",
                              aspectRatio: "3 / 2",
                              objectFit: "contain",
                              mixBlendMode: "darken",
                              pointerEvents: "none",
                            }}
                          />
                        </td>
                        <td>{selling_price}</td>
                        <td>{quantity}</td>
                        <td>{totalValue}</td>
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

export default ProductsReport;
