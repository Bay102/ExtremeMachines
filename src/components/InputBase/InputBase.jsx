import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./InputBase.css";

const revealPassword = () => {
  const eyeGrab = document.querySelectorAll(".eye");
  eyeGrab.forEach((button) => {
    button.addEventListener("click", () => {
      button.previousElementSibling.type === "password"
        ? button.previousElementSibling.setAttribute("type", "text")
        : button.previousElementSibling.setAttribute("type", "password");
    });
  });
};

export const InputBase = ({ type, errorM, ...props }) => (
  // {errorMessageHere}
  <div className="inputContainer">
    <input className="input-root" type={type} {...props} />
    {type === "password" ? (
      <FontAwesomeIcon onClick={revealPassword} icon={faEye} className="eye" />
    ) : undefined}
    {errorM && <div className="error">{errorM}</div>}
  </div>
);
