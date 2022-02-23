"use strict";

import { router } from "../router.js";
import { useStorage } from "../storage.js";
import { createResult } from "../views/resultView.js";

export function renderResultPage(containerEl) {
  containerEl.innerHTML = "";

  const SSkeys = Object.keys(sessionStorage);

  const userResults = SSkeys.filter((key) => key.match(/step\d+/)).map(
    (key) => {
      return useStorage("get", key);
    }
  );

  createResult(containerEl, userResults);

  const tryAgainButton = document.getElementById("again-button");
  tryAgainButton.addEventListener("click", () => {
    router("start");
  });
}
