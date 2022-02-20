"use strict";

export function createMainContainer() {
  const playground = document.createElement("div");
  playground.innerHTML = `
    <div id="input-container">
        <textarea id="creative" name="creative" rows="5" cols="33"></textarea>
        <div id="swapi-container"></div>
        <div id="unsplash-container"></div>
    </div>
  `;
  return playground;
}
