import React, { Component } from "react";
import { adminConfig, apiURL} from "../api";
import axios from "axios";
import PTAudio from "./pt-audio";
import PTMultiplechoice from "./pt-multiplechoice";
import { saveTest } from "../scripts/test";
import Countdown from "./countdown"

export default class PTListeningB extends Component {
  constructor(props) {
    super(props);

    this.state = {
        choices: [],
        values: "",
        audio: "",
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


correctAnswer = (e) => {
    this.setState({ values: e });
    saveTest(this, "Listening",  e)
};

onSubmit = (e) => {
  e.preventDefault();
};

  render() {
    return (
      <div>
          <Countdown  timer={this.state.timer}  color="toptimer white t-blue"  colortext="bottimer txt-blue" next={() => saveTest(this, "Listening")}/> 
          <form className="m-t-20" onSubmit={this.onSubmit}>              
              <PTMultiplechoice values={this.state.values} choices={this.state.choices} correctAnswer={this.correctAnswer}/>
              <PTAudio img="../../../img/replay.png" audio={this.state.audio} addAudio={this.addAudio} />
          </form>
      </div>      
    );
  }
}
