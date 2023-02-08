import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { FiLock } from "react-icons/fi";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [errMes, setErrMes] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoadin, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [details, setDetails] = useState({ account_id: "", password: "" });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails({ ...details, [name]: value });
  };
  const handleFocus = () => {
    setIsLoading(true);
  };

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div className="center">
      <h5 className="mt-4 mb-4 text-white">Welcome Back</h5>
      <div className="card shadow-lg border-0 login">
        <p className="text-center text-secondary pt-5">
          Sign in with credentials
        </p>
        <Link to="/" className=" mx-auto">
          {/* <img src={logo} alt="" width={120} /> */}
        </Link>
        <div className="card-body">
          {error ? <div className="error">{errMes}</div> : ""}
          <div className="form-group ">
            {/* ACCOUNT */}
            <div className="form-floating mb-4">
              <input
                type="text"
                className="form-control login-form-control"
                id="email"
                placeholder="Business ID"
                name="account_id"
                value={details.account_id}
                onChange={handleChange}
              />
              <label for="email" className="light-text">
                <FaUser className="text-secondary" />
                <span className="mx-2 text-secondary">username</span>
              </label>
            </div>

            {/* PASSWORD */}
            <div className="form-floating input_container">
              <input
                type={show ? "text" : "password"}
                className="form-control login-form-control"
                id="password"
                placeholder="Password"
                name="password"
                value={details.password}
                onChange={handleChange}
              />
              <label for="password" className="light-text">
                <FaLock className="text-secondary" />
                <span className="mx-2 text-secondary">password</span>
              </label>
              {!details.password ? (
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
              )}
            </div>

            <div className="row justify-content-center mt-3 ">
              <div className="col-6 col-md-8">
                <div className="form-check ">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="rememberme"
                  />
                  <label
                    className="form-check-label text-secondary "
                    for="rememberme"
                  >
                    Remember Me
                  </label>
                </div>
              </div>

              <div className="col-6 col-md-4 text-center">
                <Link to="" className="text-nowrap text-decoration-none">
                  Forgot Password
                </Link>
              </div>
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
        </div>
      </div>
    </div>
  );
};

export default Login;
