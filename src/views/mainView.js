"use strict";

import { useStorage } from "../storage.js";

export function createPlayground(containerEl, paragraphEl, textAreaEl) {
  //get data from sessionStorage
  const currentStep = useStorage("get", "int", "step");
  const totalSteps = useStorage("get", "", "steps");

  //show the data up to certain point; then don't show
  paragraphEl.innerHTML =
    currentStep > totalSteps ? "" : `Step ${currentStep} from ${totalSteps}`;

  if (currentStep === 1) {
    containerEl.innerHTML = `
        <div id="unsplash-container"></div>
        <div id="swapi-container"></div>
  `;

    textAreaEl.style.display = "inline-block";
  }
}
