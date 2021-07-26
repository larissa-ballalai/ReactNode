import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <div>
        <div className={this.props.class}>
          <div className="card-body head">
            <h3 className="text-uppercase verti-label text-white-50">{this.props.text}</h3>
          </div>
        </div>
      </div>
    );
  }
}
