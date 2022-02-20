"use strict";

import { renderAPIResponse } from "./pages/apiResponsePage.js";
import {
  UNSPLASH_API_BASE,
  UNSPLASH_API_KEY,
  SWAPI_API_BASE,
} from "./constants.js";

export async function router(origin, elID = "") {
  switch (origin) {
    case "button":
      if (elID.includes("api-")) {
        const url = getApiURL(elID);
        const jsonFromAPI = await fetchAPi(url);
        renderAPIResponse(jsonFromAPI, elID);
      }
      break;
  }
}

async function fetchAPi(url) {
  const response = await fetch(url);
  return await response.json();
}

function getApiURL(buttonId) {
  let query, url;

  switch (buttonId) {
    case "api-people-button":
    case "api-planets-button":
    case "api-starships-button":
      query = buttonId.split("-")[1];
      url = `${SWAPI_API_BASE}${query}`;
      break;
    case "api-go-button":
      url = `${UNSPLASH_API_BASE}?query=library&client_id=${UNSPLASH_API_KEY}`;
      break;
  }

  return url;
}
