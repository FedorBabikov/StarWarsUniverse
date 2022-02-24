"use strict";

import { router } from "../router.js";
import { useStorage } from "../storage.js";
import { createResult } from "../views/resultView.js";

export function renderResultPage(containerEl) {
  // erase the current content from the container
  containerEl.innerHTML = "";
  //get an array of keys of everything in sessionStorage
  const SSkeys = Object.keys(sessionStorage);
  //filter out only those keys containing `step1, step2` and so on
  //then get an array of corresponding values from the Storage using map()
  const userResults = SSkeys.filter((key) => key.match(/step\d+/)).map(
    (key) => {
      return useStorage("get", key);
    }
  );

  createResult(containerEl, userResults);

  //if user wants to go through again - here is the button leading to router
  const tryAgainButton = document.getElementById("again-button");
  tryAgainButton.addEventListener("click", () => {
    router("start");
  });
}
