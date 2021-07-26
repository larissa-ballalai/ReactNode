import React, { Component } from "react";

export default class Countdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
          intervalId: 0,
          currentCount: null
        };
    } 

  componentDidMount() {
      var intervalId = setInterval(this.timer, 2000);
      this.setState({ intervalId: intervalId });   
  }

  timer = () => {    
      if(this.state.currentCount == null)
          this.setState({currentCount: this.props.timer})

      var newCount = this.state.currentCount - 1;
      if (newCount >= 0) 
          this.setState({ currentCount: newCount })
      else {
          clearInterval()
          this.props.next()
      }
  }

  render() {
    return (
      <div className="w-100px timer">
        <div className={this.props.color}>Timer</div>
        <div className={this.props.colortext}>
          <section className="p-2 font-20 ">{this.state.currentCount}</section>
        </div>
      </div>
    );
  }
}
