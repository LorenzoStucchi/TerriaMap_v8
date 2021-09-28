import React from "react";
import PropTypes from "prop-types";

import MenuPanel from "terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuPanel.jsx";
import PanelStyles from "terriajs/lib/ReactViews/Map/Panels/panel.scss";
import Styles from "./related-maps.scss";
import classNames from "classnames";

function ProvaVar1(props) {
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

  return (
    <MenuPanel
      theme={dropdownTheme}
      btnText="Prova Var1"
      smallScreen={props.smallScreen}
      viewState={props.viewState}
      btnTitle="inserito bottone"
    >
      <div className={classNames(PanelStyles.header)}>
        <label className={PanelStyles.heading}>inserito bott. var1</label>
      </div>

      <p>prova il link qui sotto e poi il bottone</p>

      <div className={classNames(PanelStyles.section, Styles.section)}>
        <a target="_blank" href="http://sunrise.rse-web.it/">
          <img
            className={Styles.image}
            src={require("../../wwwroot/images/sunrise.jpg")}
            alt="SUNRISE"
          />
        </a>

        <a
          target="_blank"
          className={Styles.link}
          href="http://sunrise.rse-web.it/"
        >
          SUNRISE
        </a>

        <p>prova connessione al sito rse sunrise</p>
      </div>

      <div className={classNames(PanelStyles.section, Styles.section)}>
        <p>prova bottone</p>
      </div>
      <button onClick={getVar1}>var1</button>
    </MenuPanel>
  );
}

ProvaVar1.propTypes = {
  viewState: PropTypes.object.isRequired,
  smallScreen: PropTypes.bool
};

export default ProvaVar1;
