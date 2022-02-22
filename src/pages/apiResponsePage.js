"use strict";

import { createSelectOption } from "../views/selectOptionView.js";
import { createPlayground } from "../views/mainView.js";

export function renderAPIResponse(jsonUnsplash, jsonSwapi) {
  if (jsonUnsplash) {
    const paragraphEl = document.getElementById("stepsParagraph");
    const containerEl = document.getElementById("container");

    createPlayground(containerEl, paragraphEl);

    const swapiEl = document.getElementById("swapi-container");
    const unsplashEl = document.getElementById("unsplash-container");
    const selectEl = document.getElementById("select");
    const selectedItem = selectEl.options[selectEl.selectedIndex].value;

    const chosenOption = jsonSwapi.find((obj) => obj.name === selectedItem);
    let swapiElContent = "";
    for (const [key, value] of Object.entries(chosenOption)) {
      swapiElContent += `${key}:${value}<br>`;
    }
    swapiEl.innerHTML = swapiElContent;

    for (const image of jsonUnsplash.results) {
      const imgWrapper = document.createElement("div");
      imgWrapper.className = "img";
      imgWrapper.style.backgroundImage = `url('${image.urls.full}')`;
      unsplashEl.appendChild(imgWrapper);
    }
  } else if (jsonSwapi) {
    const selectEl = document.getElementById("select");
    selectEl.innerHTML = "";
    for (const obj of jsonSwapi) {
      const optionEl = createSelectOption(obj.name);
      selectEl.appendChild(optionEl);
    }
  }
}
