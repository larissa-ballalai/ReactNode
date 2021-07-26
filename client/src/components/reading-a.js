import React, { Component } from 'react';
import axios from 'axios';
import ReactS3 from 'react-s3';
import Question from './question';
import Images from './images';
import Modal from "./modal"; 
import Button from "./button";
import BaseQuestion from "./base-question"
import { adminConfig, apiURL } from '../api';

export default class ReadingA extends Component {

constructor(props) {
    super(props);
    
    this.state = {
        name: '',
        order: 0,
        sentence_type: '',
        sentence: '',
        values: '',  
        choices: [], 
        files: [],

        show: false,              
        timer: 45,
        level: 'A1',
        ptmodel: 'Academic',
        modelname: 'Reading-A',
        grammar: 'To be present tense',
    }
}

addFiles = (e) => {
    let files = this.state.files
    for(var i=0; i < e.target.files.length; i++ ) {
       if(files.filter(f => f.name === e.target.files[i].name).length === 0){
            files.push({ blob: URL.createObjectURL(e.target.files[i]), 
                            name: e.target.files[i].name,
                            file: e.target.files[i]})
       }
    }
    this.setState({ files: files})
}

deleteFile = (e) => {
    let newlist = this.state.files.filter(f => f.name !== e)
    this.setState({ files: newlist})
}

componentDidMount() {
    if(this.state.edit !== undefined) {
          axios.get(apiURL() + 'questions/' +this.props.match.params.id)
               .then(response => {   
               
                    let files = response.data.choices[0]
                    let newfiles = []

                    for(var i=0; i < files.optionlist.length; i++ ) {
                        var img = adminConfig().root + "ra/"+ files.optionlist[i]
                        newfiles.push({ blob: img, 
                                     name: files.optionlist[i],
                                     file: null})}

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
                        files: newfiles,
                        values: response.data.choices[0].word
                    })
                })
               .catch(function (error) {console.log(error);})
        }
}

onSubmit = (e) => {
    e.preventDefault();

    let optionlist = []
    for (let i = 0; i < this.state.files.length; i++) {
        ReactS3.uploadFile(this.state.files[i].file, adminConfig('ra').config)
            .then( (data) => { console.log(data) })
            .catch( (err) => { console.log(err) })  
        optionlist.push(this.state.files[i].name);
    }
    let choices = [{ word: this.state.values, optionlist: optionlist}]    
    
    const question = {
        ptmodel: this.state.ptmodel,
        name: this.state.name,
        order: this.state.order,
        modelname: this.state.modelname,
        level: this.state.level,
        timer: this.state.timer,
        sentence_type: this.state.sentence_type,
        sentence: this.state.sentence,
        choices: choices,
        grammar: this.state.grammar,
        chuncks: ''
    };
    
    if(this.props.match.params.id === undefined) {
        axios.post(apiURL() + 'questions/add', question)
                .then(res => console.log(res.data))
                .catch((error) => {console.log(error)})
        }    else {
        axios.post(apiURL() + 'questions/update/'+ this.props.match.params.id, question)
                .then(res => console.log(res.data))
                .catch((error) => {console.log(error);})
    }
    this.setState({ show: true });
}

onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]:e.target.value});
}

onChangeValues = (e) => {
    this.setState({values: e})   
}

hideModal = () => {
    this.setState({ show: false });
}

render() {
  this.state.edit = this.props.match.params.id;
    return (
        <BaseQuestion name="Reading A" color="card badge-pink">
            <form onSubmit={this.onSubmit}>
                <Question ptmodel={this.state.ptmodel} name = {this.state.name} order = {this.state.order} level = {this.state.level} timer = {this.state.timer} modelname = {this.state.modelname}  grammar = {this.state.grammar} onChange={this.onChange}/>
                <div className="row">
                    <div className="col-sm">
                        <div className="form-group"> 
                            <label>Sentence: </label>
                            <input type="text" name="sentence" required className="form-control" value={this.state.sentence} onChange={this.onChange} />
                        </div>
                    </div>
                </div>
                <Images files={this.state.files} addFiles={this.addFiles} deleteFile={this.deleteFile} 
                values={this.state.values} onChangeValues={this.onChangeValues} />
                <Button class="badge-pink" redirect="../../admin/question" />
                <Modal show={this.state.show} hideModal={this.hideModal} text ="Item added successfully!" redirect="../../admin/question"></Modal>
            </form>
        </BaseQuestion>
    )
  }
}

