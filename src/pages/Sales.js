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
import { BsFillPrinterFill } from "react-icons/bs";

const Sales = () => {
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
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td className="py-4">1</td>
                  <td className="py-4">IN256894</td>
                  <td className="py-4">Banana</td>
                  <td className="py-4">image</td>
                  <td className="py-4">20</td>
                  <td className="py-4">100</td>
                  <td className="py-4">09/02/2023</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <BsFillPrinterFill className="edit" id="printer" />
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
                <tr>
                  <td className="py-4">1</td>
                  <td className="py-4">IN256894</td>
                  <td className="py-4">Banana</td>
                  <td className="py-4">image</td>
                  <td className="py-4">20</td>
                  <td className="py-4">100</td>
                  <td className="py-4">09/02/2023</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <BsFillPrinterFill className="edit" id="printer" />
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
                <tr>
                  <td className="py-4">1</td>
                  <td className="py-4">IN256894</td>
                  <td className="py-4">Banana</td>
                  <td className="py-4">image</td>
                  <td className="py-4">20</td>
                  <td className="py-4">100</td>
                  <td className="py-4">09/02/2023</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <BsFillPrinterFill className="edit" id="printer" />
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
                <tr>
                  <td className="py-4">1</td>
                  <td className="py-4">IN256894</td>
                  <td className="py-4">Banana</td>
                  <td className="py-4">image</td>
                  <td className="py-4">20</td>
                  <td className="py-4">100</td>
                  <td className="py-4">09/02/2023</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <BsFillPrinterFill className="edit" id="printer" />
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
                <tr>
                  <td className="py-4">1</td>
                  <td className="py-4">IN256894</td>
                  <td className="py-4">Banana</td>
                  <td className="py-4">image</td>
                  <td className="py-4">20</td>
                  <td className="py-4">100</td>
                  <td className="py-4">09/02/2023</td>
                  <td className="py-4">
                    <div className="d-flex">
                      <BsFillPrinterFill className="edit" id="printer" />
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
              </tbody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sales;
