"use strict";

import { renderAPIResponse } from "./pages/apiResponsePage.js";
import { renderStartPage } from "./pages/startPage.js";
import { renderResultPage } from "./pages/resultPage.js";
import { renderErrorMessage } from "./pages/errorMessagePage.js";
import { useStorage } from "./storage.js";
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
      parEl.innerHTML = "How many rounds?";
      inpEl.style.display = "inline-block";
      // and erase content from some others
      containerEl.innerHTML = "";
      selectEl.innerHTML =
        "<option value='Choose a category' disabled selected>&#8592; Choose a category</option>";
      textAreaEl.style.display = "none";
      sessionStorage.clear();
      // and then draw the new content
      renderStartPage(containerEl);
      break;

    case "controls-button":
      errEl.innerHTML = "";
      // get part of the button's id - and put that in Storage
      const category = `${originID.split("-")[1]}`;

      if (category === "go") {
        // we come here from `GO!` button
        const currentStep =
          // get current step from Storage - or (if still null) set as 1 and return 1 (comma operator)
          useStorage("get", "int", "step") ||
          (useStorage("set", "step", "1"), 1);

        let totalSteps = useStorage("get", "int", "steps");
        //
        //  check if an option is selected and all the fields contain user data
        //

        // if select is not populated yet - get the options from API
        if (!selectHasOptions(selectEl)) {
          renderErrorMessage("Please select some person/planet/starship");
          return;
        }

        // if input is visible - user should set a valid number of steps
        if (inpEl.style.display === "inline-block") {
          if (!StepsTotalSaved(inpEl, parEl)) {
            renderErrorMessage(
              `Please enter a number between one and ${TOTAL_STEPS[1]}`
            );

            inpEl.value = "";
            inpEl.focus();

            return;
          }
        }

        //user should provide text in the text-area at every step
        if (
          textAreaEl.style.display === "inline-block" &&
          !UserTextSaved(textAreaEl, currentStep)
        ) {
          renderErrorMessage(
            "Please drop a few thoughts before going further..."
          );
          return;
        }
        //
        // if all the above is set and selected properly - fetch data from API...
        //

        const currentCategory = useStorage("get", "", "currentCategory");
        totalSteps = totalSteps || useStorage("get", "int", "steps");

        const jsonSwapi = useStorage("get", "json", `${currentCategory}`);
        const jsonUnsplash = await fetchAPi(
          category,
          NAMES_MAP[currentCategory]
        );
        // ... and show the data in the DOM
        renderAPIResponse(
          jsonUnsplash,
          jsonSwapi,
          selectEl,
          parEl,
          containerEl,
          textAreaEl
        );
        // iterate until the limit of steps has been hit - then show result page
        if (totalSteps && currentStep > totalSteps) {
          renderResultPage(containerEl, parEl, textAreaEl);
          return;
        }
        // at the end of the `click` handler - increment steps counter
        useStorage("set", "step", `${currentStep + 1}`);
      } else {
        //we come here from a button on the control panel other than `GO!`
        useStorage("set", "currentCategory", category);
        let jsonSwapi;
        // if json from that API has already been received on some prev step - get it from Storage
        // otherwise, fetch it from the API and then pui it to Storage
        if (!(jsonSwapi = useStorage("get", "json", category))) {
          jsonSwapi = await fetchAPi(category);
          useStorage("set", category, jsonSwapi);
        }
        // show the data in the DOM
        renderAPIResponse(null, jsonSwapi, selectEl);
      }
      break;
  }
}

//
// ─── HELPER FUNCTIONS FOR ROUTER ────────────────────────────────────────
//

// (true) save number of steps to Storage and hide the controls
// (false) ask user for valid input
function StepsTotalSaved(inpEl, parEl) {
  const inpValue = parseInt(inpEl.value.trim());

  if (!inpValue || inpValue <= 0 || inpValue > 5) {
    return false;
  } else {
    useStorage("set", "steps", `${inpValue.toString()}`);

    parEl.innerHTML = "";
    inpEl.style.display = "none";

    return true;
  }
}

// (boolean) save user data into Storage or show message(if no data provided)
export function UserTextSaved(textAreaEl, currentStep) {
  const text = textAreaEl.value;

  if (text === "") {
    return false;
  } else {
    useStorage("set", `step${currentStep}`, `${text}`);
    return true;
  }
}

function selectHasOptions(selectEl) {
  return selectEl.options.length > 1;
}
