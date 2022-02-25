"use strict";

import { router } from "./router.js";
import { TOTAL_STEPS } from "./constants.js";
import { TEXT_AREA_MAX } from "./constants.js";

function main() {
  // placeholder text for input field: part of it - from constant
  document.getElementById(
    "stepsInput"
  ).placeholder = `one to ${TOTAL_STEPS[1]}`;

  const textAreaEl = document.getElementById("creative");
  textAreaEl.placeholder = `Add your thoughts here...(max ${TEXT_AREA_MAX} letters)`;
  textAreaEl.style.display = "none";

  const buttons = document.getElementsByClassName("button");

  //all buttons receive listeners leading to the same place in router
  for (const button of buttons) {
    button.addEventListener("click", (e) =>
      router("controls-button", e.target.id)
    );
  }

  //start the app here
  router("start");
}

window.addEventListener("load", main);
