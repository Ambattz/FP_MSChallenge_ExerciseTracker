import React from "react";
import { Component } from "react";
import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Home></Home>
      </BrowserRouter>
    );
  }
}

export default App;
