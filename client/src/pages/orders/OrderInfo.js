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
  getFile,
  getFiles,
  deleteFile,
  uploadFile,
} from "../../store/actions/orderActions";
import OrderTimeline from "./components/OrderTimeline";
import OrderPayment from "./components/OrderPayment";
import FilesTable from "./components/FilesTable";
import FileForm from "./components/FileForm";

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
  const [files, setFiles] = useState([]);
  const [newFile, setNewFile] = useState({ name: "", mime: "", data: "" });
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

  const handleFileDelete = async (id) => {
    const result = await deleteFile(id);
    if (result) {
      messages.success("Deleted Successfuly");
      setFiles(files.filter((file) => file._id !== result._id));
    }
  };

  const handleFileOpen = async (id) => {
    const result = await getFile(id);
    if (result) window.open(result, "_blank");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setNewFile({ data: reader.result, name: file.name, mime: file.type });
      };
    } catch (error) {
      messages.error(error);
    }
  };

  const handleUpload = async () => {
    const result = await uploadFile({ ...newFile, owner: params.id });
    if (result) {
      setFiles(files.concat(result));
      setNewFile({ name: "", mime: "", data: "" });
      messages.success("Uploaded Successfuly");
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getOrder(params.id);
      if (result) setOrder(result);
    };
    const fetchFiles = async () => {
      const result = await getFiles(params.id);
      if (result) setFiles(result);
    };
    if (location.state?.order) setOrder(location.state.order);
    else if (params.id) {
      fetchOrder();
    }
    if (params.id) fetchFiles();
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
              <OrderPayment
                order={order}
                paid={paid}
                onPaidChange={handlePaidChange}
                onPay={handlePay}
                onCancel={handleCancel}
              />
            </Col>
          )}
        </Row>
        <Row>
          <Col lg={6}>
            <FileForm
              file={newFile}
              onFileChange={handleFileChange}
              onUpload={handleUpload}
            />
          </Col>
          <Col lg={6}>
            <FilesTable
              files={files}
              onDelete={handleFileDelete}
              onOpen={handleFileOpen}
            />
          </Col>
        </Row>
      </Container>
      {/* container-fluid */}
    </div>
  );
};

export default Order;
