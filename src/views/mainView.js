"use strict";

export function createPlayground(containerEl) {
  containerEl.innerHTML = `
    <div id='textarea'>
        <textarea id="creative" name="creative" rows="5" cols="33"></textarea>
    </div>
    <div id="playground">
        <div id="unsplash-container"></div>
        <div id="swapi-container"></div>
    </div>
  `;
  return containerEl;
}
