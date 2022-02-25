"use strict";

import { renderErrorMessage } from "./pages/errorMessagePage.js";
import {
  SWAPI_API_BASE,
  UNSPLASH_API_BASE,
  UNSPLASH_API_KEY,
  RANDOM_NUM_STRING,
} from "./constants.js";

export async function fetchAPi(category, queryString) {
  try {
    const url = getApiURL(category, queryString);
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      renderErrorMessage(
        `The API server responded with status ${response.status}`
      );
    }
  } catch (error) {
    renderErrorMessage(
      `Something went terribly wrong. Please try again later ${error}`
    );
  }
}

// compose API request string based on button id and some constants
function getApiURL(category, queryString) {
  let url;

  switch (category) {
    case "people":
    case "planets":
    case "starships":
      url = `${SWAPI_API_BASE}${category}`;
      break;
    case "go":
      url = `${UNSPLASH_API_BASE}?page=${RANDOM_NUM_STRING}&query=${queryString}&client_id=${UNSPLASH_API_KEY}`;
      break;
  }

  return url;
}
