"use strict";

import { createErrMessage } from "../views/errMessageView.js";

export function renderErrorMessage(errMsg) {
  const errEl = document.getElementById("message");
  const errMessage = createErrMessage(errMsg);
  errEl.appendChild(errMessage);
}
