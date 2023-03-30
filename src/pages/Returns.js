import React, { useEffect, useState } from "react";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  Tooltip,
  UncontrolledTooltip,
} from "reactstrap";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FcAddRow } from "react-icons/fc";
import axios from "../api/axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InvoiceCard from "../components/InvoiceCard";

const Returns = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReturn, setIsOpenReturn] = useState(false);
  const [newData, setNewData] = useState([]);
  // Add Table
  const handleAddTable = () => {
    setIsOpen(true);
  };

  const navigate = useNavigate();
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

  // FETCH PRODUCTS
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post(
        "return",
        { shop_id: id },
        { headers: { "auth-token": accessToken } }
      )
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const [invoiceNum, setInvoiceNum] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "return/add-return",
      { invoice_number: invoiceNum, shop_id: id },
      { headers: { "auth-token": accessToken } }
    );
    console.log(res);
    if (res.data.status === "failed") {
      toast.error(res.data.message);
      setTimeout(() => {
        setIsOpen(false);
      }, 1500);
    } else {
      toast.success(res.data.message);
      setTimeout(() => {
        setIsOpen(false);
        // navigate("/returns/return-details");
        // sessionStorage.setItem("returns", JSON.parse(res.data));
        setIsOpenReturn(true);
        setNewData(res.data.data);
        window.location.reload(true);
        // const {products_summary} = newData[0]
      }, 1500);
    }
  };

  // console.log(newData)

  // const product = [];
  // for (let item in products_summary) {
  //   product.push(products_summary[item]);
  // }

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <main className="main">
          <Toaster />
          <Header name="RETURNS" />
          <div className="table-responsive mt-3 mb-5 shadow mx-3 rounded">
            <div className="d-flex justify-content-between align-items-center py-3 px-3">
              <div></div>
              <button
                className="btn btn-primary border-0  shadow text-uppercase"
                onClick={handleAddTable}
              >
                Add Return
              </button>
            </div>
            <Table bgcolor="white" border>
              <thead className="bg-light text-secondary text-center text-uppercase small">
                <tr>
                  <th>#</th>
                  <th>Invoice No.</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data.map(({ invoice_number, createdAt }, index) => (
                  <tr>
                    <td className="py-4">{index + 1}</td>
                    <td className="py-4">{invoice_number}</td>
                    <td className="py-4">
                      {" "}
                      {`${new Date(createdAt).getDate()}/${
                        new Date(createdAt).getMonth() + 1
                      }/${new Date(createdAt).getFullYear()}`}
                    </td>
                    <td className="py-4">
                      <div className="d-flex">
                        {/* <BsFillPrinterFill className="edit" id="printer" />
                    <UncontrolledTooltip target="printer">
                      Edit product
                    </UncontrolledTooltip> */}
                        <MdDelete className="delete" id="delete" />
                        <UncontrolledTooltip target="delete">
                          Delete product
                        </UncontrolledTooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Modal isOpen={isOpen} centered>
              <ModalHeader
                toggle={() => setIsOpen(false)}
                className="small text-secondary"
              >
                Add Product Information
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Invoice number</Label>
                    <Input
                      type="text"
                      placeholder="IN2564895"
                      required
                      onChange={(e) => setInvoiceNum(e.target.value)}
                    />
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <div></div>
                    <Button color="success">Done</Button>{" "}
                  </div>
                </form>
              </ModalBody>
            </Modal>
            <div>
              <Modal isOpen={false} fullscreen>
                <ModalHeader toggle={() => setIsOpenReturn(false)}>
                  Returns
                </ModalHeader>
                <ModalBody>
                  <Table borderless>
                    <thead className="bg-light text-secondary text-center text-uppercase small">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>quantity</th>
                        <th>selling price</th>
                        <th>Returning</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {
                        product.map(({name, image, quantity, selling_price}, index) => <tr key={index+1}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{name}</td>
                        <td className="text-center">
                          <img src={Image} alt="" />
                        </td>
                        <td className="text-center">{quantity}</td>
                        <td className="text-center">{selling_price}</td>
                        <td className="text-center mx-auto d-block d-flex justify-content-center align-items-center">
                          <input
                            type="number"
                            
                            placeholder="Qunatity returned"
                            className="form-control w-25"
                          />
                        </td>
                      </tr>)
                      } */}
                    </tbody>
                  </Table>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggle}>
                    Do Something
                  </Button>{" "}
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Returns;
