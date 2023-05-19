import React from "react";
import PropTypes from "prop-types";

import MenuPanel from "terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuPanel.jsx";
import PanelStyles from "terriajs/lib/ReactViews/Map/Panels/panel.scss";
import Styles from "./related-maps.scss";
import classNames from "classnames";

function Multienergy(props) {
  const dropdownTheme = {
    inner: Styles.dropdownInner,
    icon: "gallery"
  };

  function getVar1() {
    let cod_reg = prompt("Inserisci il codice della regione:");
    // Var 1 è parte dell url a cui fa la chiamata
    // cod_reg è una var locale qualsiasi
    fetch(`http://localhost:3002/Var1/${cod_reg}`, {
      method: "GET"
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
      });
  }

  // to select language config.json depending on the browser language
  var userLang = navigator.language || navigator.userLanguage;
  var totem_link = "/#en_totemweb";
  if (userLang === "it-IT" || userLang === "it") {
    totem_link = "/#it_totemweb";
  }

  return (
    <MenuPanel
      theme={dropdownTheme}
      btnText="Multienergy"
      smallScreen={props.smallScreen}
      viewState={props.viewState}
      btnTitle="Multienergy case study"
    ></MenuPanel>
  );
}

Multienergy.propTypes = {
  viewState: PropTypes.object.isRequired,
  smallScreen: PropTypes.bool
};

export default Multienergy;
