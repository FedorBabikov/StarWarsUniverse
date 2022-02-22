"use strict";

export function createPlayground(containerEl, parEl) {
  
  const currentStep = parseInt(sessionStorage.getItem("step"), 10) + 1;
  const totalSteps = sessionStorage.getItem("steps");

  parEl.innerHTML = `Step ${currentStep} from ${totalSteps}`;

  containerEl.innerHTML = `
    <div id='textarea'>
        <textarea id="creative" name="creative" rows="5" cols="33"></textarea>
    </div>
    <div id="playground">
        <div id="unsplash-container"></div>
        <div id="swapi-container"></div>
    </div>
  `;
}
