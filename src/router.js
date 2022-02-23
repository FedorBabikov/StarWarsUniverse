"use strict";

import { renderAPIResponse } from "./pages/apiResponsePage.js";
import { renderStartPage } from "./pages/startPage.js";
import { renderResultPage } from "./pages/resultPage.js";
import { renderErrorMessage } from "./pages/errorMessagePage.js";
import { useStorage, saveUserData } from "./storage.js";
import { fetchAPi } from "./api.js";
import { NAMES_MAP, TOTAL_STEPS } from "./constants.js";

export async function router(origin, originID = "") {
  switch (origin) {
    case "start":
      renderStartPage();
      break;
    case "controls-button":
      const errEl = document.getElementById("message");
      const containerEl = document.getElementById("container");
      errEl.innerHTML = "";

      if (originID.includes("-go-")) {
        if (selectHasOptions()) {
          if (!writeNumberOfSteps()) return;

          const lastButtonPressed = useStorage("get", "lastButtonPressed");
          const totalSteps = parseInt(useStorage("get", "steps"));
          const currentStep = parseInt(useStorage("get", "step")) || 0;
          const textAreaEl = document.getElementById("creative");

          if (textAreaEl && !saveUserData(textAreaEl, currentStep)) return;

          if (currentStep === totalSteps) {
            renderResultPage(containerEl);
            sessionStorage.clear();
            return;
          }

          const jsonSwapi = JSON.parse(
            useStorage("get", `${lastButtonPressed}`)
          );
          const jsonUnsplash = await fetchAPi(
            originID,
            NAMES_MAP[lastButtonPressed]
          );

          containerEl.innerHTML = "";
          renderAPIResponse(jsonUnsplash, jsonSwapi);
          useStorage("set", "step", `${currentStep + 1}`);
        } else {
          renderErrorMessage("Please first select some person/planet/starship");
        }
      } else {
        const jsonSwapi = await fetchAPi(originID);
        renderAPIResponse(null, jsonSwapi);

        const storageRecord = `${originID.split("-")[1]}`;
        useStorage("set", "lastButtonPressed", storageRecord);

        const jsonInStorage = useStorage("get", storageRecord);
        if (!jsonInStorage) {
          useStorage("set", storageRecord, JSON.stringify(jsonSwapi));
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
      renderErrorMessage(
        `Please enter a number between one and ${TOTAL_STEPS[1]}`
      );
      return false;
    } else {
      useStorage("set", "steps", `${inpValue.toString()}`);
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
