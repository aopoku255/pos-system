import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { FiLock } from "react-icons/fi";
import { FaUser, FaLock } from "react-icons/fa";
import { Input } from "reactstrap";
import axios from "../api/axios";
import { toast, Toaster } from "react-hot-toast";

const Login = () => {
  const [errMes, setErrMes] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoadin, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [details, setDetails] = useState({ email: "", password: "" });

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
      const res = await axios.post("user/login", { ...details });
      if (res.data.status === 400) {
        toast.dismiss(remove);
        toast.error(res.data.message);
      } else {
        toast.dismiss(remove);
        toast.success(`Welcome ${res.data.name}`);
        sessionStorage.setItem("userInfo", JSON.stringify(res.data));
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error) {}
  };

  return (
    <div className="center">
      <Toaster />
      <h5 className="mt-4 mb-4 text-white">Welcome Back</h5>
      <div className="card shadow-lg border-0 login">
        <p className="text-center text-secondary pt-5">
          Sign in with credentials
        </p>
        <Link to="/" className=" mx-auto">
          {/* <img src={logo} alt="" width={120} /> */}
        </Link>
        <form className="card-body" onSubmit={handleSubmit}>
          {error ? <div className="error">{errMes}</div> : ""}
          <div className="form-group ">
            {/* ACCOUNT */}
            <div className="form-floating mb-4">
              <Input
                type="text"
                className="form-control login-form-control"
                id="email"
                placeholder="email"
                name="email"
                value={details.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email" className="light-text">
                <FaUser className="text-secondary" />
                <span className="mx-2 text-secondary">email</span>
              </label>
            </div>

            {/* PASSWORD */}
            <div className="form-floating input_container">
              <Input
                type="password"
                className="form-control login-form-control"
                id="password"
                placeholder="Password"
                name="password"
                value={details.password}
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
              <Link
                to="/register"
                className="text-primary text-decoration-none"
              >
                sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3 login">
        <div className="">
          <div className="form-check ">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="rememberme"
            />
            <label
              className="form-check-label text-white "
              htmlFor="rememberme"
            >
              Remember Me
            </label>
          </div>
        </div>

        <div className="">
          <Link to="" className="text-nowrap text-decoration-none text-white">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
