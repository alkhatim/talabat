import { memo } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle } from "reactstrap";
import getTimeline from "../utils/getTimeline";

const OrderTimeline = memo(({ order, handleStatusUpdate }) => {
  const { role } = useSelector((store) => store.auth.user);

  const statuses = order._id ? getTimeline(order) : [];
  const activeId = statuses.find((item) => item.active)?.id;

  const handleClick = (status) => {
    if ([activeId + 1, activeId - 1].includes(status.id) && role === "admin")
      handleStatusUpdate(status.statusTitle.toUpperCase());
  };

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-5">Order Timeline</CardTitle>
        <div className="">
          <ul className="verti-timeline list-unstyled">
            {statuses.map((status, key) => (
              <li key={key} className="event-list">
                <div className="event-timeline-dot">
                  <i
                    className={
                      status.active
                        ? "bx bx-right-arrow-circle bx-fade-right"
                        : "bx bx-right-arrow-circle"
                    }
                  />
                </div>
                <div
                  className={`media ${
                    [activeId + 1, activeId - 1].includes(status.id) &&
                    role === "admin"
                      ? "hand"
                      : ""
                  }`}
                  onClick={() => handleClick(status)}
                >
                  <div className="mr-3">
                    <i className={status.iconClass} />
                  </div>
                  <div className="media-body">
                    <div>
                      <h5>{status.statusTitle}</h5>
                      <p className="text-muted">{status.description}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardBody>
    </Card>
  );
});

export default OrderTimeline;
