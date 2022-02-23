"use strict";

import { createSelectOption } from "./selectOptionView.js";

export function populateSelectElement(jsonSwapi, selectEl) {
  selectEl.innerHTML = "";
  for (const obj of jsonSwapi) {
    const optionEl = createSelectOption(obj.name);
    selectEl.appendChild(optionEl);
  }
}
