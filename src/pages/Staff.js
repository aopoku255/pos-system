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
import { MdDelete } from "react-icons/md";
import { FcAddRow } from "react-icons/fc";
import profile from "../assets/jpg/profile.jpg";

const Staff = () => {
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

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <main className="main">
          <Header name="STAFF" />
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
                  <th>Craeted At</th>
                  <th>Store Branch</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="">
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
                      <h6 className="mx-2 staff_name">John Doe</h6>
                    </div>
                  </td>

                  <td className="py-4 text-secondary">09/02/2023</td>
                  <td className="py-4 text-secondary">Suame, Kumasi</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <FiEdit className="edit" id="edit" />
                      <UncontrolledTooltip target="edit">
                        Edit staff
                      </UncontrolledTooltip>
                      <MdDelete className="delete" id="delete" />
                      <UncontrolledTooltip target="delete">
                        Delete product
                      </UncontrolledTooltip>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-4">
                    <div className="d-flex  align-items-center ">
                      <div className="staff_img rounded-circle">
                        <img
                          src={profile}
                          alt=""
                          className="img-fluid rounded-circle"
                        />
                      </div>
                      <h6 className="mx-2 staff_name">John Doe</h6>
                    </div>
                  </td>

                  <td className="py-4 text-secondary">09/02/2023</td>
                  <td className="py-4 text-secondary">Suame, Kumasi</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <FiEdit className="edit" id="edit" />
                      <UncontrolledTooltip target="edit">
                        Edit staff
                      </UncontrolledTooltip>
                      <MdDelete className="delete" id="delete" />
                      <UncontrolledTooltip target="delete">
                        Delete product
                      </UncontrolledTooltip>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-4">
                    <div className="d-flex  align-items-center ">
                      <div className="staff_img rounded-circle">
                        <img
                          src={profile}
                          alt=""
                          className="img-fluid rounded-circle"
                        />
                      </div>
                      <h6 className="mx-2 staff_name">John Doe</h6>
                    </div>
                  </td>

                  <td className="py-4 text-secondary">09/02/2023</td>
                  <td className="py-4 text-secondary">Suame, Kumasi</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <FiEdit className="edit" id="edit" />
                      <UncontrolledTooltip target="edit">
                        Edit staff
                      </UncontrolledTooltip>
                      <MdDelete className="delete" id="delete" />
                      <UncontrolledTooltip target="delete">
                        Delete product
                      </UncontrolledTooltip>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-4">
                    <div className="d-flex  align-items-center ">
                      <div className="staff_img rounded-circle">
                        <img
                          src={profile}
                          alt=""
                          className="img-fluid rounded-circle"
                        />
                      </div>
                      <h6 className="mx-2 staff_name">John Doe</h6>
                    </div>
                  </td>

                  <td className="py-4 text-secondary">09/02/2023</td>
                  <td className="py-4 text-secondary">Suame, Kumasi</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <FiEdit className="edit" id="edit" />
                      <UncontrolledTooltip target="edit">
                        Edit staff
                      </UncontrolledTooltip>
                      <MdDelete className="delete" id="delete" />
                      <UncontrolledTooltip target="delete">
                        Delete product
                      </UncontrolledTooltip>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-4">
                    <div className="d-flex  align-items-center ">
                      <div className="staff_img rounded-circle">
                        <img
                          src={profile}
                          alt=""
                          className="img-fluid rounded-circle"
                        />
                      </div>
                      <h6 className="mx-2 staff_name">John Doe</h6>
                    </div>
                  </td>

                  <td className="py-4 text-secondary">09/02/2023</td>
                  <td className="py-4 text-secondary">Suame, Kumasi</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <FiEdit className="edit" id="edit" />
                      <UncontrolledTooltip target="edit">
                        Edit staff
                      </UncontrolledTooltip>
                      <MdDelete className="delete" id="delete" />
                      <UncontrolledTooltip target="delete">
                        Delete product
                      </UncontrolledTooltip>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-4">
                    <div className="d-flex  align-items-center ">
                      <div className="staff_img rounded-circle">
                        <img
                          src={profile}
                          alt=""
                          className="img-fluid rounded-circle"
                        />
                      </div>
                      <h6 className="mx-2 staff_name">John Doe</h6>
                    </div>
                  </td>

                  <td className="py-4 text-secondary">09/02/2023</td>
                  <td className="py-4 text-secondary">Suame, Kumasi</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <FiEdit className="edit" id="edit" />
                      <UncontrolledTooltip target="edit">
                        Edit staff
                      </UncontrolledTooltip>
                      <MdDelete className="delete" id="delete" />
                      <UncontrolledTooltip target="delete">
                        Delete product
                      </UncontrolledTooltip>
                    </div>
                  </td>
                </tr>
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
                <form action="">
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>Fist Name</Label>
                        <Input type="text" />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Last Name</Label>
                        <Input type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>Email</Label>
                        <Input type="text" />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Phone Number</Label>
                        <Input type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label>Branch</Label>
                    <Input type="select"></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Image</Label>
                    <Input type="file" />
                  </FormGroup>
                  <div className="drug-photo" style={{ cursor: "pointer" }}>
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
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="success">Save</Button>{" "}
              </ModalFooter>
            </Modal>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Staff;
