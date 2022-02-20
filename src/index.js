"use strict";

function main() {
  const unsplashReq = `https://api.unsplash.com/search/photos/?query=library&client_id=${unsplashAccessKey}`;
  const swapiReq = "https://swapi.dev/api/people/2/";

  const buttonEl = document.getElementById("button");

  buttonEl.addEventListener("click", () => apis([unsplashReq, swapiReq]));
}

async function apis(requests) {
  const reqPromises = requests.map((req) => fetch(req));
  const responses = await Promise.all(reqPromises);

  const respPromises = responses.map((resp) => resp.json());
  const data = await Promise.all(respPromises);

  const divSwapi = document.getElementById("swapi-container");
  const divUnsplash = document.getElementById("unsplash-container");

  for (const pict of data[0].results) {
    const imgWrapper = document.createElement("div");
    imgWrapper.className = "img";
    imgWrapper.style.backgroundImage = `url('${pict.urls.full}')`;
    divUnsplash.appendChild(imgWrapper);
  }

  divSwapi.innerHTML += `${data[1].name}<br>`;
}

window.addEventListener("load", main);
