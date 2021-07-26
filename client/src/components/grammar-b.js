import React, { Component } from 'react';
import axios from 'axios';
import DragDrop from './dragdrop';
import Question from './question';
import Modal from "./modal";
import Button from "./button";
import BaseQuestion from "./base-question"
import { apiURL } from '../api';

export default class GrammarB extends Component {

constructor(props) {
    super(props);
   
    this.state = {
        name: '',
        order: 0,
        sentence_type: '',
        sentence: '',
        choices: [], 
        values: '',
        chuncks: [],

        show: false,                
        timer: 45,
        level: 'A1',
        ptmodel: 'Academic',
        modelname: 'Grammar-B',
        grammar: 'To be present tense',
    }
}

componentDidMount() {   

    if(this.state.edit !== undefined) {
          axios.get(apiURL() + 'questions/'+this.props.match.params.id)
               .then(response => {                                      
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
                    })
                })
               .catch(function (error) {console.log(error);})
    }
}

onSubmit = (e) => {
    e.preventDefault();
    
    console.log(this.state.chuncks)
    console.log(this.state.choices) 
    
    const question = {
        ptmodel: this.state.ptmodel,
        name: this.state.name,
        order: this.state.order,
        modelname: this.state.modelname,
        level: this.state.level,
        timer: this.state.timer,
        sentence_type: this.state.sentence_type,
        sentence: this.state.sentence,
        choices: this.state.choices,
        grammar: this.state.grammar,
        chuncks: this.state.chuncks
    };

    if(this.props.match.params.id === undefined) {
        axios.post(apiURL() + 'questions/add', question)
                .then(res => console.log(res.data))
                .catch((error) => {console.log(error)})
        }    else {
        axios.post(apiURL() + 'questions/update/'+this.props.match.params.id, question)
                .then(res => console.log(res.data))
                .catch((error) => {console.log(error);})
    }

    this.setState({ show: true });
}

onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]:e.target.value});
}

generateChuncks = (e) => {
    var sentence = this.state.sentence.trim().split(" ").filter(f => f !== "")

    let ck = []
    for(var i=0; i < sentence.length; i++) {
        ck = ck.concat({text: sentence[i], position: ''})
    }
    
    this.setState({ chuncks: ck});
    this.setState({ choices: []});
}

updateChuncks = (pos, value, del) => {
    var chuncks = this.state.chuncks
    chuncks[pos].text = value
    chuncks[del].text = ''
    this.setState({chuncks: chuncks.filter(f => f.text !== '')})
}

createList = (word, index) => {
    var chunck = document.getElementsByName('sp_ck_' + index)[0];  

    let choicesList = this.state.choices
    let chuncks = this.state.chuncks
    var exists = choicesList.filter(w => w.word === word)
    
    if(exists == '') {
        let choice = { word: word, optionlist: [word]}
        choicesList = choicesList.concat(choice) 
        chuncks[index].position = choicesList.length -1
    } else {
        choicesList = choicesList.filter(w => w.word !== word)
        chuncks[index].position = ''
    }

    this.setState({choices: choicesList});
}

addWrongAnswer = (word) => {
    let choicesList = this.state.choices
    var exists = choicesList.filter(w => w.word === word)
    
    if(exists == '') {
        let choice = { word: "", optionlist: [word]}
        choicesList = choicesList.concat(choice)        
    } else {
        choicesList = choicesList.filter(w => w.word !== word)        
    }

    this.setState({choices: choicesList});
}

deleteItem = (item, key) => {
    let newlist = this.state.choices.filter(i => i.optionlist[0] !== item )
    this.setState({choices: newlist}); 
}

hideModal = () => {
    this.setState({ show: false });
}

render() {
    this.state.edit = this.props.match.params.id;
    return (
        <BaseQuestion name="Grammar B" color="card badge-orange">
            <form onSubmit={this.onSubmit}>
                <Question key="qts" ptmodel={this.state.ptmodel} name = {this.state.name} order = {this.state.order} 
                            level = {this.state.level} timer = {this.state.timer} modelname = {this.state.modelname} 
                            grammar = {this.state.grammar} onChange={this.onChange}/>                                                                                 
                <DragDrop sentence={this.state.sentence} values={this.state.values} choices={this.state.choices}
                            deleteItem={this.deleteItem} createList={this.createList} updateChuncks={this.updateChuncks}
                            onChange={this.onChange} resetChoices={this.resetChoices} 
                            chuncks={this.state.chuncks} generateChuncks={this.generateChuncks} addWrongAnswer={this.addWrongAnswer}/>
                <Button class="badge-orange" redirect="../../admin/question" />
                <Modal show={this.state.show} hideModal={this.hideModal} text ="Item added successfully!" redirect="../../admin/question"></Modal>
            </form>
        </BaseQuestion>          
    )
  }
}

