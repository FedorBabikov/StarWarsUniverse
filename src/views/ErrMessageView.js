"use strict";

export function createErrMessage(errMsg) {
  const errParagraph = document.createElement("p");

  errParagraph.id = "error";
  errParagraph.innerHTML = errMsg;

  return errParagraph;
}
