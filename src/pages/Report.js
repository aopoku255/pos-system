import React, { useState } from "react";
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

const Report = () => {
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
  const id = userinfo.id;

  // Define a function to download the file
  const handleSaveReport = () => {
    axios({
      url: "reports",
      method: "POST",
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

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <main className="main">
          <Header name="SALES REPORT" />
          <div className="table-responsive mt-3 mb-5 shadow mx-3 rounded">
            <div className="d-flex justify-content-between align-items-center py-3 px-3">
              <div></div>
              <button
                className="btn btn-primary border-0  shadow text-uppercase"
                onClick={handleSaveReport}
              >
                <MdOutlinePictureAsPdf />
                EXPORT
              </button>
            </div>
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
                <tr>
                  <td className="py-4">1</td>
                  <td className="py-4">IN256894</td>
                  <td className="py-4">Banana</td>
                  <td className="py-4">100</td>
                  <td className="py-4">09/02/2023</td>
                </tr>
                <tr>
                  <td className="py-4">1</td>
                  <td className="py-4">IN256894</td>
                  <td className="py-4">Banana</td>
                  <td className="py-4">100</td>
                  <td className="py-4">09/02/2023</td>
                </tr>
                <tr>
                  <td className="py-4">1</td>
                  <td className="py-4">IN256894</td>
                  <td className="py-4">Banana</td>
                  <td className="py-4">100</td>
                  <td className="py-4">09/02/2023</td>
                </tr>
                <tr>
                  <td className="py-4">1</td>
                  <td className="py-4">IN256894</td>
                  <td className="py-4">Banana</td>
                  <td className="py-4">100</td>
                  <td className="py-4">09/02/2023</td>
                </tr>
                <tr>
                  <td className="py-4">1</td>
                  <td className="py-4">IN256894</td>
                  <td className="py-4">Banana</td>
                  <td className="py-4">100</td>
                  <td className="py-4">09/02/2023</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Report;
