"use strict";

import { router } from "./router.js";
import { TOTAL_STEPS } from "./constants.js";

function main() {
  document.getElementById(
    "stepsInput"
  ).placeholder = `one to ${TOTAL_STEPS[1]}`;

  const buttons = document.getElementsByClassName("button");

  for (const button of buttons) {
    button.addEventListener("click", (e) =>
      router("controls-button", e.target.id)
    );
  }

  router("start");
}

window.addEventListener("load", main);
