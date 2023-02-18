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
import { toast, Toaster } from "react-hot-toast";
import axios from "../api/axios";

const Inventory = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Add Table

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
        "product/fetch-product",
        { store_id: id },
        { headers: { "auth-token": accessToken } }
      )
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const [itemid, setItemId] = useState("");
  const [currentStock, setCurrentStock] = useState(null);
  const [details, setDetails] = useState("");
  const handleAddTable = (id) => {
    setIsOpen(true);
    setItemId(id);
    setCurrentStock(data.filter(({ _id }) => _id === id)[0].total_stock);
  };

  const formData = new FormData();
  formData.append("product_id", itemid);
  formData.append("current_stock", 34);
  formData.append("stock_added", 10);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const remove = toast.loading("Loading...");
    try {
      const res = await axios.post(
        "inventory/edit-inventory",
        {
          product_id: itemid,
          current_stock: currentStock,
          stock_added: Number(details),
        },
        {
          headers: { "auth-token": accessToken },
        }
      );
      if (res.data.message === "success") {
        toast.dismiss(remove);
        setTimeout(() => {
          setIsOpen(false);
        }, 1500);
        toast.success("Product updated successfully");
      }
    } catch (error) {}
  };

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <main className="main">
          <Toaster />
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
                {data.map(
                  (
                    { name, image, selling_price, total_stock, createdAt, _id },
                    index
                  ) => (
                    <tr key={_id}>
                      <td className="py-4">{index + 1}</td>
                      <td className="py-4">{name}</td>
                      <td className="py-4">{image}</td>
                      <td className="py-4">{selling_price}</td>
                      <td className="py-4">{total_stock}</td>
                      <td className="py-4">
                        {`${new Date(createdAt).getDate()}/${
                          new Date(createdAt).getMonth() + 1
                        }/${new Date(createdAt).getFullYear()}`}
                      </td>
                      <td className="py-4">
                        <div className="d-flex">
                          <FiEdit
                            className="edit"
                            id="edit"
                            onClick={() => handleAddTable(_id)}
                          />
                          <UncontrolledTooltip target="edit">
                            Edit product
                          </UncontrolledTooltip>
                          {/* <MdDelete
                            className="delete"
                            id="delete"
                            onClick={() => handleOpenDelete(_id)}
                          />
                          <UncontrolledTooltip target="delete">
                            Delete product
                          </UncontrolledTooltip> */}
                        </div>
                      </td>
                    </tr>
                  )
                )}
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
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Edit item quantity</Label>
                    <Input
                      type="number"
                      min={1}
                      onChange={(e) => setDetails(e.target.value)}
                    />
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <div></div>
                    <Button className="px-3" color="success">
                      Done
                    </Button>{" "}
                  </div>
                </form>
              </ModalBody>
            </Modal>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Inventory;
