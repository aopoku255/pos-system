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
import axios from "../api/axios";
import { toast, Toaster } from "react-hot-toast";

const Customers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
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

  const [data, setData] = useState([]);
  toast.dismiss();

  // FETCH PRODUCTS
  useEffect(() => {
    axios
      .post(
        "customer/fetch-customers",
        { shop_id: id },
        { headers: { "auth-token": accessToken } }
      )
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // ADD CUSTOMER
  const [details, setDetails] = useState({
    shop_id: id,
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const remove = toast.loading("Loading...");
    try {
      const res = await axios.post(
        "customer/add-new-customer",
        { ...details },
        { headers: { "auth-token": accessToken } }
      );
      console.log(res);
      if (res.data.message === "success") {
        toast.dismiss(remove);
        setTimeout(() => {
          setIsOpen(false);
        }, 1500);
        toast.success("Customer created successfully");
      }
      if (res.data.message === "Customer with same email already exists") {
        toast.dismiss();
        toast.error(res.data.message);
      }
    } catch (error) {}
  };
  const [itemid, setItemId] = useState("");
  const handleOpenDelete = (id) => {
    setIsOpenDelete(true);
    setItemId(id);
  };

  const handleDelete = async () => {
    const remove = toast.loading("Loading...");
    console.log(accessToken);
    try {
      const res = await axios.delete("customer/delete-customers", {
        data: { _id: itemid, store_id: id },
        headers: { "auth-token": accessToken },
      });
      if (res.data.message === "success") {
        toast.dismiss(remove);
        setTimeout(() => {
          setIsOpenDelete(false);
        }, 1500);
        toast.success("Customer deleted successfully");
      }
    } catch (error) {}
  };

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <main className="main">
          <Toaster />
          <Header name="CUSTOMERS" />
          <div className="table-responsive mt-3 mb-5 shadow mx-3 rounded">
            <div className="d-flex justify-content-between align-items-center py-3 px-3">
              <div></div>
              <button
                className="btn btn-primary border-0  shadow text-uppercase"
                onClick={handleAddTable}
              >
                Add Customer
              </button>
            </div>
            <Table border>
              <thead className="bg-light text-secondary  text-uppercase small ">
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Tel</th>
                  <th>Address</th>
                  <th>Craeted At</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="">
                {data.map(({ name, email, phone, address, createdAt, _id }) => (
                  <tr>
                    <td></td>
                    <td className="py-4">
                      <h6 className="mx-2 staff_name">{name}</h6>
                    </td>

                    <td className="py-4 text-secondary">{email}</td>
                    <td className="py-4 text-secondary">{phone}</td>
                    <td className="py-4 text-secondary">{address}</td>
                    <td className="py-4 text-secondary">{`${new Date(
                      createdAt
                    ).getDate()}/${
                      new Date(createdAt).getMonth() + 1
                    }/${new Date(createdAt).getFullYear()}`}</td>
                    <td className="py-4">
                      <div className="d-flex">
                        <FiEdit className="edit" id="edit" />
                        <UncontrolledTooltip target="edit">
                          Edit customer
                        </UncontrolledTooltip>
                        <MdDelete
                          className="delete"
                          id="delete"
                          onClick={() => handleOpenDelete(_id)}
                        />
                        <UncontrolledTooltip target="delete">
                          Delete customer
                        </UncontrolledTooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Modal isOpen={isOpen}>
              <ModalHeader
                toggle={() => setIsOpen(false)}
                className="text-secondary"
              >
                Add new customer
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Customer name</Label>
                    <Input
                      type="text"
                      name="name"
                      value={details.name}
                      required
                      onChange={handleChange}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="text"
                      name="email"
                      value={details.email}
                      required
                      onChange={handleChange}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Phone</Label>
                    <Input
                      type="text"
                      name="phone"
                      value={details.phone}
                      required
                      onChange={handleChange}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Address</Label>
                    <Input
                      type="text"
                      name="address"
                      value={details.address}
                      required
                      onChange={handleChange}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Region</Label>
                    <Input
                      type="text"
                      name="region"
                      value={details.region}
                      required
                      onChange={handleChange}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>City</Label>
                    <Input
                      type="text"
                      name="city"
                      value={details.city}
                      required
                      onChange={handleChange}
                    ></Input>
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <div></div>
                    <Button color="success">Save</Button>{" "}
                  </div>
                </form>
              </ModalBody>
            </Modal>
            <Modal isOpen={isOpenDelete} centered>
              <ModalBody>
                <h6 className="text-danger">Delete Product</h6>
                <p>Are you sure you want to delete this product</p>
                <div className="d-flex">
                  <button
                    className="btn btn-success"
                    onClick={() => setIsOpenDelete(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger mx-3"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </ModalBody>
            </Modal>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Customers;
