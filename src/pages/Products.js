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

const Products = () => {
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

  const [details, setDetails] = useState({
    store_id: id,
    name: "",
    price: 0,
    selling_price: 0,
    total_stock: 1,
    discount: 0,
    picture: null,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setDetails({ ...details, [name]: value });
  };

  const navigate = useNavigate();
  toast.dismiss();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const remove = toast.loading("Loading...");
    const formData = new FormData();
    // formData.append("store_id", details.store_id);
    formData.append("name", details.name);
    formData.append("price", Number(details.price));
    formData.append("selling_price", Number(details.selling_price));
    formData.append("total_stock", Number(details.total_stock));
    formData.append("discount", Number(details.discount));
    formData.append("store_id", details.store_id);
    formData.append("picture", details.picture);

    try {
      const res = await axios.post("product/add-new-product", formData, {
        headers: { "auth-token": accessToken },
      });
      if (res.data.message === "success") {
        toast.dismiss(remove);
        setTimeout(() => {
          setIsOpen(false);
        }, 1500);
        toast.success("Product created successfully");
        window.location.reload(true)
      }
    } catch (error) {
      toast.error("An error occured");
    }
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
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [itemid, setItemId] = useState("");

  const handleOpenDelete = (id) => {
    setIsOpenDelete(true);
    setItemId(id);
  };

  // Delete
  const handleDelete = async () => {
    const remove = toast.loading("Loading...");
    console.log(accessToken);
    try {
      const res = await axios.delete("product/delete-product", {
        data: { _id: itemid, store_id: id },
        headers: { "auth-token": accessToken },
      });
      if (res.data.message === "success") {
        toast.dismiss(remove);
        setTimeout(() => {
          setIsOpenDelete(false);
        }, 1500);
        toast.success("Product deleted successfully");
        window.location.reload(true)
      }
    } catch (error) {}
  };

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <main className="main">
          <Toaster />
          <Header name="PRODUCTS" />
          <div className="table-responsive mt-3 mb-5 shadow mx-3 rounded">
            <div className="d-flex justify-content-between align-items-center py-3 px-3">
              <div></div>
              <button
                className="btn btn-primary border-0  shadow text-uppercase"
                onClick={handleAddTable}
              >
                Add Products
              </button>
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
                        <div className="d-flex">
                          <FiEdit className="edit" id="edit" />
                          <UncontrolledTooltip target="edit">
                            Edit product
                          </UncontrolledTooltip>
                          <MdDelete
                            className="delete"
                            id="delete"
                            onClick={() => handleOpenDelete(_id)}
                          />
                          <UncontrolledTooltip target="delete">
                            Delete product
                          </UncontrolledTooltip>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
            <Modal isOpen={isOpen}>
              <ModalHeader
                toggle={() => setIsOpen(false)}
                className="small text-secondary"
              >
                Add Product Information
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Product Name</Label>
                    <Input
                      type="text"
                      name="name"
                      value={details.name}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Purchased Price</Label>
                    <Input
                      type="number"
                      step={0.1}
                      name="price"
                      value={details.price}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Selling Price</Label>
                    <Input
                      type="number"
                      step={0.1}
                      name="selling_price"
                      value={details.selling_price}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      width={20}
                      min={1}
                      name="total_stock"
                      value={details.total_stock}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Discount</Label>
                    <Input
                      type="number"
                      width={20}
                      min={0}
                      name="discount"
                      value={details.discount}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Product Image</Label>
                    <div className="drug-photo" style={{ cursor: "pointer" }}>
                      {details.picture ? (
                        <img
                          src={URL.createObjectURL(details.picture)}
                          alt=""
                          className="img-fluid w-100 h-100"
                          style={{
                            aspectRatio: "3 / 2",
                            objectFit: "contain",
                            mixBlendMode: "darken",
                            pointerEvents: "none",
                          }}
                        />
                      ) : (
                        <p className="small file_name">
                          Drag and drop or click here to select image
                        </p>
                      )}

                      <input
                        type="file"
                        className="drug_file"
                        accept="image/*"
                        name="picture"
                        onChange={handleChange}
                       
                      />
                    </div>
                  </FormGroup>
                  <div className="d-flex justify-content-between">
                    <div></div>
                    <Button color="success">Save</Button>{" "}
                  </div>
                </form>
              </ModalBody>
              {/* <ModalFooter></ModalFooter> */}
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

export default Products;
