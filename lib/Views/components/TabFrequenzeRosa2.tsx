import React, { FC } from "react";
import { ChartPropTypes } from "../Types";
import { useTranslation } from "react-i18next";

type Props = {
  mostra: boolean;
  datirosa: ChartPropTypes;
};
const TabFrequenzeRosa: FC<Props> = ({ mostra, datirosa }) => {
  const data = datirosa.chartData;
  const columns = datirosa.columns;
  const { t } = useTranslation();

  console.log("columns", columns);
  console.log("data", data);

  if (mostra) {
    // console.log('datirosa',datirosa)
    return (
      <>
        <h2>{t("rosaDeiVenti.titleTabella")}</h2>
        <TabRosa dati={datirosa} />
      </>
    );
  }
  return null;
};
export default TabFrequenzeRosa;

type Props2 = { dati: ChartPropTypes };
const TabRosa: FC<Props2> = ({ dati }) => {
  // const TabRosa = (dati: ChartPropTypes) => {
  const data = dati.chartData;
  const columns = dati.columns;

  console.log("columns", columns);
  console.log("data", data);

  return (
    <>
      <table>
        <tbody>
          <tr>
            {columns.map((val, key) => (
              <th key={key}>{val}</th>
            ))}
            <th>(m/s)</th>
            <th>total</th>
          </tr>
          {data.map((val, key) => (
            <tr key={key}>
              <td>{val.angle}</td>
              <td>{val["0-5"]}</td>
              <td>{val["5-10"]}</td>
              <td>{val["10-15"]}</td>
              <td>{val["15-20"]}</td>
              <td>{val["20-25"]}</td>
              <td></td>
              <td>{val.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
