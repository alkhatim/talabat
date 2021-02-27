import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MetisMenu from "metismenujs";
import { withRouter, Link as OutterLink } from "react-router-dom";
import InnerLink from "../common/InnerLink";

const SidebarContent = (props) => {
  const { role } = useSelector((store) => store.auth.user);

  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;

    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      return false;
    }
    return false;
  }

  return (
    <>
      <div id="sidebar-menu">
        <ul className="metismenu list-unstyled" id="side-menu">
          <li>
            <InnerLink to="/dashboard" className="waves-effect">
              <i className="bx bx-line-chart"></i>
              <span>Dashboard</span>
            </InnerLink>
          </li>

          {["admin", "agent"].includes(role) && (
            <li>
              <OutterLink to="/#" className="has-arrow waves-effect">
                <i className="bx bx-receipt"></i>
                <span>Orders</span>
              </OutterLink>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <InnerLink to="/order">Create Order</InnerLink>
                </li>
                <li>
                  <InnerLink to="/orders">Orders</InnerLink>
                </li>
              </ul>
            </li>
          )}

          <li>
            <OutterLink to="/#" className="has-arrow waves-effect">
              <i className="bx bx-message-square-dots"></i>
              <span>Enquiries</span>
            </OutterLink>
            <ul className="sub-menu" aria-expanded="false">
              <li>
                <InnerLink to="/enquiry">Add Enquiry</InnerLink>
              </li>
              <li>
                <InnerLink to="/enquiries">Enquiries</InnerLink>
              </li>
            </ul>
          </li>

          {["admin", "agent"].includes(role) && (
            <li>
              <OutterLink to="/#" className="has-arrow waves-effect">
                <i className="bx bxs-user-detail"></i>
                <span>Clients</span>
              </OutterLink>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <InnerLink to="/client">Add Client</InnerLink>
                </li>
                <li>
                  <InnerLink to="/clients">Clients</InnerLink>
                </li>
              </ul>
            </li>
          )}

          {role === "admin" && (
            <li>
              <OutterLink to="/#" className="has-arrow waves-effect">
                <i className="bx bx-group"></i>
                <span>Users</span>
              </OutterLink>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <InnerLink to="/user">Add User</InnerLink>
                </li>
                <li>
                  <InnerLink to="/users">Users</InnerLink>
                </li>
              </ul>
            </li>
          )}

          {role === "admin" && (
            <li>
              <InnerLink to="/settings" className="waves-effect">
                <i className="bx bx-wrench"></i>
                <span>Settings</span>
              </InnerLink>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default withRouter(SidebarContent);
