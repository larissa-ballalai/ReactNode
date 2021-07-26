import React, { Component } from "react";

export default class DragDrop extends Component {

onDragStart = (e) => {
  e.dataTransfer.setData("chunk", e.target.id)
}

onDragOver = (e) => {
    e.preventDefault()
}

onDrop = (e) => {
    e.preventDefault()

    var id_drag = e.dataTransfer.getData("chunk")
    var text_drag = document.getElementById(id_drag).innerText
    var id_drop = e.target.id
    var text_drop = document.getElementById(id_drop).innerText
    var new_value = text_drop + ' ' + text_drag

    this.props.updateChuncks(id_drop, new_value, id_drag);
}

onDragend = (e) => {
  
}

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
          <div className="col-md-1 m-auto d-flex justify-content-center ">
              <div className="form-group m-t-20">                               
                <a className="btn chuncksorange btn-outline" href="#" onClick={this.props.generateChuncks} >Tokenize</a>                
              </div>
          </div> 
        </div>
        <div className="row">
          <div className="col-sm ">
            <div className="form-group">
              <label>Setup multiple choice:</label>
              <span className="badge badge-orange m-b-20 ml-2"> words </span>
              <div className="linha"></div>
            </div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-sm">
            <div className="form-group">
              <div className="d-flex justify-content-between  m-b-30">
                <div className=" row m-auto ">
                  {this.props.chuncks.map((text, index) => (                      
                      <span className= { (text.position.length !== undefined ? 'chuncksorange  btn-outline' : 'tokens orange ') }
                            onClick={() => this.props.createList(text.text, index)}
                            key={index} id={index} name={'sp_ck_' + index}
                            draggable="true"
                            onDragStart={this.onDragStart} onDragOver={this.onDragOver} onDrop={this.onDrop} onDragEnd={this.onDragend} >
                        {text.text}                                               
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mx-auto m-b-20 border">
            <div className="m-b-10">
              <div className="form-group">
                <div className="text-center m-b-10 ">
                  <span className="badge badgelg-orange">Multiple choice</span>
                </div>
                <div>
                  <input type="text" name="values" placeholder="add wrong choice" className="asw_input orange" value={this.props.values} onChange={this.props.onChange}/>
                  <a href="#" onClick={() => this.props.addWrongAnswer(this.props.values) }>
                      <img className="text-center" src="../../img/add5.png" />
                  </a>
                </div>
                <table className="asw_table ml-3">
                  <tbody>
                    
                    {this.props.choices.filter(f => f.word === "").map((choices, key) => (
                      <tr key={"wr_" + key}>
                        <td>{choices.optionlist[0]}</td>
                        <td href="#" onClick={() => this.props.deleteItem(choices.optionlist[0])}>
                          <img className="cancelred buts" src="../../img/brocoli.png"/>
                        </td>
                      </tr>
                    ))}

                    {this.props.choices.filter(f => f.word !== "").map((choices, key) => (
                      <tr key={"opt_" + key}>
                        <td>{choices.word}</td>                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
