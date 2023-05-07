import React, { useEffect, useState } from "react";
import {
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { MdDelete } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import InvoiceCard from "../components/InvoiceCard";
import banana from "../assets/png/banana.png";
import axios from "../api/axios";
import { toast, Toaster } from "react-hot-toast";

const Invoice = () => {
  const userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const accessToken = userinfo.refreshToken;
  const id = userinfo.shop_id;
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [totalStock, setTotalStock] = useState(1);
  const [selectedTable, setSelectedTable] = useState([]);

  // HANDLECHANGE
  const handleChange = (e, itemId) => {
    const name = e.target.name;
    const value = e.target.value;
    setSelectedTable((prevSelectedTable) =>
      prevSelectedTable.map((item) => {
        if (item._id == itemId) {
          const total = item.quantity * item.selling_price - value;
          return {
            ...item,
            [name]: value,
            total: total < 0 ? 0 : total, // Ensure total is not negative
          };
        }
        return item;
      })
    );
  };

  // HandleCheck

  const handleCheck = (e, id, index) => {
    const value = e.target.checked;
    if (!value) {
      setSelectedTable(selectedTable.filter(({ _id }, i) => _id !== id));
    } else {
      setSelectedTable([
        ...selectedTable,
        ...data.filter(({ _id }) => _id === id),
      ]);
    }
  };

  // ADD TO TABLE
  const [tables, setTables] = useState([]);
  const handleAddTable = () => {
    if (selectedTable.length !== 0) {
      selectedTable.forEach((table) => {
        if (!tables.find((t) => t.name === table.name)) {
          tables.push({
            ...table,
            quantity: table.total_stock || 1,
            discount: table.discount,
          });
        }
      });

      setSelectedTable([]);
    }
  };

  // FETCH PRODUCTS
  useEffect(() => {
    axios
      .post(
        "product/fetch-product",
        { store_id: id },
        { headers: { "auth-token": accessToken } }
      )
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [invoiceDetails, setInvoiceDetails] = useState({
    amount_paid: "",
    customer_name: "",
    phone: "",
    total: "",
    customer_balance: "",
    payment_type: "cash",
    grand_total: "",
    amount_paid: 0,
    discount: "",
    shop_id: id,
    grand_discount: "",
    product_summary: [],
  });

  const handleRemove = (id) => {
    setTables(tables.filter(({ _id }) => _id !== id));
  };

  useEffect(() => {
    const customer_info = sessionStorage.getItem("customer_info");
    const customer = JSON.parse(customer_info);
    setInvoiceDetails({
      ...invoiceDetails,
      customer_name: customer?.name,
      phone: customer?.phone,
    });
  }, []);

  const handleInvoiceChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInvoiceDetails({ ...invoiceDetails, [name]: value });
  };

  // CALCULATE SUM
  let sum = 0;
  let total_discount = 0;
  const handleTotal = (e) => {
    e.preventDefault();
    // setIsFocused(false);
    tables.forEach(({ quantity, selling_price, discount }) => {
      sum += quantity * selling_price;
      total_discount += Number(discount);
    });
    setInvoiceDetails({
      ...invoiceDetails,
      grand_total: sum,
      grand_discount: total_discount,
    });
    invoiceDetails.customer_balance =
      invoiceDetails.grand_total - invoiceDetails.amount_paid;
  };

  const [require, setRequired] = useState(false);

  const handlePostInvoice = (e) => {
    e.preventDefault();
    // console
    if (invoiceDetails.grand_total == "" || invoiceDetails.grand_total < 1) {
      toast.error("Please select an item and compute");
    } else if (invoiceDetails.payment_type == "Credit") {
      toast.error("Provide creditor name");
    } else {
      // console.log(invoiceDetails);
      axios
        .post(
          "invoice/add-invoice",
          {
            shop_id: id,
            customer_name: invoiceDetails.customer_name,
            phone: invoiceDetails.phone,
            grand_total: invoiceDetails.grand_total,
            grand_discount: invoiceDetails.grand_discount,
            payment_type: invoiceDetails.payment_type,
            amount_paid: invoiceDetails.amount_paid,
            products_summary: tables.map(
              ({ _id, name, image, quantity, discount, selling_price }) => {
                return {
                  product_id: _id,
                  name: name,
                  image: image,
                  quantity: quantity,
                  discount: discount,
                  selling_price: selling_price,
                };
              }
            ),
          },
          { headers: { "auth-token": accessToken } }
        )
        .then((res) => {
          if (res.data.message === "success") {
            toast.success(res.data.message);
            setTables([]);
            invoiceDetails.grand_total = "";
            invoiceDetails.discount = "";
            invoiceDetails.amount_paid = 0;
            window.location.reload(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <main className="main">
          <Toaster />
          <Header name="INVOICE POS" />
          <div className="mt-5">
            <div className="container">
              <Row>
                <Col md={3}>
                  <InputGroup>
                    <InputGroupText>
                      <BsSearch />
                    </InputGroupText>
                    <Input
                      type="search"
                      placeholder="search..."
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <div className="invoice_grid mt-5">
                {data
                  ?.filter(({ name }) => {
                    return name.toLowerCase() === ""
                      ? name.toLowerCase()
                      : name.toLowerCase().includes(searchText.toLowerCase());
                  })
                  .map(({ name, selling_price, total_stock, image, _id }) => (
                    <InvoiceCard
                      key={_id}
                      product_name={name}
                      price={selling_price}
                      stock={total_stock}
                      product_img={image}
                      handleChange={(e) => handleCheck(e, _id)}
                    />
                  ))}
              </div>
              <div className="table-responsive my-5">
                <button
                  className="btn btn-primary mb-3"
                  onClick={handleAddTable}
                >
                  Add Table
                </button>
                <Table bordered>
                  <thead className="bg-light text-secondary text-center text-uppercase small">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Discount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTable?.map(
                      (
                        { name, selling_price, discount, total_stock, _id },
                        index
                      ) => (
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">
                            <Input type="text" value={name} />
                          </td>
                          <td className="text-center">
                            <Input
                              type="text"
                              name="selling_price"
                              value={selling_price}
                              onChange={(e) => handleChange(e, _id)}
                            />
                          </td>
                          <td className="text-center">
                            <Input
                              type="number"
                              name="total_stock"
                              min={1}
                              value={total_stock}
                              onChange={(e) => handleChange(e, _id)}
                            />
                          </td>
                          <td className="text-center">
                            <Input
                              type="text"
                              value={total_stock * selling_price - discount}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="discount"
                              className="form-control"
                              value={discount}
                              onChange={(e) => handleChange(e, _id)}
                            />
                          </td>
                          <td></td>
                        </tr>
                      )
                    )}
                    {tables.map(
                      (
                        {
                          name,
                          selling_price,
                          discount,
                          total_stock,
                          _id,
                          quantity,
                        },
                        index
                      ) => (
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">
                            <Input type="text" value={name} disabled />
                          </td>
                          <td className="text-center">
                            <Input type="text" value={selling_price} disabled />
                          </td>
                          <td className="text-center">
                            <Input
                              type="number"
                              name="total_stock"
                              min={1}
                              value={quantity}
                              disabled
                            />
                          </td>
                          <td className="text-center">
                            <Input
                              type="text"
                              value={
                                quantity == ""
                                  ? selling_price - discount
                                  : quantity * selling_price - discount
                              }
                              disabled
                            />
                          </td>
                          <td>{discount}</td>
                          <td>
                            <MdDelete
                              className="delete"
                              id="delete"
                              onClick={() => handleRemove(_id)}
                            />
                            <UncontrolledTooltip target="delete">
                              Delete
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              </div>
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
                        value={Number(invoiceDetails.grand_discount)}
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
                        value={invoiceDetails.grand_total}
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
                        value={
                          invoiceDetails.grand_total -
                          invoiceDetails.grand_discount
                        }
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
                            invoiceDetails.grand_total -
                            invoiceDetails.grand_discount -
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
                        className="btn btn-primary px-4"
                        type="button"
                        onClick={handleTotal}
                        // disabled={invoiceDetails.grand_total < 1}
                      >
                        Calculate
                      </button>
                      <button
                        className="btn btn-success px-5 mx-2"
                        onClick={handlePostInvoice}
                        disabled={!invoiceDetails.grand_total}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Invoice;
