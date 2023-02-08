import profile from "../assets/jpg/profile.jpg";
const Header = () => {
  return (
    <div className="page_profile mx-3 pt-5">
      <div>
        <h1 className="page_header">DASHBOARD</h1>
      </div>
      <div className="profile_img rounded-circle">
        <img src={profile} alt="" className="img-fluid rounded-circle" />
      </div>
    </div>
  );
};

export default Header;
