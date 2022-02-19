"use strict";

function main() {
  const unsplashReq = `https://api.unsplash.com/search/photos/?query=library&client_id=${unsplashAccessKey}`;
  const swapiReq = "https://swapi.dev/api/people/1/";

  const unsplashLink = document.getElementById("unsplash-link");
  const swapiLink = document.getElementById("swapi-link");

  unsplashLink.addEventListener("click", () =>
    apis(unsplashReq, "unsplash-container")
  );
  swapiLink.addEventListener("click", () => apis(swapiReq, "swapi-container"));
}

async function apis(req, cont) {
  const response = await fetch(req);
  const data = await response.json();
  const div = document.getElementById(cont);

  if (cont.includes("unsplash")) {
    for (const pict of data.results) {
      const imgWrapper = document.createElement("div");
      imgWrapper.className = "img";
      imgWrapper.style.backgroundImage = `url('${pict.urls.full}')`;
      div.appendChild(imgWrapper);
    }
  } else {
    div.innerHTML += `${data.name}<br>`;
  }
}

window.addEventListener("load", main);
