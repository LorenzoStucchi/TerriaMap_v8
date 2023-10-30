import React from "react";
import PropTypes from "prop-types";

import MenuPanel from "terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuPanel.jsx";
import PanelStyles from "terriajs/lib/ReactViews/Map/Panels/panel.scss";
import Styles from "./related-maps.scss";
import classNames from "classnames";

import withTerriaRef from "terriajs/lib/ReactViews/HOCs/withTerriaRef"; //GOF HOC x Ref di aggancio dei punti del Tour
import { Trans, useTranslation, withTranslation } from "react-i18next"; //GOF x traduzione didascalie

import RosaventoContainer from "../Views/components/RosaventoARFContainer";

function AnalisiRose(props) {
  console.log("AnalisiRose");
  console.log(props);
  // const terria = props.terria;
  // console.log(terria.selectedFeature)

  const idpunto = props.idpunto;
  const livello = props.livello;
  const selectedFeature = props.selectedFeature;
  console.log(idpunto, livello, selectedFeature);
  const { t } = useTranslation(); //GOF x traduzione didascalie

  const dropdownTheme = {
    inner: Styles.dropdownInner,
    icon: "gallery"
  };

  // to select language config.json depending on the browser language
  var userLang = navigator.language || navigator.userLanguage;
  var analisi = "Additional tools";
  if (userLang === "it-IT" || userLang === "it") {
    analisi = "Rose dei venti";
  }

  return (
    <MenuPanel
      btnRef={props.refFromHOC} //GOF   Ref sul bottone per il Tour
      theme={dropdownTheme}
      btnText={analisi}
      smallScreen={props.smallScreen}
      viewState={props.viewState}
      btnTitle={analisi}
    >
      {/* titolo della pagina */}
      <div className={classNames(PanelStyles.header)}>
        <label className={PanelStyles.heading}>
          <h1> {t("Rose dei venti")} </h1>
        </label>
      </div>

      <div className={classNames(PanelStyles.header)}>
        <RosaventoContainer idpunto={idpunto} livello={livello} />
      </div>

      {/* rose dei venti */}
      <div className={classNames(PanelStyles.section, Styles.section)}>
        <ul class="list-group list-group-flush">
          <table>
            <tr>
              <td colspan="2">
                {/* <h2> ROSE DEI VENTI </h2> */}
                <h2>{t("ROSE DEI VENTI")}</h2>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  className={Styles.image}
                  src={require("../../wwwroot/images/modulo_calcolo.png")}
                  /*src={require("../../wwwroot/images/totem3_v3.png")}*/
                  alt="totem"
                />
              </td>
              <td>
                {" "}
                <p align="justify">
                  {/* {t("analisiAvanzate.infoValutazioneTecnicoEconomica")} */}
                  rappresentazione grafica della rosa dei venti per l'altezza
                  150m (livello 5)
                </p>
                <a
                  target="_blank"
                  //href="http://atlanteintegrato.rse-web.it/sankey.php"
                  // href={mod_calc_help}
                  href="http://localhost:3000/?idp=400946&liv=5"
                  className={Styles.link}
                >
                  {/* {t("analisiAvanzate.approfondisci")} */}
                  http://localhost:3000/?idp=400946&liv=5
                </a>{" "}
                <br></br>
                <br></br>
                {t("analisiAvanzate.perAccedere")}{" "}
                <a
                  className={Styles.link}
                  href="http://localhost:3000/?idp=400946&liv=1"
                >
                  http://localhost:3000/?idp=400946&liv=1
                </a>
                .
              </td>
            </tr>
          </table>
        </ul>
      </div>
    </MenuPanel>
  );
}

AnalisiRose.propTypes = {
  viewState: PropTypes.object.isRequired,
  smallScreen: PropTypes.bool
};

// export default AnalisiRose;
export const TOOLS_PANEL_NAME = "MenuBarToolsButton"; //GOF
export default withTerriaRef(AnalisiRose, TOOLS_PANEL_NAME); //GOF esporto AnalisiRose con il Ref x il Tour
