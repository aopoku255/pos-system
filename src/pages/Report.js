import React, { useEffect, useRef, useState } from "react";
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
import { MdDelete, MdOutlinePictureAsPdf } from "react-icons/md";
import { FcAddRow } from "react-icons/fc";
import { BsFillPrinterFill } from "react-icons/bs";
import axios from "../api/axios";
import ReactToPrint from "react-to-print";
import { Link } from "react-router-dom";

const Report = () => {
  const componentRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  // Add Table
  const handleAddTable = () => {
    setIsOpen(true);
  };

  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);

  const toggle = () => setModal(!modal);
  const changeUnmountOnClose = (e) => {
    let { value } = e.target;
    setUnmountOnClose(JSON.parse(value));
  };

  const userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const accessToken = userinfo.refreshToken;
  const id = userinfo.shop_id;

  // Define a function to download the file
  const handleSaveReport = () => {
    axios({
      url: "reports",
      method: "POST",
      data: { shop_id: id },
      responseType: "blob", // Set the response type to "blob" to receive binary data
      headers: { "auth-token": accessToken },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "table.pdf");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  const [data, setData] = useState([]);
  // FETCH PRODUCTS

  // FETCH PRODUCTS
  useEffect(() => {
    axios
      .post(
        "invoice",
        { shop_id: id },
        { headers: { "auth-token": accessToken } }
      )
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const date = new Date();
  const day = date.getDate();
  const mon = date.getMonth() + 1;
  const year = date.getFullYear();


  const [enteries, setEnteries] = useState(10);
  const handleEntryChange = (e) => {
    setEnteries(e.target.value);
  };

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <main className="main">
          <Header name="SALES REPORT" />
          <div className="table-responsive mt-3 mb-5 shadow mx-3 rounded">
          <div className="p-2">
          Showing{" "}
                <select name="" id=""  onChange={handleEntryChange}>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="500">500</option>
                  <option value="1000">1000</option>
                </select>{" "}
                Enteries
          </div>
            <div className="d-flex justify-content-between align-items-center py-3 px-3">
              <div>
              <Link to="/products-report"
                    className="btn btn-primary border-0  shadow text-uppercase"
                    // onClick={handleSaveReport}
                  >
                    {/* <MdOutlinePictureAsPdf /> */}
                    Prodcuts Report
                  </Link>
              </div>
              <ReactToPrint
                trigger={() => (
                  <button
                    className="btn btn-primary border-0  shadow text-uppercase"
                    // onClick={handleSaveReport}
                  >
                    <MdOutlinePictureAsPdf />
                    EXPORT
                  </button>
                )}
                content={() => componentRef.current}
                documentTitle={`report_${day}${mon}${year}`}
                bodyClass="bg-warning"
              />
            </div>
            <div ref={componentRef}>
              <Table bgcolor="white" border>
                <thead className="bg-light text-secondary text-center text-uppercase small">
                  <tr>
                    <th>#</th>
                    <th>Invoice No.</th>
                    <th>Customer Name</th>
                    <th>Total</th>
                    <th>Date</th>
                    {/* <th></th> */}
                  </tr>
                </thead>
                <tbody className="text-center">
                  {data.slice(0, enteries).map(
                    (
                      { customer_name, invoice_number, grand_total, createdAt },
                      index
                    ) => (
                      <tr>
                        <td className="py-4">{index + 1}</td>
                        <td className="py-4">{invoice_number}</td>
                        <td className="py-4">{customer_name || "N/A"}</td>
                        <td className="py-4">{grand_total}</td>
                        <td className="py-4">{`${new Date(
                          createdAt
                        ).getDate()}/${
                          new Date(createdAt).getMonth() + 1
                        }/${new Date(createdAt).getFullYear()}`}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Report;
