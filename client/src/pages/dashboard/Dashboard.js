import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import StatusReport from "./components/StatusReport";
import CategoriesReport from "./components/CategoriesReport";
import Notifications from "./components/Notifications";
import PaymentReport from "./components/PaymentReport";
import Widgets from "./components/Widgets";
import Social from "./components/Social";
import {
  getStatus,
  getCategories,
  getNotifications,
  getPayment,
  getWidgets,
} from "../../store/actions/dashboardActions";

const Dashboard = () => {
  const disptach = useDispatch();
  const { categories, status, notifications, payment, widgets } = useSelector(
    (store) => store.dashboard
  );

  useEffect(() => {
    disptach(getStatus());
    disptach(getCategories());
    disptach(getNotifications());
    disptach(getPayment());
    disptach(getWidgets());
  }, []);

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <h4>Dashboard</h4>
          <Row>
            <Col xl={4} lg={6}>
              <Notifications notifications={notifications} />
              <PaymentReport payment={payment} />
            </Col>
            <Col xl={4} lg={6}>
              <StatusReport status={status} />
              <Widgets data={widgets} />
            </Col>
            <Col xl={4} lg={6}>
              <CategoriesReport categories={categories} />
              <Social  />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
