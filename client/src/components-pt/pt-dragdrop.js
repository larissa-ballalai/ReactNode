import React, { Component } from "react";

export default class PTDragDrop extends Component {
  onDragStart = (e) => {
    e.dataTransfer.setData("chunk", e.target.id);
  };

  onDrop = (e) => {
    e.preventDefault();
    var drag = e.dataTransfer.getData("chunk")
    var drag_text = document.getElementById(drag).innerText
    this.props.updateChuncks(e.target.id, drag_text)

    document.getElementById(drag).style.display = "none"
  }

  onDragStartOverAgain = (e) => {
    e.dataTransfer.setData("chunkback", e.target.id)
  }

  onDropChoices = (e) => {
    e.preventDefault();
    var drag = e.dataTransfer.getData("chunkback");
    var answer = document.getElementById(drag).innerText;
    this.props.updateChuncks(drag, "");
  };

  onDragOver = (e) => {
    e.preventDefault();
  };

  onDragend = (e) => {};

  render() {
    return (
      <>
        <div className="row">
          <div className="col-sm">
            <div className="form-group">
              <label>Preencha as lacunas para composição da frase:</label>
            </div>
          </div>
        </div>
        <div className="d-flex m-b-30 m-t-30 justify-content-center ">
          {this.props.choices.map((choices, key) => (
            <div className="m-1">
              <span id={"ch_" + key} draggable="true" onDragStart={this.onDragStart} onDragEnd={this.onDragend} className="drag" key={"wr_" + key} >
                {choices.optionlist[0]}
              </span>
            </div>
          ))}
        </div>

        {/* text + answer */}

        <div className="row">
          <div className="col-sm text-center">
            <div className="form-group">
              <div className="m-t-30">
                {this.props.chuncks.map((text, index) => (
                  <div className="d-inline-block align-self-center m-1">
                    {text.position.length !== undefined ? (
                      <span id={"ck_" + index} className="sentence"> {text.text} </span>
                    ) : (
                      <span id={index} name={text.answer} draggable="true" className="drop dot-orange" 
                            onDragStart={this.onDragStartOverAgain} onDragOver={this.onDragOver} onDrop={this.onDrop}>
                        {text.answer}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="row" onDragOver={this.onDragOver} onDrop={this.onDropChoices}>
        </div>
      </>
    );
  }
}
