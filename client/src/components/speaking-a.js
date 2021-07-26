import React, { Component } from "react";
import axios from "axios";
import ReactS3 from "react-s3";
import Question from "./question";
import Audio from "./audio";
import Modal from "./modal";
import Button from "./button";
import Multiplechoice from "./multiplechoice";
import ImgBackground from './img-background'
import { apiURL ,adminConfig} from "../api";
import { uploadBackground } from "../scripts/upload";
import BaseQuestion from "./base-question";

export default class SpeakingA extends Component {
constructor(props) {
  super(props);

  this.state = {
    name: '',
    order: 0,
    sentence_type: '',
    sentence: '',
    values: '',
    audio: '',
    choices: [{ word: "correct answer", optionlist: [] }],
    file: [],

    show: false,                
    timer: 45,
    level: 'A1',
    ptmodel: 'Academic',
    modelname: 'Speaking-A',
    grammar: 'To be present tense',
  };
}

addFiles = (e) => {
    let file = this.state.file
        file = { blob: URL.createObjectURL(e.target.files[0]), 
                      name: e.target.files[0].name,
                      file: e.target.files[0]}

    this.setState({ file: file})
}

deleteFile = (e) => {
  this.setState({ file: ""})
}

componentDidMount() {
  if (this.state.edit !== undefined) {
    axios.get(apiURL() + "questions/" + this.props.match.params.id)
      .then((response) => {
        var audio = {
          blob: adminConfig().root + "sa/" + response.data.sentence,
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
          file: { 
            blob: adminConfig().root + "back/sa/" + response.data.background, 
            name: response.data.background,
            file: null },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

onSubmit = (e) => {
  e.preventDefault();

  ReactS3.uploadFile(this.state.audio.file, adminConfig('sa').config)
  .then((data) => {console.log(data);})
  .catch((err) => {console.log(err);});

  uploadBackground(this, "back/sa")

  const question = {
      ptmodel: this.state.ptmodel,
      name: this.state.name,
      order: this.state.order,
      modelname: this.state.modelname,
      level: this.state.level,
      timer: this.state.timer,
      sentence_type: this.state.sentence_type,
      sentence: this.state.audio.name,
      choices: this.state.choices,
      grammar: this.state.grammar,
      chuncks: '',
      background: this.state.file.name
      
  };

  if (this.props.match.params.id == undefined) {
    axios.post(apiURL() + "questions/add", question)
          .then((res) => console.log(res.data))
          .catch((error) => { console.log(error);})
  } else {
    axios.post(apiURL() + "questions/update/" + this.props.match.params.id, question)
          .then((res) => console.log(res.data))
          .catch((error) => { console.log(error);})
  }
    
  this.setState({ show: true });
};

onChangeValues = (e) => {
  this.setState({values: e})
}

onChange = (e) => {
  e.preventDefault();
  this.setState({ [e.target.name]: e.target.value });
};

correctAnswer = (e) => {
  let choices = this.state.choices;
  choices[0].word = e;
  this.setState({ choices: choices });
};

updateList = (key, newlist) => {
  let choicesList = [...this.state.choices];
  let choice = { ...choicesList[key] };
  choice.optionlist = newlist;
  choicesList[key] = choice;

  this.setState({ choices: choicesList });
};

addItem = (item, key) => {
  let list = this.state.choices[key].optionlist.filter((i) => i !== item);
  let newlist = list.concat(item);

  this.updateList(key, newlist);
}

deleteItem = (item, key) => {
  let newlist = this.state.choices[key].optionlist.filter((i) => i !== item);
  this.updateList(key, newlist);
}

addAudio = (e) => {
  var blob = URL.createObjectURL(e.target.files[0]);
  var audio = {
    file: e.target.files[0],
    name: e.target.files[0].name,
    blob: blob
  };
  this.setState({ audio: audio });
};

hideModal = () => {
  this.setState({ show: false });
};

render() {
  this.state.edit = this.props.match.params.id;
    return (
     <BaseQuestion name="Speaking A" color="card badge-pink">
        <form onSubmit={this.onSubmit}>
          <Question ptmodel={this.state.ptmodel} name={this.state.name} order={this.state.order} level={this.state.level} timer={this.state.timer} modelname={this.state.modelname}   grammar={this.state.grammar} onChange={this.onChange} />
          <Audio audio={this.state.audio} addAudio={this.addAudio} />
          <Multiplechoice sentence={this.state.sentence} values={this.state.values} choices={this.state.choices} addItem={this.addItem} deleteItem={this.deleteItem} onChange={this.onChange} correctAnswer={this.correctAnswer}
            bagdeclass="badge badge-pink" bagdeclass2="badge badgelg-pink" asw="pink" img="../../img/addpink.png" ck="checkmark" />
          <ImgBackground src="../../img/upfilepink.png " classname="btn btn-outline-pink " file={this.state.file} addFiles={this.addFiles} deleteFile={this.deleteFile} values={this.state.values} onChangeValues={this.onChangeValues}/> 
          <Button class="badge-pink" redirect="../../admin/question" />
          <Modal show={this.state.show} hideModal={this.hideModal} text ="Item added successfully!" redirect="../../admin/question" ></Modal>
        </form> 
      </BaseQuestion>      
    );
  }
}
