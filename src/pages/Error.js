import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="d-flex justify-content-center align-items-center center">
      <h1 className="text-white">404</h1>
      <h4 className="text-white">Page Not Found</h4>
      <Link to="/dashboard" className="text-decoration-none text-white btn btn-secondary secondary">Go to Dashboard</Link>
    </div>
  );
};

export default Error;
