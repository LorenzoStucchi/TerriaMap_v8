import React, { useState, useEffect } from "react";
import Rosavento from "./Rosavento";
import { data as datadefault } from "./data_zero";

const RosaventoContainer = (props: any) => {
  // console.log("RosaventoContainer");
  // console.log(props.catalogItem);
  // console.log(props.feature._data);
  // console.log(props.feature._data.id, props.feature._data.properties.id_cella);
  // console.log(props.feature._data.properties.quota, props.feature._data.properties.vento_50)

  let numidRosa = Number(props.feature._data.properties.id_cella);
  let numlevel = 1;
  let renderOK: boolean = false;
  const nomeCatalogItem = props.catalogItem.uniqueId;
  const catalogItemName = (props.catalogItem && props.catalogItem.name) || "";

  if (
    nomeCatalogItem == "eo_speed50_onshore" ||
    nomeCatalogItem == "eo_speed50_offshore"
  ) {
    numlevel = 1;
    renderOK = true;
  }
  if (
    nomeCatalogItem == "eo_speed75_onshore" ||
    nomeCatalogItem == "eo_speed75_offshore"
  ) {
    numlevel = 2;
    renderOK = true;
  }
  if (
    nomeCatalogItem == "eo_speed100_onshore" ||
    nomeCatalogItem == "eo_speed100_offshore"
  ) {
    numlevel = 3;
    renderOK = true;
  }
  if (
    nomeCatalogItem == "eo_speed125_onshore" ||
    nomeCatalogItem == "eo_speed125_offshore"
  ) {
    numlevel = 4;
    renderOK = true;
  }
  if (
    nomeCatalogItem == "eo_speed150_onshore" ||
    nomeCatalogItem == "eo_speed150_offshore"
  ) {
    numlevel = 5;
    renderOK = true;
  }
  // console.log("idpunto level nomeCatalogItem", numidRosa, numlevel, catalogItemName);

  const [datirosa, setdatiRosa] = useState(datadefault);
  const [miakey, setmiakey] = useState(1);
  const [errore, seterrore] = useState(false);

  async function getRosa(
    idR: number,
    idmin: number,
    idmax: number,
    level: number
  ) {
    // console.log('getRosa', idR, level)
    if (idR < idmin || idR > idmax) {
      seterrore(true);
      throw new Error("id non valido!");
    }
    if (level < 0 || level > 5) {
      seterrore(true);
      throw new Error("livello non valido!");
    }
    // const response = await fetch(`http://localhost:3002/rosa/${idR}?lev=${level}`)
    // const response = await fetch(`http://kawau.ricerca.lan:5001/rosa/${idR}?lev=${level}`);
    const response = await fetch(
      `https://aeolian-api.rse-web.it/rosa/${idR}?lev=${level}`
    );
    if (response.status !== 200) {
      // Lo status nella response dice se l'endpoint esiste davvero.
      throw new Error("cannot fetch the data");
    }
    // console.log(response)
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    getRosa(numidRosa, 1, 861273, numlevel) //id valido tra 1-861273
      .then(data => {
        // console.log('resolved:', numidRosa, numlevel, data.chartData[2]);
        setdatiRosa(data);
        incmiakey();
        seterrore(false);
        // console.log('NONerrore2:', errore.valueOf());
      })
      .catch(err => {
        seterrore(true);
        // console.log("err:", err);
        // console.log("errore:", errore.valueOf());
      });
    // console.log('FineuseEffect',idRosa, datirosa.chartData[0])
  }, [numidRosa, numlevel]);

  const incmiakey = () => {
    setmiakey(miakey + 1);
  };
  const myComponentStyle = { maxWidth: "400px" };

  function renderOutput(renderOK: boolean) {
    if (renderOK) {
      return (
        <div style={myComponentStyle}>
          {/* <h1>{catalogItemName} Wind Rose Chart - punto {numidRosa} - level {numlevel}</h1> */}
          {errore.valueOf() && <h4>errore: punto o livello non corretto</h4>}

          <Rosavento key={miakey} datirosa={datirosa} />
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  return renderOutput(renderOK);
};

export default RosaventoContainer;
