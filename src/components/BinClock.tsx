import React, { Component } from 'react';

interface Clock {
  binArr: string[]
}

const charArr = ['H', 'h', 'M', 'm', 'S', 's'];
const colors = ['#3de2ff', '#3db1ff', '#00d131', '#19ff8c', '#ff1952', '#d10202']

class BinClock extends Component<any, Clock> {
  state: Clock = {
    binArr: []
  }

  private clockInterval: any;

  componentDidMount() {
    this.clockInterval = setInterval(this.clockHandler, 1000);
    console.log("DID mount")
  }

  componentWillUnmount() {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }
  }

  clockHandler = () => {
    const date = new Date();
    const newState = {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    }
    const binArr = [];
    for (const [key, value] of Object.entries(newState)) {
      let tens = Math.floor(value / 10).toString(2);
      if (key === 'hours' && tens.length !== 2) {
        tens = '0' + tens;
      } else if (key !== 'hours') {
        while (tens.length !== 3) {
          tens = '0' + tens;
        }
      }
      binArr.push(tens);
      let units = (value % 10).toString(2);
      while (units.length !== 4) {
        units = '0' + units;
      }
      binArr.push(units);
    }

    this.setState({binArr})
  }

  render() {
    const {binArr} = this.state;
    const binaryClock = binArr.map((combUnit: string, indexBig: number) => {
      return (
        <div className="bin-col" key={ combUnit + indexBig }>
          {
            combUnit.split("").map((unit: string, index: number) => {
              const style = {
                backgroundColor: unit === "1" ? colors[indexBig] : 'grey'
              }
              return (
                <div key={ unit + index } style={ style } className="bin-square">
                  { unit === "1" ? Math.pow(2, combUnit.length - index - 1) : null }
                </div>
              );
            })
          }
        </div>
      )
    });
    const chars = charArr.map((c, index) => {
      return (
        <span key={ c + index } style={ {color: colors[index]} }>{ c }</span>
      )
    })
    const aftermathNum = binArr.map((num: string, index: number) => {
      return (
        <div className="time-unit-num" key={ num + index } style={ {color: colors[index]} }>
          <span>{ num }</span>
          <span className='bin-num'>{ parseInt(num, 2) }</span>
        </div>
      )
    })
    return (
      <div className="binary-container">
        <div className="header-footer">{ chars }</div>
        <div className="binary">{ binaryClock }</div>
        <div className="header-footer footer">{ aftermathNum }</div>
      </div>
    );
  }
}

export default BinClock;
