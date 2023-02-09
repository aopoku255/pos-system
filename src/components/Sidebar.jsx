import { Link } from "react-router-dom";
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
          <Link
            to="/dashboard"
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
          >
            <CiShop size={20} color="#5e72e4" />
            <span className="mx-2">Dashboard</span>
          </Link>
          <Link
            to="/invoice"
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
          >
            <FaHandHoldingUsd size={20} color="#f5365c" />
            <span className="mx-2">Invoice POS</span>
          </Link>
          <Link
            to="/products"
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
          >
            <HiOutlineShoppingBag size={20} color="#fb6340" />
            <span className="mx-2">Products</span>
          </Link>
          <Link
            to="/inventory"
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
          >
            <MdOutlineInventory2 size={20} color="#172b4d" />
            <span className="mx-2">Inventory</span>
          </Link>
          <Link
            to="/staff"
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
          >
            <RiGroupLine size={20} color="#5e72e4" />
            <span className="mx-2">Staff</span>
          </Link>
          <Link
            to="/sales"
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
          >
            <VscGraph size={20} color="#2dce89" />
            <span className="mx-2">Sales</span>
          </Link>
          <Link
            to="/customers"
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
          >
            <MdOutlineGroups size={20} color="#11cdef" />
            <span className="mx-2">Customers</span>
          </Link>
          <Link
            to="/returns"
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
          >
            <MdOutlineAssignmentReturn size={20} color="#fb6340" />

            <span className="mx-2">Return</span>
          </Link>
          <Link
            to="/report"
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
          >
            <TbReportAnalytics size={20} color="#8898aa" />
            <span className="mx-2">Report</span>
          </Link>
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
