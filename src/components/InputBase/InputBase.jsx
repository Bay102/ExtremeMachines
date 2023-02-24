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

const inputData = [
  {
    id: 1,
    type: "text",
    label: "email",
    name: "userEmail",
    error: "userEmail",
  },
  {
    id: 2,
    type: "password",
    label: "password",
    name: "userPassword",
    error: "userPassword",
  },
];

// export const BuildSignInInputs = ({signInState}) => (
//   // const {state} = this.props.signInState

//    <h2>Sign In</h2>
//   {inputData.length
//     ? inputData.map((input, index) => (
//         <label key={index} htmlFor={input.id}>
//           <InputBase
//             autoComplete="off"
//             id={input.id}
//             value={this.state.credentials[input.name] || ""}
//             onBlur={this.handleBlur}
//             onChange={this.handleInputChange}
//             placeholder={input.label}
//             type={input.type}
//             label={input.label}
//             name={input.name}
//             errorM={
//               this.state.error &&
//               this.state.error[input.error] &&
//               this.state.error[input.error].length > 1
//                 ? this.state.error[input.error]
//                 : this.state.error[input.error]
//             }
//           />
//         </label>
//       ))
//     : null}
//       <div className="signInSubmit">
//             <button type="submit">Sign In</button>
//           </div>

// )

// )

export const BuildSignInInputs = (props) => {
  const { signInState, handleInputChange, handleBlur } = props;

  return (
    <div className="inputsWrapper">
      <h2>Sign In</h2>
      {inputData.length
        ? inputData.map((input, index) => (
            <label key={index} htmlFor={input.id}>
              <InputBase
                autoComplete="off"
                id={input.id}
                value={signInState.credentials[input.name] || ""}
                onBlur={handleBlur}
                onChange={handleInputChange}
                placeholder={input.label}
                type={input.type}
                label={input.label}
                name={input.name}
                errorM={
                  signInState.error &&
                  signInState.error[input.error] &&
                  signInState.error[input.error].length > 1
                    ? signInState.error[input.error]
                    : signInState.error[input.error]
                }
              />
            </label>
          ))
        : null}
      <div className="signInSubmit">
        <button type="submit">Sign In</button>
      </div>
    </div>
  );
};
