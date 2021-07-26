import React, { Component } from "react";

export default class Multipleanswer extends Component {
  render() {
    return (
      <div>
          {this.props.choices.map((choices, key) => (
          <div key={key} >
            <div className={"row " + this.props.none}>
              <div className="col-sm">
                <div className="form-group">
                  <label>Question:</label>
                  <input className="form-control" name={choices.word} type="text" value={choices.word} onChange={this.props.updateQuestion}/> 
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                <div className="form-group">
                  <label>Setup answers:</label> &nbsp;  
                  <span className={this.props.bagdeclass + " m-b-20"}> answers </span>               
                  <div className="linha"></div>
                </div>
              </div>
            </div>         
            <div className="row">
              <div className="col-md mx-auto">
                <div className="m-b-20 border multi mx-auto">
                  <div className="form-group">
                    <div className="text-center m-b-10">
                      <span className={this.props.bagdeclass}>
                        Answers
                      </span>
                    </div>                  
                    <div className="text-center">
                      <input type="text" name="values" className={"asw_input " + this.props.asw} value={this.props.values} onChange={this.props.onChange} />
                      <a href="#" onClick={() => this.props.addItem(this.props.values, key)} >
                        <img alt="" className="text-center" src={this.props.img} />
                      </a>
                    </div>
                    <table className="asw_table table-responsive mx-auto ml-3">
                      <tbody>
                        {choices.optionlist.map((text) => (
                          <tr key={"opt_" + text}>
                            <td>{text}</td>
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
            </div>
          </div>
          ))}
      </div>
    );
  }
}
