import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import Breadcrumbs from "../../components/common/Breadcrumb";
import OrdersTable from "./components/OrdersTable";
import { getOrders } from "../../store/actions/orderActions";

const Orders = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((store) => store.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Orders" breadcrumbItem="All Orders" />
        <OrdersTable orders={orders} />{" "}
      </Container>
    </div>
  );
};

export default Orders;
