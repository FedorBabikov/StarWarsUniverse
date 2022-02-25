"use strict";

export function createQuoteParagraph(quote) {
  const pEl = document.createElement("p");
  pEl.innerHTML = quote;
  return pEl;
}
