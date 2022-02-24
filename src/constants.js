"use strict";

export const UNSPLASH_API_BASE = "https://api.unsplash.com/search/photos/";
export const SWAPI_API_BASE = "https://swapi-deno.azurewebsites.net/api/";
export const UNSPLASH_API_KEY = `${unsplashAccessKey}`;
export const TOTAL_STEPS = [5, "five"];
export const RANDOM_NUM_STRING = `${Math.floor(Math.random() * 10) + 1}`;
export const TEXT_AREA_MAX = 500;

export const JSON_PROPS = {
  people: ["name", "gender", "birth_year", "hair_color", "height"],
  planets: [
    "name",
    "climate",
    "diameter",
    "gravity",
    "terrain",
    "orbital_period",
  ],
  starships: ["name", "model", "passengers", "crew", "cargo_capacity"],
};

export const NAMES_MAP = {
  people: "star+wars+hero",
  planets: "planets",
  starships: "spaceship",
};
export const START_QUOTES = [
  "Welcome! May the Force be with you.",
  "Here you can create something new.",
  "Use the buttons to choose a person, a planet or a starship.",
  "Decide how many steps you are taking.",
  "You will see the description and some photos from the saga to help free up your imagination.",
  "Then write what you think.",
  "The GO! button is your best friend.",
  "- Try not. Do or do not. There is no try. — Yoda",
];

export const RESULT_QUOTES = [
  "- Your eyes can deceive you; dont trust them. — Obi-Wan Kenobi",
  "- Your focus determines your reality. — Qui-Gon Jinn",
];
