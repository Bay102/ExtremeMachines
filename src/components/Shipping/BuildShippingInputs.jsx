import React from "react";
import { InputBase } from "../InputBase/InputBase";

 const shippingInputs = [
      { id: "1", type: "text", label: "Address Title", name: "addressTitle" , error: 'addressTitle'},
      { id: "2", type: "text", label: "Name", name: "name" , error: 'name'},
      { id: "3", type: "text", label: "Address", name: "address" , error: 'address'},
      { id: "4", type: "text", label: "Zip", name: "zip" , error: 'zip'},
      { id: "5", type: "text", label: "Home Phone", name: "homePhone" , error: 'homePhone'},
      { id: "6", type: "text", label: "Cell Phone", name: "cellPhone" , error: 'cellPhone'},
    ];

export const BuildShippingInputs = (props) => {
   const { state, handleBlur, handleInputChange } = props;
   return( 
       shippingInputs.length
          ? shippingInputs.map((input, index) => (
              <label key={index} htmlFor={input.id}>
                <InputBase
                  autoComplete="off"
                  id={input.id}
                  value={state.shippingInfo[input.name] || ''}
                  onBlur={handleBlur}
                  onChange={handleInputChange}
                  placeholder={input.label}
                  type={input.type}
                  label={input.label}
                  name={input.name}
                  errorM={
                    state.error &&
                    state.error[input.error] &&
                    state.error[input.error].length > 1
                      ? state.error[input.error]
                      : state.error[input.error]
                  }
                />
              </label>
            ))
          : null
   )
}