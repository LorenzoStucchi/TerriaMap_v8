import React from "react";
import PropTypes from "prop-types";

import MenuPanel from "terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuPanel.jsx";
import PanelStyles from "terriajs/lib/ReactViews/Map/Panels/panel.scss";
import Styles from "./related-maps.scss";
import classNames from "classnames";

function AnalisiAvanzate(props) {
  const dropdownTheme = {
    inner: Styles.dropdownInner,
    icon: "gallery"
  };

  // to select language config.json depending on the browser language
  var userLang = navigator.language || navigator.userLanguage;
  var totem_link = "/#en_totemweb";
  var analisi = "Additional tools";
  //if (userLang === "it-IT" || userLang === "it") {
  //  totem_link = "/#it_totemweb";
  //  analisi = "Analisi Avanzate";
  //}

  return (
    <MenuPanel
      theme={dropdownTheme}
      btnText={analisi}
      smallScreen={props.smallScreen}
      viewState={props.viewState}
      btnTitle={analisi}
    >
      {/* titolo della pagina */}
      <div className={classNames(PanelStyles.header)}>
        <label className={PanelStyles.heading}>
          <h1> Navigate among the supplementary tools</h1>
        </label>
      </div>

      {/* caso multi energy*/}
      {/* collegamento a WEN*/}
      {/* collegamento a mapstore */}
      <div className={classNames(PanelStyles.section, Styles.section)}>
        <ul class="list-group list-group-flush">
          <table>
            <tr>
              <td colspan="2">
                {/* <h2> MODULO DI CALCOLO </h2> */}
                <h2>TITLE</h2>
              </td>
            </tr>
            <tr>
              <td>
                <a target="_blank" href="/marinewind_additional_tools.html">
                  <img
                    className={Styles.image}
                    src={require("../../wwwroot/images/marinewind.png")}
                    alt="Image not found"
                  />
                </a>
              </td>
              <td>
                <p align="justify">
                  WORK IN PROGRESS Insert text and{" "}
                  <a
                    target="_blank"
                    link
                    className={Styles.link}
                    href="/marinewind_additional_tools.html"
                  >
                    {" "}
                    LINK
                  </a>
                </p>
              </td>
            </tr>
          </table>
        </ul>
      </div>
    </MenuPanel>
  );
}

AnalisiAvanzate.propTypes = {
  viewState: PropTypes.object.isRequired,
  smallScreen: PropTypes.bool
};

export default AnalisiAvanzate;
