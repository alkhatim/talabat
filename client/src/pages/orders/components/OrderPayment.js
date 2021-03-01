import { memo } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Button,
  InputGroupAddon,
  Input,
  InputGroup,
} from "reactstrap";

const OrderPayment = memo(({ order, onPay, onCancel, paid, onPaidChange }) => {
  return (
    <Card style={{ minHeight: "60vh" }}>
      <CardBody>
        <h4 className="card-title mb-4">Payment</h4>
        <Row className="mb-4">
          <Col lg={4}>
            <div>
              <p className="text-muted mb-4">
                <i className="mdi mdi-wallet mr-1" /> Total Amount
              </p>
              <h5>
                {order.price.payoutTotal?.toLocaleString("en-US", {
                  style: "currency",
                  currency: order.price.payoutCurrency,
                })}
              </h5>
            </div>
          </Col>
          <Col lg={4}>
            <div>
              <p className="text-muted mb-4">
                <i className="mdi mdi-wallet mr-1" /> Currently Paid
              </p>
              <h5>
                {order.price.paid?.toLocaleString("en-US", {
                  style: "currency",
                  currency: order.price.payoutCurrency,
                })}
              </h5>
            </div>
          </Col>
          <Col lg={4}>
            <div>
              <p className="text-muted mb-4">
                <i className="mdi mdi-wallet mr-1" /> Remaining Amount
              </p>
              <h5>
                {(
                  order.price.payoutTotal - order.price.paid || "0"
                )?.toLocaleString("en-US", {
                  style: "currency",
                  currency: order.price.payoutCurrency,
                })}
              </h5>
            </div>
          </Col>
        </Row>

        <div>
          <Label className="mb-4">Add Amount :</Label>

          <InputGroup className="mb-4">
            <InputGroupAddon addonType="prepend">
              <Label className="input-group-text">Total</Label>
            </InputGroupAddon>
            <Input
              type="number"
              className="form-control"
              value={paid}
              onChange={onPaidChange}
            />
            <InputGroupAddon addonType="append">
              <Label className="input-group-text">
                {order.price.payoutCurrency}
              </Label>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <Row>
          <Col lg={6} className="mb-4 text-center">
            <Button
              type="button"
              color="success"
              className="w-md"
              onClick={onPay}
            >
              Add Payment
            </Button>
          </Col>
          <Col lg={6} className="mb-4 text-center">
            <Button
              type="button"
              color="danger"
              className="w-md"
              onClick={onCancel}
            >
              Cancel Order
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
});

export default OrderPayment;
