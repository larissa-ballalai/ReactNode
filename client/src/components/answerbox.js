import React, { Component } from "react";

export default class AnswerBox extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-10">
            <div className="form-group">
              <label>Sentence: </label>
              <input type="text" name="sentence" required className="form-control" value={this.props.sentence} onChange={this.props.onChange} />
            </div>
          </div>
          <div className="col-md-1 m-auto d-flex justify-content-center">
            <div className="form-group m-t-20">
              <a className="btn input_chunks btn-outline" href="#" onClick={this.props.generateChuncks} > Tokenize </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm ">
            <div className="form-group">
              <label>Setup multiple choice: </label>
              <span className="badge badge-azul m-b-20 ml-2">words</span>
              <div className="linha"></div>
            </div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-sm">
            <div className="form-group">
              <div className="d-flex justify-content-between  m-b-30">
                <div className="row m-auto ">
                  {this.props.chuncks.map((text, index) => (
                    <span key={index} name={"sp_ck_" + index} className={text.position.length !== undefined ? "input_chunks btn-outline": "tokens  blue "} onClick={() => this.props.createList(text.text, index)}>
                      {text.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {this.props.choices.map((choices, key) => (
            <div key={"ab_" + key} className="col-md-4 mx-auto">
              <div className="m-b-20 border">
                <div className="form-group">
                  <div className="text-center m-b-10">
                    <span className="badge badgelg-azul">{choices.word}</span>
                  </div>
                  <div>
                    <input type="text" name="values" className="asw_input blue" value={this.props.values} onChange={this.props.onChange} />
                      <a href="#" onClick={() => this.props.addItem(this.props.values, key)} >
                        <img alt="" className="text-center" src="../../img/add3.png"/>
                      </a>
                  </div>
                  <table className="asw_table ml-3">
                    <tbody>
                      {choices.optionlist.map((text) => (
                        <tr key={"opt_" + text}>
                          <td>{text}</td>
                          <td href="#" onClick={() => this.props.deleteItem(text, key)}>
                            <img className="cancelred buts" src="../../img/brocoli.png"/>
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
