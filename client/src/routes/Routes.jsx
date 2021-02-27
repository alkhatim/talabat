import React from "react";
import { Redirect } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/auth/Profile";
import Order from "../pages/orders/Order";
import Orders from "../pages/orders/Orders";
import OrderInfo from "../pages/orders/OrderInfo";
import Enquiry from "../pages/enquiries/Enquiry";
import Enquiries from "../pages/enquiries/Enquiries";
import EnquiryInfo from "../pages/enquiries/EnquiryInfo";
import Client from "../pages/clients/Client";
import Clients from "../pages/clients/Clients";
import User from "../pages/users/User";
import Users from "../pages/users/Users";
import Settings from "../pages/settings/Settings";

const privateRoutes = [
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
  { path: "/dashboard", component: Dashboard },
  { path: "/profile", component: Profile },
  { path: "/orders", component: Orders },
  { path: "/order", admin: true, component: Order },
  { path: "/order/:id", admin: true, component: Order },
  { path: "/order/:id/info", component: OrderInfo },
  { path: "/enquiries", component: Enquiries },
  { path: "/enquiry", component: Enquiry },
  { path: "/enquiry/:id", component: Enquiry },
  { path: "/enquiry/:id/info", component: EnquiryInfo },
  { path: "/clients", component: Clients },
  { path: "/client", component: Client },
  { path: "/client/:id", component: Client },
  { path: "/users", admin: true, component: Users },
  { path: "/user", admin: true, component: User },
  { path: "/user/:id", admin: true, component: User },
  { path: "/settings", admin: true, component: Settings },
];

const publicRoutes = [{ path: "/login", component: Login }];

export { privateRoutes, publicRoutes };
