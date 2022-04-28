import React, {Component} from "react";

export default class Cell extends Component {
  
  shouldComponentUpdate(nextProp) {
    const {rowIndex, colIndex, value} = this.props;
    return `${rowIndex}${colIndex}${value}` !== `${nextProp.rowIndex}${nextProp.colIndex}${nextProp.value}`
  }

  handleChange = (e) => {
    const {onChangeVal, rowIndex, colIndex} = this.props;
    const val = e.target.value;
    onChangeVal(val, rowIndex, colIndex);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {rowIndex, colIndex, value, onChangeVal} = this.props;
    try {
      if(value && value[0] === '=') {
        let expression = value.trim().substring(1); // remove = from string, SUM(1+2+3)
        let actionFn = expression.split('('); // Returns ['SUM/MUL/SUB', '1+2+3)'] etc
        expression = actionFn[1].substring(0, actionFn[1].length -1); // Remove last )
        let result;
        switch(actionFn[0]) {
          case 'SUM': {
            result = expression.split(',').reduce((acc, item) => {
              var num = Number(item);
              if(num) {
                return acc+num;
              }else {
                return acc;
              }
            }, 0);
            break;
          }
          case 'MUL': {
            result = expression.split(',').reduce((acc, item) => {
              var num = Number(item);
              if(num) {
                return acc*num;
              }else {
                return acc;
              }
            }, 1);
            break;
          }
          case 'SUB':result = expression.split(',').reduce((acc, item) => {
            var num = Number(item);
            if(num) {
              return acc-num;
            }else {
              return acc;
            }
          });
          break;
          default : result = null
        }
        if(result) {
          onChangeVal(result, rowIndex, colIndex)
        }
      }
    } catch (error) {
      alert("Error in calculation")
    }
  }

  render() {
    return (<form onSubmit={this.handleSubmit}>
      <input value={this.props.value} onChange={this.handleChange} className="cell" /></form>
    )
  }
}
