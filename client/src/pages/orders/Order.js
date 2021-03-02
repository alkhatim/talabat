import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Form,
  Input,
} from "reactstrap";
import Select from "react-select";
import messages from "../../services/messages";
import Breadcrumbs from "../../components/common/Breadcrumb";
import validateOrder from "./utils/validateOrder";
import {
  getOrder,
  updateOrder,
  createOrder,
} from "../../store/actions/orderActions";
import { getCategories } from "../../store/actions/configActions";
import { getClientsLookup } from "../../store/actions/clientActions";

const Order = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();

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
  const [categories, setCategories] = useState([]);
  const [clients, setClients] = useState([]);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e) => {
    setOrder({
      ...order,
      price: { ...order.price, [e.target.name]: e.target.value },
    });
  };

  const handleClientChange = (v) => {
    setOrder({ ...order, client: v });
  };

  const handleCategoryChange = (v) => {
    setOrder({ ...order, category: v });
  };

  const handleSubmit = async () => {
    let result;
    let payload = {
      ...order,
      _id: order._id || undefined,
      client: order.client?.value,
      category: order.category?.value,
    };

    const { error } = validateOrder(payload);
    if (error) return messages.error(error.details[0].message);

    if (payload._id) {
      result = await updateOrder(params.id, payload);
    } else {
      result = await createOrder(payload);
    }
    if (result) {
      messages.success("Saved Successfuly");
      setOrder({
        ...result,
        client: {
          value: result.client._id,
          label: result.client.name,
        },
        category: {
          value: result.category,
          label: result.category,
        },
      });
      history.push(`/order/${result._id}/info`);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getOrder(params.id);
      if (order)
        setOrder({
          ...result,
          client: {
            value: result.client._id,
            label: result.client.name,
          },
          category: {
            value: result.category,
            label: result.category,
          },
        });
    };
    const fetchClients = async () => {
      const result = await getClientsLookup();
      if (result)
        setClients(
          result.map((client) => ({
            value: client._id,
            label: client.name,
          }))
        );
    };
    const fetchCategories = async () => {
      const result = await getCategories();
      if (result)
        setCategories(
          result.map((category) => ({
            value: category.name,
            label: category.name,
          }))
        );
    };
    if (location.state?.order)
      setOrder({
        ...location.state.order,
        client: {
          value: location.state.order.client._id,
          label: location.state.order.client.name,
        },
        category: {
          value: location.state.order.category,
          label: location.state.order.category,
        },
      });
    else if (params.id) fetchOrder();
    fetchCategories();
    fetchClients();
  }, []);

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="Orders" breadcrumbItem="Order" />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <CardTitle className="mb-5">Order Details</CardTitle>
                <Row>
                  <Col lg={6}>
                    <Form>
                      <FormGroup>
                        <Label for="orderNumber">Order Number</Label>
                        <Input
                          id="orderNumber"
                          name="orderNumber"
                          type="text"
                          className="form-control"
                          value={order.orderNumber}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <FormGroup className="select2-container">
                        <Label>Client</Label>
                        <Select
                          id="client"
                          name="client"
                          isClearable={true}
                          value={order.client}
                          onChange={handleClientChange}
                          options={clients}
                          classNamePrefix="select2-selection"
                        />
                      </FormGroup>
                      <FormGroup className="select2-container">
                        <Label>Category</Label>
                        <Select
                          id="category"
                          name="category"
                          isClearable={true}
                          value={order.category}
                          onChange={handleCategoryChange}
                          options={categories}
                          classNamePrefix="select2-selection"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                          id="description"
                          name="description"
                          type="text"
                          className="form-control"
                          value={order.description}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="delivery">Delivery Type</Label>
                        <select
                          id="delivery"
                          name="delivery"
                          className="form-control"
                          value={order.delivery}
                          onChange={handleChange}
                        >
                          <option value="">Choose...</option>
                          <option value="FULL">Full Delivery</option>
                          <option value="PICKUP">Self Pickup</option>
                        </select>
                      </FormGroup>
                      <FormGroup>
                        <Label for="address">Delivery Adress</Label>
                        <Input
                          id="address"
                          name="address"
                          type="text"
                          className="form-control"
                          value={order.address}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="link">Item Link</Label>
                        <Input
                          id="link"
                          name="link"
                          type="text"
                          className="form-control"
                          value={order.link}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="notes">Notes</Label>
                        <Input
                          id="notes"
                          name="notes"
                          type="textarea"
                          maxLength="256"
                          rows="3"
                          placeholder="Any additional notes..."
                          className="form-control"
                          value={order.notes}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                  <Col lg={6}>
                    <Form>
                      <FormGroup>
                        <Label for="itemCurrency">Item Currency</Label>
                        <select
                          id="itemCurrency"
                          name="itemCurrency"
                          className="form-control"
                          value={order.price.itemCurrency}
                          onChange={handlePriceChange}
                        >
                          <option value="">Currency...</option>
                          <option value="USD">USD</option>
                          <option value="SDG">SDG</option>
                          <option value="AED">AED</option>
                          <option value="SAR">SAR</option>
                        </select>
                      </FormGroup>
                      <FormGroup>
                        <Label for="itemPrice">Item Price</Label>
                        <Input
                          id="itemPrice"
                          name="itemPrice"
                          type="number"
                          className="form-control"
                          value={order.price.itemPrice}
                          onChange={handlePriceChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="deliveryPrice">Delivery Price</Label>
                        <Input
                          id="deliveryPrice"
                          name="deliveryPrice"
                          type="number"
                          className="form-control"
                          value={order.price.deliveryPrice}
                          onChange={handlePriceChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="shippingPrice">Shipping Price</Label>
                        <Input
                          id="shippingPrice"
                          name="shippingPrice"
                          type="number"
                          className="form-control"
                          value={order.price.shippingPrice}
                          onChange={handlePriceChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="profit">Profit</Label>
                        <Input
                          id="profit"
                          name="profit"
                          type="text"
                          className="form-control"
                          value={order.price.profit}
                          onChange={handlePriceChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="payoutCurrency">Payout Currency</Label>
                        <select
                          id="payoutCurrency"
                          name="payoutCurrency"
                          className="form-control"
                          value={order.price.payoutCurrency}
                          onChange={handlePriceChange}
                        >
                          <option value="">Currency...</option>
                          <option value="USD">USD</option>
                          <option value="SDG">SDG</option>
                          <option value="AED">AED</option>
                          <option value="SAR">SAR</option>
                        </select>
                      </FormGroup>
                      <FormGroup>
                        <div
                          className="custom-control custom-switch"
                          dir="ltr"
                          style={{ marginTop: "3rem" }}
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="isUrgent"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="isUrgent"
                            onClick={() => {
                              setOrder({
                                ...order,
                                isUrgent: !order.isUrgent,
                              });
                            }}
                          >
                            Priority order?
                          </label>
                        </div>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <div className="center">
                  <Button
                    color="success"
                    className="w-md"
                    onClick={handleSubmit}
                  >
                    <i className="bx bx-check-double font-size-16 align-middle mr-2" />
                    Confirm
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* container-fluid */}
    </div>
  );
};

export default Order;
