"use strict";

export function createPropertyList(jsonSwapi, swapiEl, selectedItem) {
  const chosenOption = jsonSwapi.find((obj) => obj.name === selectedItem);

  let swapiElContent = "";

  for (const [key, value] of Object.entries(chosenOption)) {
    swapiElContent += `${key}:${value}<br>`;
  }

  swapiEl.innerHTML = swapiElContent;
}
