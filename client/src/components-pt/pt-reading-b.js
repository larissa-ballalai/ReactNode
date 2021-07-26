import React, { Component } from "react";
import { adminConfig, apiURL } from "../api";
import axios from "axios";
import PTMultiplechoice from "./pt-multiplechoice";
import PTQuestion from "./pt-question";
import { saveTest } from "../scripts/test";
import Countdown from "./countdown"
import QuestionBack from "./questionback";

export default class PTReadingB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      choices: [],
      values: ""
    };
  }

componentDidMount() {
  axios.get(apiURL() + "questions/" + this.props.id)
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
              background: response.data.background
          });
      })
      .catch(function (error) {console.log(error);});    
}

correctAnswer = (e) => {
    this.setState({ values: e });
    saveTest(this, "Reading", e)
};

onSubmit = (e) => {
    e.preventDefault();
};

render() {
  return (  
      <form className="text-center" onSubmit={this.onSubmit}>
          <Countdown timer={this.state.timer} color="toptimer white t-orange"  colortext="bottimer txt-orange" next={() => saveTest(this, "Reading")}/>
          <PTQuestion sentence={this.state.sentence} />
          <PTMultiplechoice values={this.state.values}  choices={this.state.choices} correctAnswer={this.correctAnswer} ck="checkmark pt-cb-orange " /> 
      </form>
    );
  }
}
