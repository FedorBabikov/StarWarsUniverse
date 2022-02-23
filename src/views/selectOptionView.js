"use strict";

export function createSelectOption(name) {
  const optionEl = document.createElement("option");

  optionEl.value = name;
  optionEl.innerHTML = name;

  return optionEl;
}
