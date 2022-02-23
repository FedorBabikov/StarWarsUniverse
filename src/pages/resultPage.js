"use strict";

import { useStorage } from "../storage.js";

export function renderResultPage(containerEl) {
  containerEl.innerHTML = "";

  const SSkeys = Object.keys(sessionStorage);

  const userResults = SSkeys.filter((key) => key.match(/step\d+/)).map(
    (key) => {
      return useStorage("get", key);
    }
  );

  for (const result of userResults) {
    const pEl = document.createElement("p");
    pEl.innerHTML = result;
    containerEl.appendChild(pEl);
  }
}
