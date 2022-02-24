"use strict";

import { renderErrorMessage } from "./pages/errorMessagePage.js";

// helper function to work with sessionStorage object
export function useStorage(operation, ...value) {
  switch (operation) {
    case "get":
      return sessionStorage.getItem(value[0]);
      break;
    case "set":
      sessionStorage.setItem(value[0], value[1]);
      break;
  }
}

// (boolean) save user data into Storage or show message(if no data provided)
export function UserDataSaved(textAreaEl, currentStep) {
  const textAreaValue = textAreaEl.value;

  if (textAreaValue === "") {
    renderErrorMessage("Please drop a few thoughts before going further...");
    return false;
  } else {
    useStorage("set", `step${currentStep}`, `${textAreaValue}`);
    return true;
  }
}
