import React from 'react';
import './progressBar.css'

export class ProgressBar extends React.Component {
  render() {
    return (
      <div className="progressContainer">
        <div className="circle"> </div>
        <div className="line"></div>
        <div className="circle"></div>
        <div className="line"></div>
        <div className="circle"></div>
        <div className="line"></div>
        <div className="circle"></div>
      </div>
    );
  }
}
