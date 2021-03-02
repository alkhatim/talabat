import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import Breadcrumbs from "../../components/common/Breadcrumb";
import OrdersTable from "./components/OrdersTable";
import { getOrders } from "../../store/actions/orderActions";

const Orders = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((store) => store.orders);
  const [display, setDisplay] = useState("active");

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  let data;
  switch (display) {
    case "active":
      data = orders.filter(
        (item) => item.status !== "CANCELED" && item.status !== "COMPLETED"
      );
      break;
    case "completed":
      data = orders.filter((item) => item.status === "COMPLETED");
      break;

    default:
      data = orders;
      break;
  }

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Orders" breadcrumbItem="All Orders" />
        <OrdersTable orders={data} display={display} setDisplay={setDisplay} />
      </Container>
    </div>
  );
};

export default Orders;
