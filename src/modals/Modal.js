import React from "react";
import { createPortal } from "react-dom";

const modalStyle = {
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,.2)",
  color: "#FFF",
  fontSize: "40px"
};

export default function Modal(props) {
  return createPortal(
    <div style={modalStyle}>{props.children}</div>,
    document.getElementById("modal_root")
  );
}
