"use strict";

import { createPlayground } from "../views/mainView.js";
import { createImageGrid } from "../views/imageGridView.js";
import { createPropertyList } from "../views/propertyListView.js";
import { createSelectOption } from "../views/selectOptionView.js";

export function renderAPIResponse(
  jsonUnsplash,
  jsonSwapi,
  selectEl,
  parEl,
  containerEl,
  textAreaEl
) {
  if (jsonUnsplash) {
    createPlayground(containerEl, parEl, textAreaEl);

    const swapiEl = document.getElementById("swapi-container");
    const unsplashEl = document.getElementById("unsplash-container");

    swapiEl.innerHTML = "";
    unsplashEl.innerHTML = "";
    textAreaEl.value = "";

    //get value of the option selected by user
    const selectedItem = selectEl.options[selectEl.selectedIndex].value;

    createImageGrid(jsonUnsplash, unsplashEl);
    createPropertyList(jsonSwapi, swapiEl, selectedItem);
  } else if (jsonSwapi) {
    selectEl.innerHTML = "";
    for (const obj of jsonSwapi) {
      const optionEl = createSelectOption(obj.name);
      selectEl.appendChild(optionEl);
    }
  }
}
