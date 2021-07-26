import React, { Component } from "react";
import axios from "axios";
import PTDragDrop from "./pt-dragdrop";
import PTButton from "./pt-button";
import { saveTest } from "../scripts/test";

export default class PTGrammarB extends Component {
  constructor(props) {
      super(props);

      this.state = {
          name: "",
          order: 0,
          sentence_type: "",
          sentence: "",
          choices: [],
          values: "",
          chuncks: [],
          timer: 0,
          level: "",
          ptmodel: "",
          modelname: "",
          grammar: "",
          test: []
      }
}

componentDidMount() {
    axios
        .get(apiURL() + "questions/" + this.props.id)
        .then((response) => {
            this.setState({
                ptmodel: response.data.ptmodel,
                name: response.data.name,
                order: response.data.order,
                modelname: response.data.modelname,
                level: response.data.level,
                timer: response.data.timer,
                sentence_type: response.data.sentence_type,
                sentence: response.data.sentence,
                choices: response.data.choices,
                grammar: response.data.grammar,
                chuncks: response.data.chuncks
            });
        })
        .catch(function (error) { console.log(error); });     
}

onChange = (e) => {
  e.preventDefault();
  this.setState({ [e.target.name]: e.target.value });
}

updateChuncks = (pos, value) => {
  var chuncks = this.state.chuncks;
  chuncks[pos].answer = value;

  var id = "ch_" + chuncks[pos].position;
  this.setState({ chuncks: chuncks });  
}

onSubmit = (e) => {        
  e.preventDefault();
  saveTest(this);
}

render() {
  return (
      <form onSubmit={this.onSubmit}>
          <PTDragDrop sentence={this.state.sentence} values={this.state.values}
            choices={this.state.choices} chuncks={this.state.chuncks} deleteItem={this.deleteItem}
            updateChuncks={this.updateChuncks} onChange={this.onChange}/>
          <PTButton class=" btn-big gradient-orange" redirect="../question" />
      </form>
    );
  }
}
