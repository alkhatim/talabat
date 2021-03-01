import { memo } from "react";
import { Card, CardBody, CardTitle, Progress, Row, Col } from "reactstrap";
import getColor from "../utils/getColor";
import sortStatuses from "../utils/sortStatuses";

export default memo(({ status }) => {
  status = status.sort(sortStatuses);
  const total = status.reduce((prev, curr) => (prev += curr.value), 0);

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-4">Orders by Status</CardTitle>
        <Row>
          <Col xs={5}>
            <i className="bx bx-package text-primary display-4" />
          </Col>
          <Col xs={7}>
            <h3>{total || 0}</h3>
            <h5>Total Number of Orders</h5>
          </Col>
        </Row>

        <div className="table-responsive mt-4">
          <table className="table table-centered table-nowrap mb-2">
            <tbody>
              {status.map((status) => (
                <tr>
                  <td style={{ width: "30%" }}>
                    <p className="mb-0">{status.status}</p>
                  </td>
                  <td style={{ width: "25%" }}>
                    <h5 className="mb-0">{status.value}</h5>
                  </td>
                  <td>
                    <Progress
                      value={(status.value * 100) / total}
                      color={getColor(status.status)}
                      className="bg-transparent"
                      size="lg"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
});
