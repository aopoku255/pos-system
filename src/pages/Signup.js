import React, { useState } from "react";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { FiLock } from "react-icons/fi";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { Input, Modal, ModalBody, Spinner } from "reactstrap";
import { toast, Toaster } from "react-hot-toast";

const Signup = () => {
  const [errMes, setErrMes] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoadin, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    shop_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails({ ...details, [name]: value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const remove = toast.loading("Loading...");
    try {
      const res = await axios.post("user/register", { ...details });
      console.log(res);
      if (res.data.message === "User created successfully") {
        toast.dismiss(remove);
        toast.success("account created successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setTimeout(() => {
          toast.dismiss(remove);
          toast.error(res.data.message);
        }, 2000);
      }
    } catch (error) {}
  };

  return (
    <div className="center">
      <Toaster />
      <h5 className="text-white">Create an account</h5>
      <div className="card shadow-lg border-0 login">
        <p className="text-center text-secondary pt-5">
          Sign up with credentials
        </p>
        <Link to="/" className=" mx-auto">
          {/* <img src={logo} alt="" width={120} /> */}
        </Link>
        <div className="card-body">
          <form className="form-group" onSubmit={handleSubmit}>
            {/* ACCOUNT */}
            <div className="form-floating mb-4">
              <Input
                type="text"
                className="form-control login-form-control"
                id="name"
                name="name"
                value={details.name}
                onChange={handleChange}
                placeholder="name"
                required
                autoFocus={true}
              />
              <label htmlFor="email" className="light-text">
                <FaUser className="text-secondary" />
                <span className="mx-2 text-secondary">Name</span>
              </label>
            </div>
            <div className="form-floating mb-4">
              <Input
                type="text"
                className="form-control login-form-control"
                id="shop_name"
                name="shop_name"
                value={details.shop_name}
                placeholder="shop_name"
                onChange={handleChange}
                required
              />
              <label htmlFor="email" className="light-text">
                <FaUser className="text-secondary" />
                <span className="mx-2 text-secondary">Store Name</span>
              </label>
            </div>

            {/* EMAIL */}
            <div className="form-floating mb-4">
              <Input
                type="text"
                className="form-control login-form-control"
                id="email"
                name="email"
                value={details.email}
                placeholder="email"
                onChange={handleChange}
                required
              />
              <label htmlFor="email" className="light-text">
                <MdEmail className="text-secondary" />
                <span className="mx-2 text-secondary">Email</span>
              </label>
            </div>

            {/* PASSWORD */}
            <div className="form-floating input_container">
              <Input
                type={show ? "text" : "password"}
                className="form-control login-form-control"
                id="password"
                // placeholder="Password"
                name="password"
                value={details.password}
                placeholder="password"
                onChange={handleChange}
                required
              />
              <label htmlFor="password" className="light-text">
                <FaLock className="text-secondary" />
                <span className="mx-2 text-secondary">password</span>
              </label>
              {/* {!details.password ? (
                ""
              ) : (
                <div>
                  {show ? (
                    <span className="eye" onClick={handleClick}>
                      <RiEyeLine />
                    </span>
                  ) : (
                    <span className="eye" onClick={handleClick}>
                      <RiEyeCloseLine />
                    </span>
                  )}
                </div>
              )} */}
            </div>

            <button type="submit" className="submit_btn w-100 mt-4">
              Sign in
            </button>
            <p className="mt-4  text-center small">
              Don't have an account?{" "}
              <Link to="/" className="text-primary text-decoration-none">
                sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
