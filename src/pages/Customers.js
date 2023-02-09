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

const Customers = () => {
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
                <tr>
                  <td></td>
                  <td className="py-4">
                    <h6 className="mx-2 staff_name">John Doe</h6>
                  </td>

                  <td className="py-4 text-secondary">aopoku255@gmail.com</td>
                  <td className="py-4 text-secondary">0545098438</td>
                  <td className="py-4 text-secondary">PLT 16 BLK III</td>
                  <td className="py-4 text-secondary">09/02/2023</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <FiEdit className="edit" id="edit" />
                      <UncontrolledTooltip target="edit">
                        Edit product
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
                    <h6 className="mx-2 staff_name">John Doe</h6>
                  </td>

                  <td className="py-4 text-secondary">aopoku255@gmail.com</td>
                  <td className="py-4 text-secondary">0545098438</td>
                  <td className="py-4 text-secondary">PLT 16 BLK III</td>
                  <td className="py-4 text-secondary">09/02/2023</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <FiEdit className="edit" id="edit" />
                      <UncontrolledTooltip target="edit">
                        Edit product
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
                    <h6 className="mx-2 staff_name">John Doe</h6>
                  </td>

                  <td className="py-4 text-secondary">aopoku255@gmail.com</td>
                  <td className="py-4 text-secondary">0545098438</td>
                  <td className="py-4 text-secondary">PLT 16 BLK III</td>
                  <td className="py-4 text-secondary">09/02/2023</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <FiEdit className="edit" id="edit" />
                      <UncontrolledTooltip target="edit">
                        Edit product
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
                    <h6 className="mx-2 staff_name">John Doe</h6>
                  </td>

                  <td className="py-4 text-secondary">aopoku255@gmail.com</td>
                  <td className="py-4 text-secondary">0545098438</td>
                  <td className="py-4 text-secondary">PLT 16 BLK III</td>
                  <td className="py-4 text-secondary">09/02/2023</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <FiEdit className="edit" id="edit" />
                      <UncontrolledTooltip target="edit">
                        Edit product
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
                    <h6 className="mx-2 staff_name">John Doe</h6>
                  </td>

                  <td className="py-4 text-secondary">aopoku255@gmail.com</td>
                  <td className="py-4 text-secondary">0545098438</td>
                  <td className="py-4 text-secondary">PLT 16 BLK III</td>
                  <td className="py-4 text-secondary">09/02/2023</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <FiEdit className="edit" id="edit" />
                      <UncontrolledTooltip target="edit">
                        Edit product
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
                Add new customer
              </ModalHeader>
              <ModalBody>
                <form action="">
                  <FormGroup>
                    <Label>Customer name</Label>
                    <Input type="text"></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input type="text"></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Phone</Label>
                    <Input type="text"></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Address</Label>
                    <Input type="text"></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Region</Label>
                    <Input type="text"></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>City</Label>
                    <Input type="text"></Input>
                  </FormGroup>
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

export default Customers;
