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

const OrderPay = memo(({ order, onPay, onCancel, paid, onPaidChange }) => {
  return (
    <Card>
      <CardBody>
        <h4 className="card-title mb-4">Payment</h4>
        <Row className="mb-4">
          <Col lg={6}>
            <div>
              <p className="text-muted mb-4">
                <i className="mdi mdi-wallet mr-1" /> Total Payment Amount
              </p>
              <h5>
                {order.price.payoutTotal?.toLocaleString("en-US", {
                  style: "currency",
                  currency: order.price.payoutCurrency,
                })}
              </h5>
            </div>
          </Col>
          <Col lg={6}>
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

        <Row className="mb-4">
          <Col lg={6} className="text-right">
            <Button
              type="button"
              color="success"
              className="w-md"
              onClick={onPay}
            >
              Add Payment
            </Button>
          </Col>
          <Col lg={6} className="text-left">
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

export default OrderPay;
