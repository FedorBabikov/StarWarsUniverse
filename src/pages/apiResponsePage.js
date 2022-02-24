"use strict";

import { createPlayground } from "../views/mainView.js";
import { createImageGrid } from "../views/imageGridView.js";
import { createPropertyList } from "../views/propertyListView.js";
import { populateSelectElement } from "../views/populateSelectElemView.js";

export function renderAPIResponse(jsonUnsplash, jsonSwapi) {
  const selectEl = document.getElementById("select");

  if (jsonUnsplash) {
    const paragraphEl = document.getElementById("stepsParagraph");
    const containerEl = document.getElementById("container");

    createPlayground(containerEl, paragraphEl);

    const swapiEl = document.getElementById("swapi-container");
    const unsplashEl = document.getElementById("unsplash-container");
//this is the option selected by user
    const selectedItem = selectEl.options[selectEl.selectedIndex].value;

    createPropertyList(jsonSwapi, swapiEl, selectedItem);
    createImageGrid(jsonUnsplash, unsplashEl);
  } else if (jsonSwapi) {
    populateSelectElement(jsonSwapi, selectEl);
  }
}
