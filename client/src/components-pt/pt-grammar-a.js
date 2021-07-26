import React, { Component } from "react";
import axios from "axios";
import { adminConfig, apiURL } from "../api";
import PTAnswerBox from "./pt-answerbox";
import { saveTest } from "../scripts/test";
import Countdown from "./countdown"
import QuestionBack from "./questionback";

export default class PTGrammarA extends Component {
constructor(props) {
    super(props);

    this.state = {
        choices: [],
        chuncks: [],
        values: "",
    };
}

componentDidMount() {
    axios.get(apiURL() + "questions/" + this.props.id)
        .then((response) => {
            for(var i=0; i<response.data.choices.length; i++) {
                var choiceshuffled = response.data.choices[i].optionlist.concat(response.data.choices[i].word)
                    .map((a) => ({sort: Math.random(), value: a}))
                    .sort((a, b) => a.sort - b.sort)
                    .map((a) => a.value)
                response.data.choices[i].optionlist = choiceshuffled
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
                chuncks: response.data.chuncks, 
                background:response.data.background          
            }); 
        })
        .catch(function (error) { console.log(error); });    
} 

onChange = (e) => {       
    e.preventDefault()

    var choices = this.state.choices
    var index_choices = e.target.name
    var value_selected = e.target.value
    choices[index_choices].answer = value_selected
    this.setState({ choices: choices })
    
    var check = 0
    this.state.choices.map(m => {
        if(!m.answer) {
            check++
        }
    })      
    
    if(check === 0) {
        saveTest(this, "Grammar", choices)
    }
}

onSubmit = (e) => {        
    e.preventDefault();
}

render() {    
    return (      
        <form className="cont" onSubmit={this.onSubmit}>
            <Countdown timer={this.state.timer} color="toptimer white t-orange" colortext="bottimer txt-orange" next={() => saveTest(this, "Grammar", this.state.choices)} />
            <PTAnswerBox  sentence={this.state.sentence} values={this.state.values} choices={this.state.choices} chuncks={this.state.chuncks} onChange={this.onChange} />
        </form>
    );
  }
}
