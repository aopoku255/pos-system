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
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";

const Inventory = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Add Table

  const userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const accessToken = userinfo.refreshToken;
  const id = userinfo.shop_id;

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
        window.location.reload(true);
      }
    } catch (error) {}
  };

  const handleInventory = (id) => {
    sessionStorage.setItem("prodid", id);
    
  };

  const [enteries, setEnteries] = useState(10);
  const handleEntryChange = (e) => {
    setEnteries(e.target.value);
  };

  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <main className="main">
          <Toaster />
          <Header name="INVENTORY" />
          <div>
            <div className="d-flex justify-content-between align-items-center py-3 px-3">
              <div>
              <div>
                Showing{" "}
                <select name="" id="" onChange={handleEntryChange}>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="500">500</option>
                  <option value="1000">1000</option>
                </select>{" "}
                Enteries
              </div>
              </div>
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by product name"
                className="form-control w-50"
              />
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
                {data.filter(({ name }) =>
                    name.toLowerCase() === ""
                      ? name.toLowerCase()
                      : name.toLowerCase().includes(search.toLowerCase())
                  ).slice(0, enteries).map(
                  (
                    { name, image, selling_price, total_stock, createdAt, _id },
                    index
                  ) => (
                    <tr key={_id}>
                      <td className="py-4">{index + 1}</td>
                      <td className="py-4">{name}</td>
                      <td className="py-4">
                        {image === "image_url" ? (
                          <p>N/A</p>
                        ) : (
                          <img
                            src={image}
                            alt=""
                            style={{
                              width: "5rem",
                              height: "3rem",
                              aspectRatio: "3 / 2",
                              objectFit: "contain",
                              mixBlendMode: "darken",
                              pointerEvents: "none",
                            }}
                          />
                        )}
                      </td>
                      <td className="py-4">{selling_price}</td>
                      <td className="py-4">{total_stock}</td>
                      <td className="py-4">
                        {`${new Date(createdAt).getDate()}/${
                          new Date(createdAt).getMonth() + 1
                        }/${new Date(createdAt).getFullYear()}`}
                      </td>
                      <td className="py-4">
                        <div className="d-flex align-items-center">
                          <FiEdit
                            className="edit"
                            id="edit"
                            onClick={() => handleAddTable(_id)}
                          />
                          <UncontrolledTooltip target="edit">
                            Edit product
                          </UncontrolledTooltip>
                          <Link
                            to="/inventory-records"
                            onClick={() => handleInventory(_id, {name, image, selling_price, total_stock, createdAt, _id})}
                          >
                            <AiFillEye className="edit" id="eye" />
                            <UncontrolledTooltip target="eye">
                              View records
                            </UncontrolledTooltip>
                          </Link>
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
