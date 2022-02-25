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
      switch (value[1]) {
        case "people":
        case "planets":
        case "starships":
          sessionStorage.setItem(value[1], JSON.stringify(value[2]));
          break;
        default:
          sessionStorage.setItem(value[1], value[2]);
          break;
      }
      break;
  }
}
