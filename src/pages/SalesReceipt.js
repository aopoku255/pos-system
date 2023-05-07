import React, { useEffect, useRef, useState, PureComponent } from "react";
import ReactToPrint from "react-to-print";
import { Table } from "reactstrap";
import axios from "../api/axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import logo from "../assets/jpg/logo.jpg";

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
    phone,
    payment_type,
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
          <div ref={componentRef}>
            <div className="receipt-container mx-auto">
              <div className="d-flex justify-content-between invoice_receipt px-3">
                <div className="">
                  <h3 className="mb-1">{shop_name}</h3>
                  <p className="mb-1">P.O BOX KS 6497 kumasi, Adum</p>
                  <p className="mb-1">kmoh43@gmail.com</p>
                  <p>0545098438</p>
                </div>
                <div className="invoice_logo">
                  <h1 className="">INVOICE</h1>
                  <div className="invoice_logo_card">
                    <img
                      src={logo}
                      alt=""
                      className="img-fluid mx-auto d-block"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center invoice_receipt px-3 my-4">
              <div className="bill_to">
                <h6 className="text-decoration-underline">BILL TO</h6>
                <p className="mb-1">{customer_name}</p>
                <p>{phone}</p>
              </div>
              <div className="bill_to">
                <h6 className="text-decoration-underline">ISSUES BY</h6>
                <p className="mb-1">{staffname}</p>
                <p>
                  <b>Position: </b>
                  {usertype.toString().toUpperCase()}
                </p>
              </div>
              <div className="invoice details">
                <h6 className="text-decoration-underline"></h6>
                <p className="mb-0">
                  <b>Invoice No.: </b>
                  {invoice_number}
                </p>
                <p className="mb-0">
                  <b>Invoice Date: </b>
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    dateStyle: "medium",
                  })}{" "}
                  {new Date(createdAt).toLocaleTimeString("en-US", {})}
                </p>
              </div>
            </div>
            <div className="px-3">
              <Table bordered className="my-3">
                <thead>
                  <tr style={{ fontSize: "12px" }}>
                    <th>SL</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Amount</th>
                    <th>Discount</th>
                  </tr>
                </thead>

                <tbody>
                  {product.map(
                    ({ name, quantity, discount, selling_price }, index) => (
                      <tr style={{ fontSize: "11px" }}>
                        <td className="">{index + 1}</td>
                        <td className="">{name}</td>
                        <td className="">{quantity}</td>
                        <td className="">{selling_price}</td>
                        <td className="">
                          {selling_price * quantity - discount}
                        </td>
                        <td className="">{discount}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </div>

            <div className="d-flex justify-content-between align-items-center invoice_receipt px-3">
              <div>
                <p>Thank you for your business</p>
              </div>
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
                  <div className="col text-end">₵{grand_discount}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col text-start text-nowrap">
                    <b className="small">
                      {amount_paid < grand_total - grand_discount
                        ? "Customer Owes: "
                        : "Balance: "}
                    </b>
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

            <div className="px-3 my-4">
              <h6>
                <b>Terms & Instructions</b>
              </h6>
              <hr className="w-25" />
              <p className="mx-3">Payment via {payment_type}</p>
              <textarea
                type="text"
                name=""
                id=""
                className="form-control border-0 "
                placeholder="Note: "
              />
            </div>
          </div>
          <ReactToPrint
            trigger={() => (
              <button
                className="btn btn-secondary btn-sm px-4 mt-3 mx-auto d-block mb-5"
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
