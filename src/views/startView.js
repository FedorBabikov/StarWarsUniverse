"use strict";

import { START_QUOTES } from "../constants.js";

export function createAppDescription(containerEl) {
  for (const paragraph of START_QUOTES) {
    const pEl = document.createElement("p");
    pEl.innerHTML = paragraph;
    containerEl.appendChild(pEl);
  }
}
