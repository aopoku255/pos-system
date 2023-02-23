import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import axios from "../api/axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const SalesReceipt = () => {
  const userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const accessToken = userinfo.refreshToken;
  const id = userinfo.id;
  const shop_name = userinfo.shop_name;
  const usertype = userinfo.usertype;

  const date = new Date();

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
        setData(res.data.data[sessionStorage.getItem("receiptIndex")]);
      })
      .catch((err) => console.log(err));
  }, []);

  const { createdAt, invoice_number, grand_total, products_summary } = data;

  const year = new Date(createdAt).getFullYear();
  const month = new Date(createdAt).getMonth() + 1;
  const day = new Date(createdAt).getDate();

  const product = [];
  for (let item in products_summary) {
    product.push(products_summary[item]);
  }

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <main className="main">
          <Header name="SALES RECEIPT" />
          <div className="receipt-container">
            <div className="card border-0 shadow-sm receipt">
              <div className="mx-4">
                <div className="line">
                  <p className="mt-4 text-center">{shop_name}</p>
                </div>

                <hr className="mb-1" />
                <div className="">
                  <p className="small my-0">{/* <b>{shop_name}</b> */}</p>
                  <p className="my-1 small text-center">
                    <span className="small">
                      Date: {year}-{month}-{day}
                    </span>
                  </p>
                  <p className="text-start small mb-1">
                    <span className="small">Invoice No: {invoice_number}</span>
                  </p>
                </div>
                <Table borderless responsive>
                  <tr style={{ fontSize: "10px" }}>
                    <th>SL</th>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Dis</th>
                    <th>Amount</th>
                  </tr>

                  {product.map(
                    ({ name, quantity, discount, selling_price }, index) => (
                      <tr style={{ fontSize: "11px" }}>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>{quantity}</td>
                        <td>{selling_price}</td>
                        <td>{discount}</td>
                        <td>{selling_price * quantity}</td>
                      </tr>
                    )
                  )}
                </Table>
                <hr />
                <p className="text-start small">Sales By: {usertype}</p>
                <div className="d-flex small justify-content-between">
                  <p className="">User</p>
                  <div>
                    <div className="row">
                      <div className="col text-start text-nowrap">Total:</div>
                      <div className="col text-end">₵{grand_total}</div>
                    </div>
                    {/* <div className="row">
                      <div className="col text-start text-nowrap">
                        Invoice Discount:
                      </div>
                      <div className="col text-end">₵0.0</div>
                    </div> */}
                    <div className="row">
                      <div className="col text-start text-nowrap">
                        <b className="small">Grand Total:</b>
                      </div>
                      <div className="col text-end">₵{grand_total}</div>
                    </div>
                    {/* <div className="row">
                      <div className="col text-start text-nowrap">
                        Paid Amount:
                      </div>
                      <div className="col text-end">₵0.00</div>
                    </div> */}
                  </div>
                </div>
                <hr className="mb-0" />
                {/* <Barcode value={barcode} height={30} marginTop={0} /> */}
                <div className="pb-4 mt-3 d-flex justify-content-center align-items-center">
                  <span
                    className="small deliverer-name"
                    style={{ fontSize: "10px" }}
                  >
                    Powered By:
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      color: "green",
                    }}
                  >
                    TekDevisal
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm px-4 mt-3 mx-auto d-block">Print</button>
        </main>
      </div>
    </div>
  );
};

export default SalesReceipt;
