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
  render() {
    return (
      <input value={this.props.value} onChange={this.handleChange} className="cell" />
    )
  }
}
