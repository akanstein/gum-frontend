import React from "react";
import logo from "../logo.svg";
import logoText from "../logo-text.svg";

const Loader = () => {
  return (
    <div className="App-header splash">
      <div className="App-logo">
        <img src={logo} className="logo-image" alt="logo" />
        <img src={logoText} className="logo-text" alt="logo" />
      </div>
    </div>
  );
};

export default Loader;
