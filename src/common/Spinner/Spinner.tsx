import './Spinner.css';
import React from 'react';
import ReactDOM from 'react-dom';

export const Spinner = () => {
  return ReactDOM.createPortal(
    <div className="lds-default">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>,
    document.getElementById('spinner') as HTMLElement
  );
};
