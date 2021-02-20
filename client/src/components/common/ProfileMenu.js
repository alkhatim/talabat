import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { Link } from "react-router-dom";
import userAvatar from "../../assets/images/users/avatar-1.jpg";
import { logout } from "../../store/actions/authActions";

const ProfileMenu = () => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.auth.user);
  const [menu, setMenu] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={userAvatar}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ml-2 mr-1">
            {user.username}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu right>
          <Link to="/profile" className="dropdown-item">
            <i className="bx bx-user font-size-16 align-middle mr-1" />
            <span>Profile</span>
          </Link>
          <div className="dropdown-divider" />
          <button className="dropdown-item" onClick={() => dispatch(logout())}>
            <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger" />
            <span>Logout</span>
          </button>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default ProfileMenu;
