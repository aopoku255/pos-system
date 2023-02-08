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

const Sidebar = () => {
  return (
    <div className="sidebar shadow">
      <div className="sidebar_header my-2 text-center text-white">
        {/* <h1 className="text-danger">logo</h1> */}
      </div>
      <div className="sidebar_list">
        <ul className="list-group">
          <Link
            to=""
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
          >
            <CiShop size={20} color="#5e72e4" />
            <span className="mx-2">Dashboard</span>
          </Link>
          <Link
            to=""
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
          >
            <HiOutlineShoppingBag size={20} color="#fb6340" />
            <span className="mx-2">Products</span>
          </Link>
          <Link
            to=""
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
          >
            <MdOutlineInventory2 size={20} color="#172b4d" />
            <span className="mx-2">Inventory</span>
          </Link>
          <Link
            to=""
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
          >
            <RiGroupLine size={20} color="#5e72e4" />
            <span className="mx-2">Staff</span>
          </Link>
          <Link
            to=""
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
          >
            <VscGraph size={20} color="#2dce89" />
            <span className="mx-2">Sales</span>
          </Link>
          <Link
            to=""
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
          >
            <MdOutlineGroups size={20} color="#11cdef" />
            <span className="mx-2">Customers</span>
          </Link>
          <Link
            to=""
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
          >
            <MdOutlineAssignmentReturn size={20} color="#fb6340" />

            <span className="mx-2">Return</span>
          </Link>
          <Link
            to=""
            className="list-group-item mx-2 mb-2 rounded border-0 list_active d-flex justify-content-start align-items-center"
          >
            <TbReportAnalytics size={20} color="#8898aa" />
            <span className="mx-2">Report</span>
          </Link>
        </ul>
        <div className="develop">
          <hr className="mx-3 mt-4 text-secondary" />
          <p className="text-secondary small">Made with ❤️ from TekDevisal</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
