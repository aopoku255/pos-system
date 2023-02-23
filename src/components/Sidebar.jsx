import { Link, NavLink } from "react-router-dom";
import { CiShop } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineInventory2,
  MdOutlineGroups,
  MdOutlineAssignmentReturn,
} from "react-icons/md";
import { RiGroupLine } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { VscGraph } from "react-icons/vsc";
import { FaHandHoldingUsd } from "react-icons/fa";
import { useEffect, useRef } from "react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_header mt-5 mx-4 text-white">
        {/* <h1
          className="text-danger"
          style={{ fontSize: "14px", fontWeight: "bold" }}
        >
          TekDevisal POS
        </h1> */}
      </div>
      <div className="sidebar_list">
        <ul className="list-group">
          <NavLink
            to="/dashboard"
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
            style={({ isActive }) =>
              isActive
                ? { backgroundColor: "#f6f9fc", color: "#172B4D" }
                : { color: "rgba(0,0,0,.6)" }
            }
          >
            <CiShop size={20} color="#5e72e4" />
            <span className="mx-2">Dashboard</span>
          </NavLink>
          <NavLink
            to="/invoice"
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
            style={({ isActive }) =>
              isActive
                ? { backgroundColor: "#f6f9fc", color: "#172B4D" }
                : { color: "rgba(0,0,0,.6)" }
            }
          >
            <FaHandHoldingUsd size={20} color="#f5365c" />
            <span className="mx-2">Invoice POS</span>
          </NavLink>
          <NavLink
            to="/products"
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
            style={({ isActive }) =>
              isActive
                ? { backgroundColor: "#f6f9fc", color: "#172B4D" }
                : { color: "rgba(0,0,0,.6)" }
            }
          >
            <HiOutlineShoppingBag size={20} color="#fb6340" />
            <span className="mx-2">Products</span>
          </NavLink>
          <NavLink
            to="/inventory"
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
            style={({ isActive }) =>
              isActive
                ? { backgroundColor: "#f6f9fc", color: "#172B4D" }
                : { color: "rgba(0,0,0,.6)" }
            }
          >
            <MdOutlineInventory2 size={20} color="#172b4d" />
            <span className="mx-2">Inventory</span>
          </NavLink>
          {/* <NavLink
            to="/staff"
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
            style={({ isActive }) =>
              isActive
                ? { backgroundColor: "#f6f9fc", color: "#172B4D" }
                : { color: "rgba(0,0,0,.6)" }
            }
          >
            <RiGroupLine size={20} color="#5e72e4" />
            <span className="mx-2">Staff</span>
          </NavLink> */}
          <NavLink
            to="/sales"
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
            style={({ isActive }) =>
              isActive
                ? { backgroundColor: "#f6f9fc", color: "#172B4D" }
                : { color: "rgba(0,0,0,.6)" }
            }
          >
            <VscGraph size={20} color="#2dce89" />
            <span className="mx-2">Sales</span>
          </NavLink>
          <NavLink
            to="/customers"
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
            style={({ isActive }) =>
              isActive
                ? { backgroundColor: "#f6f9fc", color: "#172B4D" }
                : { color: "rgba(0,0,0,.6)" }
            }
          >
            <MdOutlineGroups size={20} color="#11cdef" />
            <span className="mx-2">Customers</span>
          </NavLink>
          <NavLink
            to="/returns"
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
            style={({ isActive }) =>
              isActive
                ? { backgroundColor: "#f6f9fc", color: "#172B4D" }
                : { color: "rgba(0,0,0,.6)" }
            }
          >
            <MdOutlineAssignmentReturn size={20} color="#fb6340" />

            <span className="mx-2">Return</span>
          </NavLink>
          <NavLink
            to="/report"
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
            style={({ isActive }) =>
              isActive
                ? { backgroundColor: "#f6f9fc", color: "#172B4D" }
                : { color: "rgba(0,0,0,.6)" }
            }
          >
            <TbReportAnalytics size={20} color="#8898aa" />
            <span className="mx-2">Report</span>
          </NavLink>
        </ul>
        <div className="develop">
          <hr className="mx-3 mt-4 text-secondary" />
          <p className="text-secondary small">Made with ❤️ from TekDevisal</p>
          <p className="text-secondary" style={{ fontSize: "10px" }}>
            TekDevisal copyright &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
