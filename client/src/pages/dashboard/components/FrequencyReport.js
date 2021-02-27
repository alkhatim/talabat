import { memo } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { Line } from "react-chartjs-2";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default memo(({ frequency }) => {
  const max = Math.max(...frequency.map((month) => month.value));
  const dataset = new Array(12);
  for (let month of frequency) {
    dataset[month.month - 1] = month.value;
  }

  const data = {
    labels: months,
    datasets: [
      {
        label: "Orders Frequency",
        backgroundColor: "rgba(85, 110, 230, 0.2)",
        borderColor: "#556ee6",
        data: dataset,
      },
    ],
  };

  const options = {
    legend: false,
    scales: {
      yAxes: [
        {
          ticks: {
            max: max + Math.ceil(max / 7),
            min: 0,
            stepSize: Math.ceil(max / 7),
          },
          gridLines: {
            drawOnChartArea: false,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
        },
      ],
    },
  };

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-4">Orders Frequency</CardTitle>
        <Line width={400} height={300} data={data} options={options} />
      </CardBody>
    </Card>
  );
});
