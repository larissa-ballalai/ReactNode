import React, { Component } from "react";

export default class Multiplechoice extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm">
            <div className="form-group">
              <label>Setup multiple choice:</label> &nbsp;
              <span className={this.props.bagdeclass + " m-b-20"}>
                sentence
              </span>
              <div className="linha"></div>
            </div>
          </div>
        </div>
        <div className="row">
          {this.props.choices.map((choices, key) => (
            <div key={key} className="col-md mx-auto">
              <div className="m-b-20 border multi mx-auto">
                <div className="form-group">
                  <div className="text-center m-b-10">
                    <span className={this.props.bagdeclass}>
                      Multiple choice
                    </span>
                  </div>
                  <div className="text-center">
                    <input
                      type="text"
                      name="values"
                      className={"asw_input " + this.props.asw}
                      value={this.props.values}
                      onChange={this.props.onChange}
                    />
                    <a
                      href="#"
                      onClick={() => this.props.addItem(this.props.values, key)}
                    >
                      <img
                        alt=""
                        className="text-center"
                        src={this.props.img}
                      />
                    </a>
                  </div>
                  <table className="asw_table table-responsive mx-auto ml-3">
                    <tbody>
                      {choices.optionlist.map((text) => (
                        <tr key={"opt_" + text}>
                          <td>{text}</td>

                          <td>
                            <label className="custom-checkbox">
                              <input className="checkk" type="checkbox" value={text} checked={this.props.choices[0].word === text} onChange={() => this.props.correctAnswer(text)}/>
                              <span className={this.props.ck + " m-t-10 m-l-20"} ></span>
                            </label>
                          </td>

                          <td href="#" onClick={() => this.props.deleteItem(text, key)} >
                            <img alt="" className="cancelred buts " src="../../img/brocoli.png" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
