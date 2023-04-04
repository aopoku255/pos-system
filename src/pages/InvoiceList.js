import React, { useEffect, useState } from "react";
import {
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Table,
} from "reactstrap";
import axios from "../api/axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Toaster, toast } from "react-hot-toast";

const InvoiceList = () => {
  const userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const accessToken = userinfo.refreshToken;
  const id = userinfo.shop_id;

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

  const {
    invoice_number,
    customer_name,
    payment_type,
    products_summary,
    amount_paid,
    grand_discount,
    grand_total,
  } = data;

  const product = [];
  for (let item in products_summary) {
    product.push(products_summary[item]);
  }

  const [invoiceDetails, setInvoiceDetails] = useState({
    amount_paid: "",
    customer_name: "",
    phone: "",
    customer_balance: "",
    payment_type: "cash",
    grand_total: "",
    grand_discount: "",
    amount_paid: 0,
    discount: 0,
    shop_id: id,
  });

  const handleInvoiceChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInvoiceDetails({ ...invoiceDetails, [name]: value });
  };

  // CALCULATE SUM
  let sum = 0;
  const handleTotal = (e) => {
    e.preventDefault();
    // setIsFocused(false);

    setInvoiceDetails({ ...invoiceDetails, grand_total: sum });
    invoiceDetails.customer_balance =
      invoiceDetails.grand_total - invoiceDetails.amount_paid;
  };

  const handlePostInvoice = (e) => {
    e.preventDefault();
    const myPromise = axios.post(
      "invoice/update-invoice",
      {
        invoice_number: invoice_number,
        payment_type: invoiceDetails.payment_type,
        amount_paid: invoiceDetails.amount_paid,
      },
      { headers: { "auth-token": accessToken } }
    );
    toast.promise(myPromise, {
      loading: "Loading...",
      success: "Invoice updated successfully",
      error: "An error occured",
    });
  };

  return (
    <div>
      <div className="d-flex">
        <Toaster />
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
                      <td className="text-center">
                        {selling_price * quantity - discount}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </div>

          {/*  */}

          <div className="container">
            {amount_paid < grand_total - grand_discount && (
              <div className="d-flex justify-content-between align-items-center">
                <div></div>
                <div>
                  <form>
                    <InputGroup className="mb-4">
                      <InputGroupText className="" style={{ width: "12rem" }}>
                        Total discount
                      </InputGroupText>
                      <Input
                        type="text"
                        name="discount"
                        value={Number(grand_discount)}
                        disabled
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupText style={{ width: "12rem" }}>
                        Total
                      </InputGroupText>
                      <Input
                        type="text"
                        name="total"
                        value={grand_total}
                        disabled
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupText style={{ width: "12rem" }}>
                        Grand Total
                      </InputGroupText>
                      <Input
                        type="text"
                        name="grand_total"
                        value={grand_total - grand_discount}
                        disabled
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupText style={{ width: "12rem" }}>
                        Amount paid
                      </InputGroupText>
                      <Input
                        type="text"
                        name="amount_paid"
                        value={invoiceDetails.amount_paid}
                        onChange={handleInvoiceChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupText style={{ width: "12rem" }}>
                        {invoiceDetails.customer_balance <= 0
                          ? "Customer balance"
                          : "Customer Owes"}
                      </InputGroupText>
                      <Input
                        type="text"
                        name="customer_balance"
                        value={
                          (invoiceDetails.customer_balance =
                            grand_total -
                            grand_discount -
                            invoiceDetails.amount_paid)
                        }
                        onChange={handleInvoiceChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupText style={{ width: "12rem" }}>
                        Payment method
                      </InputGroupText>
                      <Input
                        type="select"
                        name="payment_type"
                        value={invoiceDetails.payment_type}
                        onChange={handleInvoiceChange}
                        required={invoiceDetails.payment_type == "Credit"}
                      >
                        <option value="cash">Cash</option>
                        <option value="bank">Bank</option>
                        <option value="credit">Credit</option>
                      </Input>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupText style={{ width: "12rem" }}>
                        Customer name
                      </InputGroupText>
                      <Input
                        type="text"
                        name="customer_name"
                        value={invoiceDetails.customer_name}
                        onChange={handleInvoiceChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupText style={{ width: "12rem" }}>
                        Customer Phone
                      </InputGroupText>
                      <Input
                        type="text"
                        name="phone"
                        value={invoiceDetails.phone}
                        onChange={handleInvoiceChange}
                      />
                    </InputGroup>
                    <div className="d-flex mb-5">
                      <button
                        className="btn btn-success px-5 mx-2"
                        onClick={handlePostInvoice}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      ;
    </div>
  );
};

export default InvoiceList;
