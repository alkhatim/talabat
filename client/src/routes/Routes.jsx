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
];

const publicRoutes = [{ path: "/login", component: Login }];

export { privateRoutes, publicRoutes };
