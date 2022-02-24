"use strict";

import { renderAPIResponse } from "./pages/apiResponsePage.js";
import { renderStartPage } from "./pages/startPage.js";
import { renderResultPage } from "./pages/resultPage.js";
import { renderErrorMessage } from "./pages/errorMessagePage.js";
import { useStorage, UserDataSaved } from "./storage.js";
import { fetchAPi } from "./api.js";
import { NAMES_MAP, TOTAL_STEPS } from "./constants.js";

export async function router(origin, originID = "") {
  const errEl = document.getElementById("message");
  const containerEl = document.getElementById("container");
  const selectEl = document.getElementById("select");
  const inpEl = document.getElementById("stepsInput");
  const parEl = document.getElementById("stepsParagraph");
  const textAreaEl = document.getElementById("creative");

  switch (origin) {
    case "start":
      // make these two elem's visible at the start
      parEl.innerHTML = "How many times?";
      inpEl.style.display = "inline-block";
      // and erase content from some others as well
      containerEl.innerHTML = "";
      selectEl.innerHTML = "";
      sessionStorage.clear();
      // and then draw the new content
      renderStartPage(containerEl);
      break;

    case "controls-button":
      errEl.innerHTML = "";

      if (originID.includes("-go-")) {
        // we come here from GO! button
        const currentStep =
          // get step from Storage - or (if still null) set to Storage as 1 and return 1 (comma operator)
          parseInt(useStorage("get", "step")) ||
          (useStorage("set", "step", "1"), 1);

        if (!selectHasOptions(selectEl)) {
          // if select is not populated yet - we should get the options from API
          renderErrorMessage("Please first select some person/planet/starship");
          return;
        }

        if (inpEl) {
          // if input is on the screen - user should set a valid number of steps
          if (!StepsTotalSaved(inpEl, parEl)) {
            inpEl.value = "";
            inpEl.focus();
            return;
          }
        }

        if (textAreaEl) {
          //user should provide text input in the text-area
          if (!UserDataSaved(textAreaEl, currentStep)) return;
        }

        // if all the above is set and selected properly - fetch data from API...
        const lastButtonPressed = useStorage("get", "lastButtonPressed");
        const totalSteps = parseInt(useStorage("get", "steps"));

        const jsonSwapi = JSON.parse(useStorage("get", `${lastButtonPressed}`));
        const jsonUnsplash = await fetchAPi(
          originID,
          NAMES_MAP[lastButtonPressed]
        );
        // ... and show the data in the DOM
        renderAPIResponse(jsonUnsplash, jsonSwapi);
        // do so until the limit of steps has been hit - then show result page
        if (currentStep === totalSteps + 1) {
          renderResultPage(containerEl);
          return;
        }
        // at the end of the `click` handler - increment steps counter
        useStorage("set", "step", `${currentStep + 1}`);
      } else {
        //we come here from other buttons on the control panel (not `GO!`)

        // get part of the button's id - and put that in Storage
        const storageRecord = `${originID.split("-")[1]}`;
        useStorage("set", "lastButtonPressed", storageRecord);

        let jsonSwapi;
        // if json from that API has already been received on some prev step - get it from Storage
        // otherwise, fetch it from the API and then pui it to Storage
        if (!(jsonSwapi = JSON.parse(useStorage("get", storageRecord)))) {
          jsonSwapi = await fetchAPi(originID);
          useStorage("set", storageRecord, JSON.stringify(jsonSwapi));
        }
        // show the data in the DOM
        renderAPIResponse(null, jsonSwapi);
      }
      break;
  }
}

//
// ─── TWO HELPER FUNCTIONS FOR THE ROUTER ────────────────────────────────────────
//

// (true) save the number of steps from user to Storage and hide the controls
// (false) request valid input
function StepsTotalSaved(inpEl, parEl) {
  const inpValue = parseInt(inpEl.value.trim());

  if (!inpValue || inpValue <= 0 || inpValue > 5) {
    renderErrorMessage(
      `Please enter a number between one and ${TOTAL_STEPS[1]}`
    );

    return false;
  } else {
    useStorage("set", "steps", `${inpValue.toString()}`);

    parEl.innerHTML = "";
    inpEl.style.display = "none";

    return true;
  }
}

function selectHasOptions(selectEl) {
  return selectEl.options.length > 0;
}
