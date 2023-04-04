import React, { useEffect, useRef, useState, PureComponent } from "react";
import ReactToPrint from "react-to-print";
import { Table } from "reactstrap";
import axios from "../api/axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const SalesReceipt = () => {
  const userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const accessToken = userinfo.refreshToken;
  const id = userinfo.shop_id;
  const shop_name = userinfo.shop_name;
  const usertype = userinfo.usertype;
  const staffname = userinfo.name;
  const componentRef = useRef();

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

  const {
    createdAt,
    invoice_number,
    grand_total,
    amount_paid,
    products_summary,
    grand_discount,
    customer_name,
  } = data;

  const year = new Date(createdAt).getFullYear();
  const month = new Date(createdAt).getMonth() + 1;
  const day = new Date(createdAt).getDate();

  const product = [];
  for (let item in products_summary) {
    product.push(products_summary[item]);
  }

  const dates = new Date();
  const days = date.getDate();
  const mons = date.getMonth();
  const years = date.getFullYear();

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <main className="main">
          <Header name="SALES RECEIPT" />
          <div className="receipt-container" ref={componentRef}>
            <div className="card border-0 shadow-sm receipt">
              <div className="mx-1 ">
                <div className="line">
                  <p className="mt-4 text-center">{shop_name}</p>
                </div>

                <hr className="mb-1" />
                <div className="">
                  <p className="small my-0">{/* <b>{shop_name}</b> */}</p>
                  <p className="my-1 small text-center">
                    <span className="">
                      Date: {year}-{month}-{day}
                    </span>
                  </p>
                  <p className="text-start  mb-1">
                    <span className="">Invoice No: {invoice_number}</span>
                  </p>
                  <p className="text-start small mb-1">
                    <span className="small">
                      Customer Name: {customer_name || "N/A"}
                    </span>
                  </p>
                  <p className="text-start small mb-1">
                    <span className="small">
                      Sales By: {staffname || "N/A"}
                    </span>
                  </p>
                  {/* <p className="text-start small">Sales By: {staffname}</p> */}
                </div>
                <div className="table-responsive">
                  <Table bordered className="my-3">
                    <thead>
                      <tr style={{ fontSize: "12px" }}>
                        <th>SL</th>
                        <th>It</th>
                        <th>Qty</th>
                        <th>Pri</th>
                        <th>Amt</th>
                        <th>Dis</th>
                      </tr>
                    </thead>

                    <tbody>
                      {product.map(
                        (
                          { name, quantity, discount, selling_price },
                          index
                        ) => (
                          <tr style={{ fontSize: "11px" }}>
                            <td className="">{index + 1}</td>
                            <td className="">{name}</td>
                            <td className="">{quantity}</td>
                            <td className="">{selling_price}</td>
                            <td className="">{selling_price * quantity - discount}</td>
                            <td className="">{discount}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </div>

                <div className="d-flex small justify-content-between">
                  {/* <div></div> */}
                  <div>
                    <div className="row">
                      <div className="col text-start text-nowrap">
                        <b className="small">Grand Total:</b>
                      </div>
                      <div className="col text-end">₵{grand_total}</div>
                    </div>
                    <div className="row">
                      <div className="col text-start text-nowrap">
                        <b className="small">Amount Paid:</b>
                      </div>
                      <div className="col text-end">₵{amount_paid}</div>
                    </div>
                    <div className="row">
                      <div className="col text-start text-nowrap">
                        <b className="small">Discount:</b>
                      </div>
                      <div className="col text-end">
                        ₵{grand_discount}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col text-start text-nowrap">
                        <b className="small">{amount_paid < grand_total - grand_discount ? "Customer Owes: " : "Balance: "}</b>
                      </div>
                      <div className="col text-end">
                        ₵{grand_total - amount_paid - grand_discount}
                      </div>
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
                <div
                  className="small pb-2 text-center"
                  style={{ fontSize: "5px" }}
                >
                  Contact as on or visit our website{" "}
                  <a href="http://www.tekdevisal.com" target="_blank">
                    http://www.tekdevisal.com/
                  </a>
                </div>
              </div>
            </div>
          </div>
          <ReactToPrint
            trigger={() => (
              <button
                className="btn btn-secondary btn-sm px-4 mt-3 mx-auto d-block"
                // onClick={handlePrint}
              >
                Print
              </button>
            )}
            content={() => componentRef.current}
            documentTitle={`invoice_${invoice_number}`}
          />
        </main>
      </div>
    </div>
  );
};

export default SalesReceipt;
