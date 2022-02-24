"use strict";

import { useStorage } from "../storage.js";
import { JSON_PROPS } from "../constants.js";

// receive json from API, DOM elem and user's choice -
// find the appropriate object in the json -
// render some items from that obj into the DOM
export function createPropertyList(jsonSwapi, swapiEl, selectedItem) {
  const objWithChosenOption = jsonSwapi.find(
    (obj) => obj.name === selectedItem
  );
  // use a constant obg of arrays - to define which props to render
  const optionsType = useStorage("get", "", "lastButtonPressed");
  const optionsToDisplay = JSON_PROPS[optionsType];
  // render the props
  for (let [key, value] of Object.entries(objWithChosenOption)) {
    if (optionsToDisplay.includes(key)) {
      key = key.replace("_", " ");
      const pEl = document.createElement("p");
      pEl.innerHTML = `${key}: ${value}`;
      swapiEl.appendChild(pEl);
    }
  }
}
