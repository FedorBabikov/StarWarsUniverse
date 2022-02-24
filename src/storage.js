"use strict";

import { renderErrorMessage } from "./pages/errorMessagePage.js";

// helper function to work with sessionStorage object
export function useStorage(...value) {
  switch (value[0]) {
    case "get":
      switch (value[1]) {
        case "int":
          return parseInt(sessionStorage.getItem(value[2]));
        case "json":
          return JSON.parse(sessionStorage.getItem(value[2]));
        default:
          return sessionStorage.getItem(value[2]);
      }
      break;
    case "set":
      sessionStorage.setItem(value[1], value[2]);
      break;
  }
}

// (boolean) save user data into Storage or show message(if no data provided)
export function UserDataSaved(textAreaEl, currentStep) {
  const textAreaValue = textAreaEl.value;

  if (textAreaValue === "" && currentStep !== 1) {
    renderErrorMessage("Please drop a few thoughts before going further...");
    return false;
  } else {
    useStorage("set", `step${currentStep}`, `${textAreaValue}`);
    return true;
  }
}
