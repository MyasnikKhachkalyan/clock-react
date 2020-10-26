import React, { Component } from 'react';
import './App.css';
import BinClock from "./components/BinClock";
import AnalogClock from "./components/AnalogClock";

export default class App extends Component<any, any> {
  render() {
    return (
      <div className="App">
        <AnalogClock/>
        <BinClock/>
      </div>
    );
  }
}


