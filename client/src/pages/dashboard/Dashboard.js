import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import StatusReport from "./components/StatusReport";
import CategoriesReport from "./components/CategoriesReport";
import Notifications from "./components/Notifications";
import {
  getStatus,
  getCategories,
  getNotifications,
} from "../../store/actions/dashboardActions";

const Dashboard = () => {
  const disptach = useDispatch();
  const { categories, status, notifications } = useSelector(
    (store) => store.dashboard
  );

  useEffect(() => {
    disptach(getStatus());
    disptach(getCategories());
    disptach(getNotifications());
  }, []);

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <h4>Dashboard</h4>
          <Row>
            <Col xl={4} lg={6}>
              <Notifications notifications={notifications} />
            </Col>
            <Col xl={4} lg={6}>
              <StatusReport status={status} />
            </Col>
            <Col xl={4} lg={6}>
              <CategoriesReport categories={categories} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
