"use strict";

import { createQuoteParagraph } from "../views/startView.js";
import { START_QUOTES } from "../constants.js";

export function renderStartPage(containerEl) {
  for (const quote of START_QUOTES) {
    containerEl.appendChild(createQuoteParagraph(quote));
  }
}
