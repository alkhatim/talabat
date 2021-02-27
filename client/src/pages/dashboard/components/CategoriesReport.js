import { memo } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import ReactEcharts from "echarts-for-react";
import getColors from "../utils/randomColors";

export default memo(({ categories }) => {
  const options = {
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c}",
    },
    color: getColors(),
    series: [
      {
        name: "Total orders",
        type: "pie",
        data: categories,
      },
    ],
  };

  return (
    <Card>
      <CardBody>
        <CardTitle>Categories Breakdown</CardTitle>
        <ReactEcharts option={options} />
      </CardBody>
    </Card>
  );
});
