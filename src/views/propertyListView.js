"use strict";

// receive json from API, DOM elem and user's choice -
// find the appropriate object in the json -
// render some items from that obj into the DOM
export function createPropertyList(jsonSwapi, swapiEl, selectedItem) {
  const chosenOption = jsonSwapi.find((obj) => obj.name === selectedItem);

  let swapiElContent = "";

  for (const [key, value] of Object.entries(chosenOption)) {
    swapiElContent += `${key}:${value}<br>`;
  }

  swapiEl.innerHTML = swapiElContent;
}
