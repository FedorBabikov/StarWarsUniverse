"use strict";

import { renderAPIResponse } from "./pages/apiResponsePage.js";
import { renderStartPage } from "./pages/startPage.js";
import { renderErrorMessage } from "./pages/errorMessagePage.js";
import { storage } from "./storage.js";
import {
  UNSPLASH_API_BASE,
  UNSPLASH_API_KEY,
  SWAPI_API_BASE,
  NAMES_MAP,
} from "./constants.js";

export async function router(origin, elID = "") {
  switch (origin) {
    case "start":
      renderStartPage();
      break;
    case "button":
      const errEl = document.getElementById("message");
      errEl.innerHTML = "";
      if (!writeNumberOfSteps()) return;

      if (elID.includes("api-")) {
        if (elID.includes("-go-")) {
          if (selectHasOptions()) {
            const storageJson = storage(
              "get",
              `${storage("get", "lastButtonPressed")}`
            );
            const jsonSwapi = JSON.parse(storageJson);
            const jsonUnsplash = await fetchAPi(
              elID,
              NAMES_MAP[storage("get", "lastButtonPressed")]
            );
            renderAPIResponse(jsonUnsplash, jsonSwapi);
            storage("set", "step", `${+storage("get", "step") + 1}`);
          } else {
            renderErrorMessage(
              "Please first select some person/planet/starship"
            );
          }
        } else {
          const jsonSwapi = await fetchAPi(elID);
          renderAPIResponse(null, jsonSwapi);

          const storageRecord = `${elID.split("-")[1]}`;
          storage("set", "lastButtonPressed", storageRecord);

          const jsonInStorage = sessionStorage.getItem(storageRecord);
          if (!jsonInStorage) {
            storage("set", storageRecord, JSON.stringify(jsonSwapi));
          }
        }
      }
      break;
  }
}

function writeNumberOfSteps() {
  const parEl = document.getElementById("stepsParagraph");
  const inpEl = document.getElementById("stepsInput");

  if (inpEl) {
    const inpValue = parseInt(inpEl.value.trim(), 10);

    if (!inpValue || inpValue <= 0 || inpValue > 5) {
      renderErrorMessage("Please enter a number between 1 and 5");
      return false;
    } else {
      storage("set", "steps", `${inpValue.toString()}`);
      storage("set", "step", "0");
      parEl.innerHTML = "";
      inpEl.remove();
    }
  }
  return true;
}

function selectHasOptions() {
  const selectEl = document.getElementById("select");
  return selectEl.options.length > 0;
}

async function fetchAPi(elID, queryString = "") {
  try {
    const url = getApiURL(elID, queryString);
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    renderErrorMessage("Something went terribly wrong. Please try again later");
  }
}

function getApiURL(buttonId, queryString) {
  let url;

  switch (buttonId) {
    case "api-people-button":
    case "api-planets-button":
    case "api-starships-button":
      url = `${SWAPI_API_BASE}${buttonId.split("-")[1]}`;
      break;
    case "api-go-button":
      url = `${UNSPLASH_API_BASE}?query=${queryString}&client_id=${UNSPLASH_API_KEY}`;
      break;
  }

  return url;
}
