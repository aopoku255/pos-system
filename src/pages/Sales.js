import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
  Tooltip,
  UncontrolledTooltip,
} from "reactstrap";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FcAddRow } from "react-icons/fc";
import { AiFillEye } from "react-icons/ai";
import { IoReceiptOutline } from "react-icons/io5";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const Sales = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Add Table
  const handleAddTable = () => {
    setIsOpen(true);
  };

  const userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const accessToken = userinfo.refreshToken;
  const id = userinfo.shop_id;

  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);

  const toggle = () => setModal(!modal);
  const changeUnmountOnClose = (e) => {
    let { value } = e.target;
    setUnmountOnClose(JSON.parse(value));
  };

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
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(data);
  const [itemid, setItemId] = useState("");

  const handleDetails = (id) => {
    sessionStorage.setItem("detialsIndex", id);
  };
  const handleReceipt = (id) => {
    sessionStorage.setItem("receiptIndex", id);
  };

  const [phoneSearch, setPhoneSearch] = useState("");

  const [products, setProducts] = useState([]);

  // FETCH PRODUCTS
  useEffect(() => {
    axios
      .post(
        "product/fetch-product",
        { store_id: id },
        { headers: { "auth-token": accessToken } }
      )
      .then((res) => {
        // console.log(res);
        setProducts(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [enteries, setEnteries] = useState(10);
  const handleEntryChange = (e) => {
    setEnteries(e.target.value);
  };

  const tableData = data
    .filter(({ customer_name, phone, invoice_number }) =>
      customer_name.toLowerCase() === ""
        ? customer_name
        : customer_name.toLowerCase().includes(phoneSearch.toLowerCase()) ||
          phone.includes(phoneSearch) ||
          invoice_number.includes(phoneSearch)
    )
    .slice(0, enteries)
    .map(
      (
        {
          invoice_number,
          customer_name,
          image,
          grand_total,
          amount_paid,
          payment_type,
          createdAt,
          phone,
          grand_discount,
          _id,
        },
        index
      ) => {
        return (
          <tr key={_id}>
            <td className="py-4">{index + 1}</td>
            <td className="py-4">{invoice_number}</td>
            <td className="py-4">
              {customer_name === "" ? "N/A" : customer_name}
            </td>
            <td className="py-4">{phone || "N/A"}</td>
            <td className="py-4">{payment_type}</td>
            <td className="py-4">{grand_total}</td>
            <td className="py-4">{amount_paid || 0}</td>
            <td className="py-4">{grand_discount || 0}</td>
            <td
              className={
                amount_paid < grand_total - grand_discount
                  ? "py-4 bg-danger text-white"
                  : "py-4 bg-success"
              }
            >
              {grand_total - amount_paid - grand_discount || 0}
            </td>
            <td className="py-4">{`${new Date(createdAt).getDate()}/${
              new Date(createdAt).getMonth() + 1
            }/${new Date(createdAt).getFullYear()}`}</td>
            <td className="py-4">
              <div className="d-flex align-items-center">
                <Link to="/sales-receipt" onClick={() => handleReceipt(index)}>
                  <IoReceiptOutline className="edit" id="receipt" />
                  <UncontrolledTooltip target="receipt">
                    Receipt
                  </UncontrolledTooltip>
                </Link>
                <Link to="/sales-details" onClick={() => handleDetails(index)}>
                  <AiFillEye className="edit" id="eye" />
                  <UncontrolledTooltip target="eye">
                    Sales details
                  </UncontrolledTooltip>
                </Link>
                {/* <MdDelete className="delete" id="delete" />
          <UncontrolledTooltip target="delete">
            Delete sales
          </UncontrolledTooltip> */}
              </div>
            </td>
          </tr>
        );
      }
    );

  let total = 0;

  if (phoneSearch) {
    const filtered = data.filter(({ customer_name, phone, invoice_number }) =>
      customer_name.toLowerCase() === ""
        ? customer_name
        : customer_name.toLowerCase().includes(phoneSearch.toLowerCase()) ||
          phone.includes(phoneSearch) ||
          invoice_number.includes(phoneSearch)
    );
    filtered.map(({ grand_total }) => (total += grand_total));
  }

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <main className="main">
          <Header name="SALES" />
          <div className="table-responsive mt-3 mb-5 shadow mx-3 rounded">
            <div className="d-flex mx-3 p-3">
              <input
                type="text"
                className="form-control mx-3"
                placeholder="filter by customer name"
                onChange={(e) => setPhoneSearch(e.target.value)}
              />
              <input
                type="text"
                className="form-control mx-3"
                placeholder="Customer sales total"
                // disabled
                value={phoneSearch ? total : "Customer sales total"}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center py-1 px-3">
              <div>
                Showing{" "}
                <select name="" id="" onChange={handleEntryChange}>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="500">500</option>
                  <option value="1000">1000</option>
                </select>{" "}
                Enteries
              </div>
            </div>
            <Table bgcolor="white" border>
              <thead className="bg-light text-secondary text-center text-uppercase small">
                <tr>
                  <th className="text-nowrap">#</th>
                  <th className="text-nowrap">Invoice No.</th>
                  <th className="text-nowrap">Customer Name</th>
                  <th className="text-nowrap">Phone</th>
                  <th className="text-nowrap">Payment Type</th>
                  <th className="text-nowrap">Total</th>
                  <th className="text-nowrap">Amount paid</th>
                  <th className="text-nowrap">Total Discount</th>
                  <th className="text-nowrap">Balance</th>
                  <th className="text-nowrap">Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-center">{tableData}</tbody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sales;
