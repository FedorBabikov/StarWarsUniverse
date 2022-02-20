"use strict";

import { router } from "./router.js";

function main() {
  const buttons = document.getElementsByClassName("button");
  for (const button of buttons) {
    button.addEventListener("click", (e) => router("button", e.target.id));
  }
}



async function apis(requests) {

  const divSwapi = document.getElementById("swapi-container");
  const divUnsplash = document.getElementById("unsplash-container");

  for (const pict of data[0].results) {
    const imgWrapper = document.createElement("div");
    imgWrapper.className = "img";
    imgWrapper.style.backgroundImage = `url('${pict.urls.full}')`;
    divUnsplash.appendChild(imgWrapper);
  }

}





window.addEventListener("load", main);
