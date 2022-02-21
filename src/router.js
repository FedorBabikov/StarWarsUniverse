"use strict";

import { renderAPIResponse } from "./pages/apiResponsePage.js";
import { renderStartPage } from "./pages/startPage.js";
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
      if (elID.includes("api-")) {
        if (elID.includes("-go-")) {
          if (selectHasOptions()) {
            const storageJson = sessionStorage.getItem(
              `${sessionStorage.getItem("lastButtonPressed")}`
            );
            const jsonSwapi = JSON.parse(storageJson);
            const jsonUnsplash = await fetchAPi(
              elID,
              NAMES_MAP[sessionStorage.getItem("lastButtonPressed")]
            );
            renderAPIResponse(jsonUnsplash, jsonSwapi);
          } else {
            renderErrorMessage(
              "Please first select some person/planet/starship!"
            );
          }
        } else {
          const jsonSwapi = await fetchAPi(elID);
          renderAPIResponse(null, jsonSwapi);

          const storageRecord = `${elID.split("-")[1]}`;
          sessionStorage.setItem("lastButtonPressed", storageRecord);

          const jsonInStorage = sessionStorage.getItem(storageRecord);
          if (!jsonInStorage) {
            sessionStorage.setItem(storageRecord, JSON.stringify(jsonSwapi));
          }
        }
      }
      break;
  }
}

function selectHasOptions() {
  const selectEl = document.getElementById("select");
  return selectEl.options.length > 0;
}

async function fetchAPi(elID, queryString = "") {
  const url = getApiURL(elID, queryString);
  const response = await fetch(url);
  return response.json();
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
