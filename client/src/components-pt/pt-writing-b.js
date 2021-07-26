import React, { Component } from "react";
import axios from "axios";
import { adminConfig, apiURL } from "../api";
import PTButton from "./pt-button";
import { saveTest } from "../scripts/test";
import Countdown from "./countdown"
import QuestionBack from "./questionback";

export default class PTWritingB extends Component {
constructor(props) {
super(props);

this.state = {
    choices: [{ word: "", optionlist: [] }],
    value: "",
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
    .catch(function (error) { console.log(error); });    
}
onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
}

correctAnswer = (e) => {
    this.setState({ values: e });
};

onSubmit = (e) => {
    e.preventDefault();
    saveTest(this, "Writing");
};

render() {
    return (    
        <form className="text-center" onSubmit={this.onSubmit}>
            <Countdown timer={this.state.timer} color="toptimer white t-purple" colortext="bottimer txt-purple" next={() => saveTest(this, "Writing")}/>
                <div className="m-t-40 cl-p">
                    <b>{this.state.sentence_type}</b>
                </div>
                <div className="st2 wr">{this.state.sentence}</div>
                <div className="row m-t-40">
                    <div className="col-sm-7 st4 m-auto p-2">
                      1. {this.state.choices[0].word}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-7 m-auto">
                        <div className="form-group">
                            <input name="value" className="form-control purple-shadow" value={this.state.value} onChange={this.onChange} ></input>
                        </div>
                    </div>
                </div>
            <PTButton class="btn-big gradient-purple" redirect="../question" />
        </form>
    );
  }
}
