"use strict";

export function createResult(containerEl, userResults) {
  for (const result of userResults) {
    const pEl = document.createElement("p");
    pEl.innerHTML = result;
    pEl.classList.add("result-paragraph");
    containerEl.appendChild(pEl);
  }

  const tryAgainButton = document.createElement("button");
  tryAgainButton.class = "button";
  tryAgainButton.id = "again-button";
  tryAgainButton.innerHTML = "Try again!";

  containerEl.appendChild(tryAgainButton);
}
