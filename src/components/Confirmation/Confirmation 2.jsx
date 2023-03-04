import React from "react";
import { ProgressBar } from "../ProgressBar /ProgressBar";
import './Confirmation.css'

export class Confirmation extends React.Component {
   state= { 

   }

   render() {
      const { changePage, mainState } = this.props
      return (
         <div>
            <ProgressBar mainState={mainState}/>
            <div className="confirmationContainer">
               hello
            </div>
         </div>
      )
   }



}