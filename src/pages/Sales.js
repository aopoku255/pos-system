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
import axios from "../api/axios";

const Sales = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Add Table
  const handleAddTable = () => {
    setIsOpen(true);
  };

  const userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const accessToken = userinfo.refreshToken;
  const id = userinfo.id;

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
  console.log(data);
  const [itemid, setItemId] = useState("");

  // const handleOpenDelete = (id) => {
  //   setIsOpenDelete(true);
  //   setItemId(id);
  // };

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <main className="main">
          <Header name="SALES" />
          <div className="table-responsive mt-3 mb-5 shadow mx-3 rounded">
            <div className="d-flex justify-content-between align-items-center py-3 px-3">
              <div></div>
            </div>
            <Table bgcolor="white" border>
              <thead className="bg-light text-secondary text-center text-uppercase small">
                <tr>
                  <th>#</th>
                  <th>Invoice No.</th>
                  <th>Customer Name</th>
                  <th>Payment Type</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data.map(
                  (
                    {
                      invoice_number,
                      customer_name,
                      image,
                      grand_total,
                      payment_type,
                      createdAt,
                    },
                    index
                  ) => (
                    <tr>
                      <td className="py-4">{index + 1}</td>
                      <td className="py-4">{invoice_number}</td>
                      <td className="py-4">
                        {customer_name === "" ? "N/A" : customer_name}
                      </td>
                      <td className="py-4">{payment_type}</td>
                      <td className="py-4">{grand_total}</td>
                      <td className="py-4">{`${new Date(createdAt).getDate()}/${
                        new Date(createdAt).getMonth() + 1
                      }/${new Date(createdAt).getFullYear()}`}</td>
                      <td className="py-4">
                        <div className="d-flex">
                          <AiFillEye className="edit" id="printer" />
                          <UncontrolledTooltip target="printer">
                            Print sales
                          </UncontrolledTooltip>
                          <MdDelete className="delete" id="delete" />
                          <UncontrolledTooltip target="delete">
                            Delete sales
                          </UncontrolledTooltip>
                        </div>
                      </td>
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

export default Sales;
