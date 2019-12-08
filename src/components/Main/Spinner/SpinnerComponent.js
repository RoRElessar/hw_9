import React, { Component } from 'react'
import './Spinner.scss'

class SpinnerComponent extends Component {
  render () {
    return (
      <div className="vader">
        <div className="shadow"/>
        <div className="head">
          <div className="helmet"><span className="left"/><span className="right"/></div>
          <div className="eyes"><span className="left"/><span className="right"/></div>
          <span className="grill"><span className="left"/><span className="center"/><span
            className="right"/></span><span
          className="mask"><span className="top"/><span className="left"/><span className="center"/><span
          className="right"/></span><span className="line"/></div>
        <div className="torso"><span className="neck"><span className="left"/><span className="center"/><span
          className="right"/><span className="bottom"/></span><span className="belt"><span className="center"/></span>
          <div className="plate"><span className="red_top"/><span className="red_center"/><span
            className="red_bottom"/><span className="blue"/><span className="gray"/></div>
        </div>
        <div className="hand left"><span className="hand"/></div>
        <div className="hand right animation-right"><span className="hand"/></div>
        <div className="legs"><span className="left"/><span className="right"/></div>
        <div className="boots"><span className="left"/><span className="right"/></div>
        <div className="sword animation-left"><span className="handle"/><span className="light"/></div>
      </div>
    )
  }
}

export default SpinnerComponent
