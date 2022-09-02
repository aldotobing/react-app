import React, { Component } from 'react';
import './Calculator.css';
import ResultComponent from 'components/ResultComponent';
import KeyPadComponent from 'components/KeypadComponent';
import {AngkaTerbilang} from 'helper.js';

class Calculator extends Component {
  state = {
    result: "",
    resultTerbilang: ""
  }

  onClick = button => {
    if(button === "=") {
      this.calculate();
    }

    else if(button === "C") {
      this.reset();
    }

    else if(button === "CE") {
      this.backspace();
    }

    else {
      this.setState({
        ...this.state,
        result: this.state.result + button
      })
    }
  };

  calculate = () => {
    var checkResult = ''
    if(this.state.result.includes('--')) {
      checkResult = this.state.result.replace('--', '+')
    } else {
      checkResult = this.state.result;
    }

    try {
      this.setState({
        result: (eval(checkResult) || "") + "",
        resultTerbilang: (eval(checkResult) || "") + "",
      })
    } catch(e) {
      this.setState({
        ...this.state,
        result: "error"

      })
    }
  };

  reset = () => {
    this.setState({
      ...this.state,
      result: "",
      resultTerbilang: ""
    })
  };

  backspace = () => {
    this.setState({
      ...this.state,
        result: this.state.result.slice(0, -1)
    })
  };

  render() {
    return (
      <div>
        <div className="calculator-body">
          <h1>Simple Calculator</h1>
          <ResultComponent result={this.state.result} />
          <h1 className='terbilang'>{AngkaTerbilang(this.state.resultTerbilang)}</h1>
          <KeyPadComponent onClick={this.onClick} />
        </div>
      </div>
    )
  }
}

export default Calculator;