import React from "react";
import { Redirect } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/auth/Profile";
import Order from "../pages/orders/Order";
import Orders from "../pages/orders/Orders";
import OrderInfo from "../pages/orders/OrderInfo";
import Client from "../pages/clients/Client";
import Clients from "../pages/clients/Clients";
import User from "../pages/users/User";
import Users from "../pages/users/Users";

const privateRoutes = [
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
  { path: "/dashboard", component: Dashboard },
  { path: "/profile", component: Profile },
  { path: "/orders", component: Orders },
  { path: "/order", component: Order },
  { path: "/order/:id", component: Order },
  { path: "/order/:id/info", component: OrderInfo },
  { path: "/clients", component: Clients },
  { path: "/client", component: Client },
  { path: "/client/:id", component: Client },
  { path: "/users", component: Users },
  { path: "/user", admin: true, component: User },
  { path: "/user/:id", admin: true, component: User },
];

const publicRoutes = [{ path: "/login", component: Login }];

export { privateRoutes, publicRoutes };
