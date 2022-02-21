"use strict";

import { createAppDescription } from "../views/startView.js";

export function renderStartPage() {
  const containerEl = document.getElementById("container");
  const descriptionEl = createAppDescription();
  containerEl.appendChild(descriptionEl);
}
