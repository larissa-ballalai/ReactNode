import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Button extends Component {
  render() {
    return (
      <div key="button">
        <div className="d-flex justify-content-center bd-highlight mb-3 m-t-80">
            <Link className="btn btn-secondary waves-effect waves-light" to={this.props.redirect}> Back </Link>
            <input type="submit" value="Save" className={"btn waves-effect waves-light m-l-10 " + this.props.class} />
        </div>          
      </div>
    );
  }
}



