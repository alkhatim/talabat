import { memo } from "react";
import { Card, CardBody, Media } from "reactstrap";

export default memo(({ notifications }) => {
  const data = [];
  if (notifications.lateOrders)
    data.push({
      title: "Late Orders",
      message: `${notifications.lateOrders} orders are taking too long to arrive to the client!`,
      icon: "bx bx-time-five text-danger bx-md",
    });
  if (notifications.receivedOrders)
    data.push({
      title: "Non-shipped Orders",
      message: `${notifications.receivedOrders} orders are waiting to be shipped`,
      icon: "bx bx-package text-success bx-md",
    });
  if (notifications.arrivedOrders)
    data.push({
      title: "Non-delivered Orders",
      message: `${notifications.arrivedOrders} orders should be out for delivery`,
      icon: "bx bx-car text-primary bx-md",
    });
  if (notifications.newEnquiries)
    data.push({
      title: "Enquiries",
      message: `${notifications.newEnquiries} un-answered enquries, customer support are waiting`,
      icon: "bx bx-chat text-primary bx-md",
    });

  return (
    <Card>
      <CardBody>
        <h4 className="card-title mb-4">Notifications</h4>
        <ul className="list-group">
          {data.map((notification) => (
            <li className="list-group-item" style={{ border: "none" }}>
              <Media>
                <div className="avatar-sm mr-3">
                  <span className="avatar-title rounded-circle bg-light">
                    <i className={notification.icon}></i>
                  </span>
                </div>
                <Media body>
                  <h5 className="font-size-14">{notification.title}</h5>
                  <p className="text-muted">{notification.message}</p>
                </Media>
              </Media>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
});
