import React, { FC } from "react";
import { ChartPropTypes } from "../Types";
import { useTranslation } from "react-i18next";
import FeatureInfoDownloadRosa from "../../../node_modules/terriajs/lib/ReactViews/FeatureInfo/FeatureInfoDownloadRosa";

type Props_TabFrequenzeRosa = {
  mostra: boolean;
  datiTabella: {
    datirosa: ChartPropTypes;
    quota: string;
    lat: string;
    long: string;
  };
  viewState: any;
  baseFilename: string;
};
const TabFrequenzeRosa: FC<Props_TabFrequenzeRosa> = ({
  mostra,
  datiTabella,
  viewState,
  baseFilename
}) => {
  // const data = datiTabella.datirosa.chartData
  // const columns = datirosa.columns
  const { t } = useTranslation();
  // console.log('TabFrequenzeRosa datiTabella',datiTabella)
  const datixDownload = {
    dati_rosa: datiTabella.datirosa.chartData,
    quota: datiTabella.quota,
    lat: datiTabella.lat,
    long: datiTabella.long
  };

  if (mostra) {
    // console.log('datirosa',datirosa)
    return (
      <>
        <h2>{t("rosaDeiVenti.titleTabella")}</h2>
        <TabRosa dati={datiTabella.datirosa} />
        <FeatureInfoDownloadRosa
          key="download"
          viewState={viewState}
          data={datixDownload}
          name={baseFilename}
        />
      </>
    );
  }
  return null;
};
export default TabFrequenzeRosa;

type Props_TabRosa = {
  dati: ChartPropTypes;
};
const TabRosa: FC<Props_TabRosa> = ({ dati }) => {
  // const TabRosa = (dati: ChartPropTypes) => {
  const data = dati.chartData;
  const columns = dati.columns;

  // console.log('columns',columns)
  // console.log('data',data)

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
