import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import messages from "../../services/messages";
import Breadcrumbs from "../../components/common/Breadcrumb";
import { useSelector } from "react-redux";
import {
  getOrder,
  updateOrderStatus,
  payOrder,
} from "../../store/actions/orderActions";
import OrderTimeline from "./components/OrderTimeline";
import OrderPay from "./components/OrderPay";

const Order = () => {
  const params = useParams();
  const location = useLocation();
  const { role } = useSelector((store) => store.auth.user);

  const [order, setOrder] = useState({
    _id: "",
    client: "",
    orderNumber: "",
    category: "",
    description: "",
    delivery: "",
    address: "",
    notes: "",
    link: "",
    isUrgent: false,
    price: {
      itemPrice: "",
      deliveryPrice: "",
      shippingPrice: "",
      itemCurrency: "",
      profit: "",
      payoutCurrency: "",
    },
  });
  const [paid, setPaid] = useState("");

  const handleCancel = async () => {
    const result = await updateOrderStatus(params.id, "CANCELED");
    if (result) {
      setOrder(result);
      messages.success("Canceled Successfuly");
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    const result = await updateOrderStatus(params.id, newStatus);
    if (result) {
      setOrder(result);
      messages.success("Updated Successfuly");
    }
  };

  const handlePay = async () => {
    const result = await payOrder(params.id, paid);
    if (result) {
      setOrder(result);
      messages.success("Updated Successfuly");
    }
  };

  const handlePaidChange = (e) => {
    setPaid(e.target.value);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getOrder(params.id);
      if (result) setOrder(result);
    };
    if (location.state?.order) setOrder(location.state.order);
    else if (params.id) fetchOrder();
  }, []);

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="Order Info" breadcrumbItem="Orders" />
        <Row>
          <Col lg={role === "admin" ? "6" : "12"}>
            <OrderTimeline
              order={order}
              handleStatusUpdate={handleStatusUpdate}
            />
          </Col>
          {role === "admin" && (
            <Col lg="6">
              <OrderPay
                order={order}
                paid={paid}
                onPaidChange={handlePaidChange}
                onPay={handlePay}
                onCancel={handleCancel}
              />
            </Col>
          )}
        </Row>
      </Container>
      {/* container-fluid */}
    </div>
  );
};

export default Order;
