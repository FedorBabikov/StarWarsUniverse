"use strict";

import { createSelectOption } from "../views/selectOptionView.js";

export function renderAPIResponse(json, elID) {
  if (elID.includes("-go-")) {
  } else {
    const selectEl = document.getElementById("select");
    selectEl.innerHTML = "";
    for (const obj of json) {
      const optionEl = createSelectOption(obj.name);
      selectEl.appendChild(optionEl);
    }
  }
}
