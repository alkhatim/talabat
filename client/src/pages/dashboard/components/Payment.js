import { memo } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import ReactApexChart from "react-apexcharts";

export default memo(({ payment }) => {
  const options = {
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 270,
        hollow: {
          size: "40%",
        },
        dataLabels: {
          value: {
            formatter: function (e) {
              return Math.round(parseFloat(e)).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              });
            },
          },
          total: {
            show: true,
            label: "Total",
            color: "#000",
            fontSize: "16px",
            fontFamily: void 0,
            fontWeight: 600,
            formatter: function (e) {
              return e.globals.seriesTotals[0].toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              });
            },
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    colors: ["#3452e1", "#f1b44c", "#34c38f"],
    labels: ["Total", "Paid", "Profit"],
    legend: { show: !1 },
  };

  return (
    <Card>
      <CardBody>
        <h4 className="card-title mb-3">Payment Status</h4>

        <Row>
          <Col lg="8">
            <div>
              <div id="wallet-balance-chart" className="apex-charts">
                <ReactApexChart
                  options={options}
                  series={payment}
                  type="radialBar"
                  height={300}
                />
              </div>
            </div>
          </Col>

          <Col lg="4" className="text-center mt-4">
            <div>
              <p className="mb-2">
                <i className="mdi mdi-circle align-middle font-size-10 mr-2 text-primary" />{" "}
                Total Orders Amount
              </p>
              <h5>
                {payment[0]?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </h5>
            </div>

            <div className="mt-4 pt-2">
              <p className="mb-2">
                <i className="mdi mdi-circle align-middle font-size-10 mr-2 text-warning" />{" "}
                Currently Paid
              </p>
              <h5>
                {payment[1]?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </h5>
            </div>

            <div className="mt-4 pt-2">
              <p className="mb-2">
                <i className="mdi mdi-circle align-middle font-size-10 mr-2 text-success" />{" "}
                Profit
              </p>
              <h5>
                {payment[2]?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </h5>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
});
