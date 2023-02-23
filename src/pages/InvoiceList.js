import React, { useEffect, useState } from "react";
import { Col, Form, FormGroup, Input, Label, Table } from "reactstrap";
import axios from "../api/axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const InvoiceList = () => {
  const userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const accessToken = userinfo.refreshToken;
  const id = userinfo.id;

  const [data, setData] = useState([]);

  // FETCH PRODUCTS
  useEffect(() => {
    axios
      .post(
        "invoice",
        { shop_id: id },
        { headers: { "auth-token": accessToken } }
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data.data[sessionStorage.getItem("detialsIndex")]);
      })
      .catch((err) => console.log(err));
  }, []);

  const { invoice_number, customer_name, payment_type, products_summary } =
    data;

  const product = [];
  for (let item in products_summary) {
    product.push(products_summary[item]);
  }

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <main className="main">
          <Header name="SALES DETAILS" />
          <div className="mx-3">
            <p>Customer Name: {customer_name || "N/A"}</p>
            <p>Invoice Number: {invoice_number}</p>
            <p>Payment Type: {payment_type}</p>
          </div>
          <div className="table-responsive mt-3 mb-5 shadow mx-3 rounded">
            <Table borderless>
              <thead className="bg-light text-secondary text-center text-uppercase small">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Discount</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {product.map(
                  (
                    { image, name, selling_price, quantity, discount },
                    index
                  ) => (
                    <tr>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{name}</td>
                      <td className="text-center">
                        {" "}
                        {image === "image_url" ? (
                          <p>N/A</p>
                        ) : (
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
                        )}
                      </td>
                      <td className="text-center">{selling_price}</td>
                      <td className="text-center">{quantity}</td>
                      <td className="text-center">{discount}</td>
                      <td className="text-center">{selling_price * quantity}</td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </div>
        </main>
      </div>
      ;
    </div>
  );
};

export default InvoiceList;
