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
import profile from "../assets/png/staff.jpeg";
import { toast, Toaster } from "react-hot-toast";
import axios from "../api/axios";

const Staff = () => {
  const userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const accessToken = userinfo.refreshToken;
  const id = userinfo.shop_id;
  const shop_name = userinfo.shop_name;

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

  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    usertype: "staff",
    shop_id: id,
    shop_name: shop_name,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const remove = toast.loading("Loading...");
    const formData = new FormData();
    // formData.append("store_id", details.store_id);

    try {
      const res = await axios.post(
        "staff/add-new-staff",
        { ...details },
        {
          headers: { "auth-token": accessToken },
        }
      );
      console.log(res);
      if (res.data.message === "success") {
        toast.dismiss(remove);
        setTimeout(() => {
          setIsOpen(false);
        }, 1500);
        toast.success("Staff");
        window.location.reload(true);
      }
    } catch (error) {
      toast.error("An error occured");
      toast.dismiss(remove);
    }
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post(
        "staff/fetch-staff",
        { shop_id: id },
        { headers: { "auth-token": accessToken } }
      )
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <main className="main">
          <Header name="STAFF" />
          <Toaster />
          <div className="table-responsive mt-3 mb-5 shadow mx-3 rounded">
            <div className="d-flex justify-content-between align-items-center py-3 px-3">
              <div></div>
              <button
                className="btn btn-primary border-0  shadow text-uppercase"
                onClick={handleAddTable}
              >
                Add Staff
              </button>
            </div>
            <Table bgcolor="white" border>
              <thead className="bg-light text-secondary  text-uppercase small ">
                <tr>
                  <th></th>
                  <th>Staff</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  {/* <th>Store Branch</th> */}
                  <th></th>
                </tr>
              </thead>
              <tbody className="">
                {data.map(({ name, email, phone, status }) => (
                  <tr>
                    <td></td>
                    <td className="py-4">
                      <div className="d-flex  align-items-center ">
                        <div className="staff_img rounded-circle">
                          <img
                            src={profile}
                            alt=""
                            className="img-fluid rounded-circle"
                            style={{ pointerEvents: "none" }}
                          />
                        </div>
                        <h6 className="mx-2 staff_name">{name}</h6>
                      </div>
                    </td>

                    <td className="py-4 text-secondary">{email}</td>
                    <td className="py-4 text-secondary">{phone || "N/A"}</td>
                    <td className="py-4 text-secondary">{status}</td>
                    {/* <td className="py-4 text-secondary">Suame, Kumasi</td> */}
                    <td className="py-4">
                      {/* <div className="d-flex">
                        <FiEdit className="edit" id="edit" />
                        <UncontrolledTooltip target="edit">
                          Edit staff
                        </UncontrolledTooltip>
                        <MdDelete className="delete" id="delete" />
                        <UncontrolledTooltip target="delete">
                          Delete product
                        </UncontrolledTooltip>
                      </div> */}
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
                Add new staff
              </ModalHeader>
              <ModalBody>
                <form action="" onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      name="name"
                      value={details.name}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  {/* <FormGroup>
                        <Label>Last Name</Label>
                        <Input type="text" />
                      </FormGroup> */}
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>Email</Label>
                        <Input
                          type="text"
                          name="email"
                          value={details.email}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Phone Number</Label>
                        <Input
                          type="text"
                          name="phone"
                          value={details.phone}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <FormGroup>
                    <Label>Branch</Label>
                    <Input type="select"></Input>
                  </FormGroup> */}
                  <FormGroup>
                    <Label>Password</Label>
                    <Input
                      type="text"
                      name="password"
                      value={details.password}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  {/* <div className="drug-photo" style={{ cursor: "pointer" }}>
                    <img
                      src=""
                      alt=""
                      className="w-100 h-100"
                      //   style={{
                      //     aspectRatio: "3 / 2",
                      //     objectFit: "cover",
                      //     // mixBlendMode: "darken",
                      //     pointerEvents: "none",
                      //   }}
                    />

                    <input
                      type="file"
                      className="drug_file"
                      accept="image/*"
                      name="photo"
                      // onChange={handleChange}
                    />
                  </div> */}
                  <div className="d-flex justify-content-between">
                    <div></div>
                    <Button color="success">Save</Button>{" "}
                  </div>
                  {/* <Button color="success">Save</Button>{" "} */}
                </form>
              </ModalBody>
              {/* <ModalFooter>
              </ModalFooter> */}
            </Modal>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Staff;
