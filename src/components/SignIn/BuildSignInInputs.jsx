import React from "react";
import { InputBase } from "../InputBase/InputBase";


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
 