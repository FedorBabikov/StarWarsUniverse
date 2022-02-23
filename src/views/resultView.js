"use strict";

export function createResult(containerEl, userResults) {
  for (const result of userResults) {
    const pEl = document.createElement("p");
    pEl.innerHTML = result;
    containerEl.appendChild(pEl);
  }

  const tryAgainButton = document.createElement("button");
  tryAgainButton.class = "button";
  tryAgainButton.id = "again-button";
  tryAgainButton.innerHTML = "Try again!";

  containerEl.appendChild(tryAgainButton);

  return tryAgainButton;
}
