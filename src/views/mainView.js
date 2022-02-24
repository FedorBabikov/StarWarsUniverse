"use strict";

import { useStorage } from "../storage.js";
import { TEXT_AREA_MAX } from "../constants.js";

export function createPlayground(containerEl, paragraphEl) {
  //get data from sessionStorage
  const currentStep = parseInt(useStorage("get", "step"));
  const totalSteps = useStorage("get", "steps");

  //show the data up to certain point; then don't show
  paragraphEl.innerHTML =
    currentStep > totalSteps ? "" : `Step ${currentStep} from ${totalSteps}`;

  containerEl.innerHTML = `
    <div id='textarea'>
        <textarea id="creative" name="creative" rows="5" cols="33" placeholder="Add your thoughts here...(max ${TEXT_AREA_MAX} letters)"></textarea>
    </div>
    <div id="playground">
        <div id="unsplash-container"></div>
        <div id="swapi-container"></div>
    </div>
  `;
}
