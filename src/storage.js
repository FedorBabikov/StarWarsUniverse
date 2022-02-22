"use strict";

export function storage(operation, ...value) {
  switch (operation) {
    case "get":
      return sessionStorage.getItem(value[0]);
      break;
    case "set":
      sessionStorage.setItem(value[0], value[1]);
      break;
  }
}