"use strict";

import { useStorage } from "../storage.js";

export function createPlayground(containerEl, parEl) {
  const currentStep = parseInt(useStorage("get", "step"), 10) + 1;
  const totalSteps = useStorage("get", "steps");

  parEl.innerHTML = `Step ${currentStep} from ${totalSteps}`;

  containerEl.innerHTML = `
    <div id='textarea'>
        <textarea id="creative" name="creative" rows="5" cols="33" placeholder="Add your thoughts here..."></textarea>
    </div>
    <div id="playground">
        <div id="unsplash-container"></div>
        <div id="swapi-container"></div>
    </div>
  `;
}
