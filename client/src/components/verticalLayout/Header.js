import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProfileMenu from "../common/ProfileMenu";
import logo from "../../assets/images/logo.svg";
import logoLightPng from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/logo-light.svg";
import logoDark from "../../assets/images/logo-dark.png";

const Header = () => {
  const dispatch = useDispatch();
  const layout = useSelector((store) => store.layout);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  function tToggle() {
    if (layout.leftSideBarType === "default") {
      dispatch({
        type: "CHANGE_SIDEBAR_TYPE",
        payload: { sidebarType: "condensed", isMobile },
      });
    } else if (layout.leftSideBarType === "condensed") {
      dispatch({
        type: "CHANGE_SIDEBAR_TYPE",
        payload: { sidebarType: "default", isMobile },
      });
    }
  }

  return (
    <>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logo} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="17" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoLightSvg} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoLightPng} alt="" height="19" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item waves-effect"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>
          </div>
          <div className="d-flex">
            <h4 style={{ color: "white" }}>Talabat</h4>
          </div>
          <div className="d-flex">
            <ProfileMenu />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
