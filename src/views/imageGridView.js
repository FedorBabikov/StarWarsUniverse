"use strict";

export function createImageGrid(jsonUnsplash, unsplashEl) {
  //get img URLs from the API json - set those img's as background for wrapper div's
  //then append the div's to the DOM element that is a CSS grid container
  for (const image of jsonUnsplash.results) {
    const imgWrapper = document.createElement("div");
    imgWrapper.className = "img";
    imgWrapper.style.backgroundImage = `url('${image.urls.full}')`;
    unsplashEl.appendChild(imgWrapper);
  }
}
