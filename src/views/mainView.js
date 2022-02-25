"use strict";

import { useStorage } from "../storage.js";

export function createPlayground(containerEl, paragraphEl) {
  //get data from sessionStorage
  const currentStep = useStorage("get", "int", "step");
  const totalSteps = useStorage("get", "", "steps");

  //show the data up to certain point; then don't show
  paragraphEl.innerHTML =
    currentStep > totalSteps ? "" : `Step ${currentStep} from ${totalSteps}`;

  containerEl.innerHTML = `
        <div id="unsplash-container"></div>
        <div id="swapi-container"></div>
  `;
}
