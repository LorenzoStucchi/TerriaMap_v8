import React from "react";
import PropTypes from "prop-types";

import MenuPanel from "terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuPanel.jsx";
import PanelStyles from "terriajs/lib/ReactViews/Map/Panels/panel.scss";
import Styles from "./related-maps.scss";
import classNames from "classnames";

function Case_study(props) {
  const dropdownTheme = {
    inner: Styles.dropdownInner,
    icon: "gallery"
  };
  return (
    <MenuPanel
      theme={dropdownTheme}
      btnText="Sulcis Case Study"
      smallScreen={props.smallScreen}
      viewState={props.viewState}
      btnTitle="Multienergy case study"
    >
      <div className={classNames(PanelStyles.header)}>
        <label className={PanelStyles.heading}>
          Multienergy Sulcis Iglesiente case study
        </label>
      </div>

      <p>what you can see if you go to the link</p>

      <div className={classNames(PanelStyles.section, Styles.section)}>
        <a target="_blank" href="http://sunrise.rse-web.it/">
          <img
            className={Styles.image}
            src={require("../../wwwroot/images/Sulcis-Iglesiente.jpg")}
            alt="case study"
          />
        </a>

        <a
          target="_blank"
          className={Styles.link}
          href="http://sunrise.rse-web.it/"
        >
          show case study results
        </a>

        <p>Go to the multienergy Sulcis Iglesiente case study's results.</p>
      </div>
    </MenuPanel>
  );
}
