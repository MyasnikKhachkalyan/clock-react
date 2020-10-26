import React, { PureComponent } from 'react';

class AnalogClock extends PureComponent<any, { startS: number, startM: number, startH: number }> {
  state = {
    startH: 0,
    startM: 0,
    startS: 0
  }

  componentDidMount() {
    const date = new Date();
    const newState = {
      startH: date.getHours(),
      startM: date.getMinutes(),
      startS: date.getSeconds()
    }
    this.setState(newState)
  }

  render() {
    const {startH, startM, startS} = this.state;

    const analogSecondsStyle = {
      animationDelay: `-${ startS }s`
    }

    const analogMinutesStyle = {
      animationDelay: `-${ startM * 60 + startS }s`
    }

    const analogHoursStyle = {
      animationDelay: `-${ (startH % 12) * 3600 + startM * 60 + startS }s`
    }

    return (
      <div className="analog">
        <img src={ require('../assets/clock-bg.jpg') } alt=""/>
        {/*<Sec/>*/ }
        {/*<Min/>*/ }
        {/*<Hou/>*/ }
        <div className="arrow seconds" style={ analogSecondsStyle }/>
        <div className="arrow minutes" style={ analogMinutesStyle }/>
        <div className="arrow hours" style={ analogHoursStyle }/>
      </div>
    );
  }
}

export default AnalogClock;