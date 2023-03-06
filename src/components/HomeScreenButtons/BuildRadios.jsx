import React from "react";
import { Radios } from "./Radios";

const radioData = [
   {
     title: 'Sign In',
     id: 'signIn',
     type: 'radio',
     name: 'chooseLogin',
     value: 'signIn',
   },
   {
     title: 'Create Account',
     id: 'createAccount',
     type: 'radio',
     name: 'chooseLogin',
     value: 'createAccount',
   },
 ];


export const BuildRadios = (props) => {
   const {changePage} = props
   return (
     radioData.length
       ? radioData.map((radio, index) => (
           <label style={{ marginRight: '20px' }} htmlFor={radio.id} key={index}>
             <Radios
               id={radio.id}
               type={radio.type}
               onChange={(e) => changePage(e.target.value)}
               name={radio.name}
               value={radio.value} 
             />
             {radio.title}
           </label>
         ))
       : null
   )
 }