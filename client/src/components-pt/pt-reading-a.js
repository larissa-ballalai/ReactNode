import React, { Component } from "react";
import axios from "axios";
import PTImages from "./pt-images";
import { adminConfig, apiURL } from "../api";
import PTQuestion from "./pt-question";
import { saveTest } from "../scripts/test";
import Countdown from "./countdown"

export default class PTReadingA extends Component {
constructor(props) {
    super(props);

    this.state = {
        choices: [],
        values: "",
    };
}

componentDidMount() {
axios.get(apiURL() + "questions/" + this.props.id)
        .then((response) => {
            let files = response.data.choices[0];
            let newfiles = [];

            for (var i = 0; i < files.optionlist.length; i++) {
                var img = adminConfig().img + files.optionlist[i];
                newfiles.push({ blob: img, name: files.optionlist[i], file: null });
            }

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
                files: newfiles
            });
    })
    .catch(function (error) { console.log(error); });    
}

onChangeValues = (e) => { 
    this.setState({ values: e });
    saveTest(this, "Reading", e)
}

onSubmit = (e) => {
    e.preventDefault();
}

  render() {
    return (      
        <form className="text-center" onSubmit={this.onSubmit}>
           <Countdown timer={this.state.timer} color="toptimer white t-orange" colortext="bottimer txt-orange" next={() => saveTest(this, "Reading")}/> 
           <PTQuestion sentence={this.state.sentence} />
           <PTImages class="b-orange" files={this.state.files} values={this.state.values} onChangeValues={this.onChangeValues} chekk="cb-orange" />
        </form>
    );
  }
}
