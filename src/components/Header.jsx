import { Link, useNavigate } from "react-router-dom";
import { Collapse, Modal, ModalBody } from "reactstrap";
import profile from "../assets/png/staff.jpeg";

import { FaUser } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { MdSupport } from "react-icons/md";
import { BiRun } from "react-icons/bi";
import { useState } from "react";
const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };
  const day = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const month = new Date().toLocaleDateString("en-US", { month: "long" });
  const year = new Date().getFullYear();
  const date = new Date().getDate();

  const navgiate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    navgiate("/");
    sessionStorage.clear();
  };

  const [openLog, setIsOpenLog] = useState(false)
  const [isCloseLog, setIsCloseLog] = useState(false)

  return (
    <div className="page_profile mx-3 pt-5">
      <div>
        <h1 className="page_header">{props.name}</h1>
        <p className="text-secondary">
          <span style={{ color: "#5e72e4" }}>{day}</span>, {date} {month} {year}
        </p>
      </div>
      <div className="d-flex flex-column align-items-center profile_container">
        <img
          src={profile}
          alt=""
          className="img-fluid rounded-circle profile_img  d-block"
          onClick={handleOpenMenu}
        />
        <Collapse
          isOpen={isOpen}
          className="mt-3 profile_menu shadow-lg"
          style={{ width: "10rem" }}
        >
          <div className="card border-0 shodow py-2">
            <ul className="list-group">
              <Link
                to=""
                className="list-group-item rounded border-0 list_active d-flex justify-content-start align-items-center"
              >
                <FaUser />
                <span className="mx-2">Profile</span>
              </Link>
              <Link
                to=""
                className="list-group-item rounded border-0 list_active d-flex justify-content-start align-items-center"
              >
                <AiFillSetting />
                <span className="mx-2">Settings</span>
              </Link>
              <Link
                to=""
                className="list-group-item rounded border-0 list_active d-flex justify-content-start align-items-center"
              >
                <MdSupport />
                <span className="mx-2">Support</span>
              </Link>
              <hr />
              <Link
                to=""
                className="list-group-item rounded border-0 list_active d-flex justify-content-start align-items-center text-danger"
                onClick={() => setIsOpenLog(true)}
              >
                <BiRun />
                <span className="mx-2">Logout</span>
              </Link>
            </ul>
          </div>
        </Collapse>
        <Modal isOpen={openLog} centered>
              <ModalBody>
                <h6 className="text-danger">Log Out</h6>
                <p>Are you sure you want to logout?</p>
                <div className="d-flex">
                  <button
                    className="btn btn-success"
                    onClick={() => setIsOpenLog(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger mx-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </ModalBody>
            </Modal>
      </div>
    </div>
  );
};

export default Header;
