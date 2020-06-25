import React from "react";

window.scroll = function() {
  stickyScrollFunc();
};

export function stickyScrollFunc() {
  const noteActionBar = document.getElementById("action-bar");
  const stickyActionbar = noteActionBar.offsetTop;
  if (window.pageYOffset >= stickyActionbar) {
    noteActionBar.classList.add("sticky");
  } else {
    noteActionBar.classList.remove("sticky");
  }
}
