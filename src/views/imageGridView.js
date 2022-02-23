"use strict";

export function createImageGrid(jsonUnsplash, unsplashEl) {
  for (const image of jsonUnsplash.results) {
    const imgWrapper = document.createElement("div");
    imgWrapper.className = "img";
    imgWrapper.style.backgroundImage = `url('${image.urls.full}')`;
    unsplashEl.appendChild(imgWrapper);
  }
}
