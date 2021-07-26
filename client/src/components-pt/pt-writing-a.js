import React, { Component } from "react";
import axios from "axios";
import { adminConfig, apiURL } from "../api";
import PTAudio from "./pt-audio";
import PTButton from "./pt-button";
import { saveTest } from "../scripts/test";
import Countdown from "./countdown"

export default class PTWritingA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      choices: [],
      value: '',
      audio:''
    };
  }

componentDidMount() {
    axios.get(apiURL() + "questions/" + this.props.id)
          .then((response) => {
              var audio = {
                  blob: adminConfig().audio + response.data.sentence,
                  name: response.data.sentence,
                  file: null
              };

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
                  audio: audio,
                  background: response.data.background
              });
    })
    .catch(function (error) { console.log(error); });
}
onChange = (e) => {
  e.preventDefault();
  this.setState({ [e.target.name]: e.target.value });
};

correctAnswer = (e) => {
    this.setState({ values: e });
};

onSubmit = (e) => {
    e.preventDefault();
    saveTest(this, "Writing");
};

render() {
  return (
      <div>
        <form onSubmit={this.onSubmit}>
            <Countdown timer={this.state.timer}
                color="toptimer white t-purple"
                colortext="bottimer txt-purple" 
                next={() => saveTest(this, "Writing")}/>
              <div className="row">
                <div className="col-sm-8 m-auto">
                  <div className="form-group">
                    <label className="m-b-10 f-18">{this.props.enunciado2}</label>
                      <textarea rows="8" cols="50" name="value" className="form-control purple-shadow" value={this.state.value} onChange={this.onChange}>
                      It was a dark and stormy night...
                      </textarea>
                  </div>
                </div>
              </div>
            <PTAudio img="../../../img/replaywriting.png" audio={this.state.audio} addAudio={this.addAudio} />
            <PTButton class=" btn-big gradient-purple" redirect="../question" />
        </form>
      </div>
    );
  }
}
