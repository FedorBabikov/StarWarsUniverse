"use strict";

import { router } from "./router.js";

function main() {
  const buttons = document.getElementsByClassName("button");
  for (const button of buttons) {
    button.addEventListener("click", (e) => router("button", e.target.id));
  }
  router("start");
}

window.addEventListener("load", main);
