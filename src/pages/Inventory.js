import React, { useState } from "react";
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

const Inventory = () => {
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
          <Header name="INVENTORY" />
          <div className="table-responsive mt-3 mb-5 shadow mx-3 rounded">
            <div className="d-flex justify-content-between align-items-center py-3 px-3">
              <div></div>
              {/* <button
                className="btn btn-primary border-0  shadow text-uppercase"
                onClick={handleAddTable}
              >
                Add Products
              </button> */}
            </div>
            <Table bgcolor="white" border>
              <thead className="bg-light text-secondary text-center text-uppercase small">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Date Added</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td className="py-4">1</td>
                  <td className="py-4">Banana</td>
                  <td className="py-4">image</td>
                  <td className="py-4">20</td>
                  <td className="py-4">100</td>
                  <td className="py-4">09/02/2023</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <FiEdit
                        className="edit"
                        id="edit"
                        onClick={handleAddTable}
                      />
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
                  <td className="py-4">2</td>
                  <td className="py-4">Banana</td>
                  <td className="py-4">image</td>
                  <td className="py-4">20</td>
                  <td className="py-4">100</td>
                  <td className="py-4">09/02/2023</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <FiEdit
                        className="edit"
                        id="edit"
                        onClick={handleAddTable}
                      />
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
                  <td className="py-4">3</td>
                  <td className="py-4">Banana</td>
                  <td className="py-4">image</td>
                  <td className="py-4">20</td>
                  <td className="py-4">100</td>
                  <td className="py-4">09/02/2023</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <FiEdit
                        className="edit"
                        id="edit"
                        onClick={handleAddTable}
                      />
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
                  <td className="py-4">4</td>
                  <td className="py-4">Banana</td>
                  <td className="py-4">image</td>
                  <td className="py-4">20</td>
                  <td className="py-4">100</td>
                  <td className="py-4">09/02/2023</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <FiEdit
                        className="edit"
                        id="edit"
                        onClick={handleAddTable}
                      />
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
                  <td className="py-4">5</td>
                  <td className="py-4">Banana</td>
                  <td className="py-4">image</td>
                  <td className="py-4">20</td>
                  <td className="py-4">100</td>
                  <td className="py-4">09/02/2023</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <FiEdit
                        className="edit"
                        id="edit"
                        onClick={handleAddTable}
                      />
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
            <Modal isOpen={isOpen} centered>
              <ModalHeader
                toggle={() => setIsOpen(false)}
                className="small text-secondary"
              >
                Edit product quantity
              </ModalHeader>
              <ModalBody>
                <form action="">
                  <FormGroup>
                    <Label>Edit item quantity</Label>
                    <Input type="number" min={1} />
                  </FormGroup>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="success">Done</Button>{" "}
              </ModalFooter>
            </Modal>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Inventory;
