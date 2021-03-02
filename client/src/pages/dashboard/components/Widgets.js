import { memo } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

export default memo(({ data }) => {
  const widgets = [
    {
      title: "Orders",
      icon: "bx bx-cart-alt",
      value: `${data.thisWeekOrders} orders`,
      badgeValue: (data.thisWeekOrders / data.lastWeekOrders) * 100 - 100,
      color: data.thisWeekOrders > data.lastWeekOrders ? "success" : "danger",
    },
    {
      title: "Profit",
      icon: "bx bx-dollar",
      value: data.thisWeekProfit?.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
      badgeValue: (data.thisWeekProfit / data.lastWeekProfit) * 100 - 100,
      color: data.thisWeekProfit > data.lastWeekProfit ? "success" : "danger",
    },
  ];

  return (
    <>
      <Row>
        {widgets.map((widget, key) => (
          <Col lg={6}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-center mb-3">
                  <div className="avatar-xs mr-3">
                    <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-18">
                      <i className={widget.icon} />
                    </span>
                  </div>
                  <h5 className="font-size-14 mb-0">{widget.title}</h5>
                </div>
                <div className="text-muted ml-2 mt-4">
                  <h4>{widget.value}</h4>
                  <span
                    className={
                      "badge badge-soft-" + widget.color + " font-size-12"
                    }
                  >
                    {widget.badgeValue}%
                  </span>
                  <i
                    className={`mdi mdi-chevron-${
                      widget.badgeValue > 0
                        ? "up text-success"
                        : "down text-danger"
                    } ml-1 `}
                  />
                  from previous week
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
});
