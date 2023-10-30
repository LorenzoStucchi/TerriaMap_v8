import React, { FC } from "react";
import { Chart } from "../WindRose";
import { ChartPropTypes } from "../Types";

type Props = {
  datirosa: ChartPropTypes;
};

const Rosavento: FC<Props> = ({ datirosa }) => (
  <div>
    <Chart
      chartData={datirosa.chartData}
      columns={datirosa.columns}
      responsive={false}
      legendGap={10}
      width={400}
      height={400}
    />
  </div>
);

export default Rosavento;
