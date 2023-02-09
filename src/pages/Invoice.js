import React from "react";
import { Col, Input, InputGroup, InputGroupText, Row, Table } from "reactstrap";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import { BsSearch } from "react-icons/bs";
import InvoiceCard from "../components/InvoiceCard";
import banana from "../assets/png/banana.png";

const Invoice = () => {
  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <main className="main">
          <Header name="INVOICE POS" />
          <div className="mt-5">
            <div className="container">
              <Row>
                <Col md={3}>
                  <InputGroup>
                    <InputGroupText>
                      <BsSearch />
                    </InputGroupText>
                    <Input type="search" placeholder="search..." />
                  </InputGroup>
                </Col>
              </Row>
              <div className="invoice_grid mt-5">
                <InvoiceCard
                  product_name="Banana"
                  price={50}
                  stock={20}
                  product_img={banana}
                />
                <InvoiceCard
                  product_name="Banana"
                  price={50}
                  stock={20}
                  product_img={banana}
                />
                <InvoiceCard
                  product_name="Banana"
                  price={50}
                  stock={20}
                  product_img={banana}
                />
                <InvoiceCard
                  product_name="Banana"
                  price={50}
                  stock={20}
                  product_img={banana}
                />
                <InvoiceCard
                  product_name="Banana"
                  price={50}
                  stock={20}
                  product_img={banana}
                />
              </div>
              <div className="table-responsive my-5">
                <button className="btn btn-primary mb-3">Add Table</button>
                <Table bordered>
                  <thead className="bg-light text-secondary text-center text-uppercase small">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Discount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">1</td>
                      <td className="text-center">
                        <Input type="text"></Input>
                      </td>
                      <td className="text-center">
                        <Input type="text" />
                      </td>
                      <td className="text-center">
                        <Input type="number"></Input>
                      </td>
                      <td className="text-center">
                        <Input type="text" />
                      </td>
                      <td>{/* <Input type="text" /> */}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div></div>
                <div>
                  <form>
                    <InputGroup className="mb-4">
                      <InputGroupText>Total discount</InputGroupText>
                      <Input type="text" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupText>Amount paid</InputGroupText>
                      <Input type="text" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupText>Customer balance</InputGroupText>
                      <Input type="text" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupText>Payment method</InputGroupText>
                      <Input type="select">
                        <option value="cash">Cash</option>
                        <option value="bank">Bank</option>
                        <option value="credit">Credit</option>
                      </Input>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupText>Customer name</InputGroupText>
                      <Input type="text" />
                    </InputGroup>
                    <div className="d-flex mb-5">
                      <button className="btn btn-primary px-4">
                        Calculate
                      </button>
                      <button className="btn btn-success px-5 mx-2">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Invoice;
