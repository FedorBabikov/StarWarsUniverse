"use strict";

import { renderErrorMessage } from "./pages/errorMessagePage.js";
import {
  SWAPI_API_BASE,
  UNSPLASH_API_BASE,
  UNSPLASH_API_KEY,
  RANDOM_NUM_STRING,
} from "./constants.js";

// this func gets all the stuff from all APIs
export async function fetchAPi(elID, queryString = "") {
  try {
    const url = getApiURL(elID, queryString);
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    renderErrorMessage(
      `Something went terribly wrong. Please try again later ${error}`
    );
  }
}

// compose request for API based on button id and some constants
function getApiURL(buttonId, queryString) {
  let url;

  switch (buttonId) {
    case "api-people-button":
    case "api-planets-button":
    case "api-starships-button":
      url = `${SWAPI_API_BASE}${buttonId.split("-")[1]}`;
      break;
    case "api-go-button":
      url = `${UNSPLASH_API_BASE}?page=${RANDOM_NUM_STRING}&query=${queryString}&client_id=${UNSPLASH_API_KEY}`;
      break;
  }

  return url;
}
