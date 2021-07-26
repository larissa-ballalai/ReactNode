import React, { Component } from "react";
import axios from "axios";
import Main from "./main";
import Question from "./question";
import Modal from "./modal";
import Button from "./button";
import ImgBackground from "./img-background"
import { apiURL, adminConfig } from "../api";
import { uploadBackground } from "../scripts/upload";
import BaseQuestion from "./base-question";

export default class SpeakingB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      order: 0,
      sentence_type: "",
      sentence: "",
      choices: [],
      values: "",
      audio: "",

      show: false,
      timer: 45,
      level: "A1",
      ptmodel: "Academic",
      modelname: "Speaking-B",
      grammar: "To be present tense",     
      file: [],     
    };
  }


addFiles = (e) => {
    let file = this.state.file
    file = { blob: URL.createObjectURL(e.target.files[0]), 
              name: e.target.files[0].name,
              file: e.target.files[0]}
    this.setState({ file: file})
}


deleteFile = () => {
    this.setState({ file: ''})
}


componentDidMount() {
  if (this.state.edit !== undefined) {
    axios
      .get(apiURL() + "questions/" + this.props.match.params.id)
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
          file: { 
            blob: adminConfig().root + "back/sb/" + response.data.background, 
            name: response.data.background,
            file: null },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

onChangeValues = (e) => {
  this.setState({values: e})
}


onSubmit = (e) => {
  e.preventDefault();

    uploadBackground(this, "back/sb")

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
      chuncks: '',
      background: this.state.file.name
  };

  if (this.props.match.params.id == undefined) {
    axios.post(apiURL() + "questions/add", question)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.log(error);
      });
  } else {
    axios.post(apiURL() + "questions/update/" + this.props.match.params.id, question)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.log(error);
      });
  }

  this.setState({ show: true });
};

onChange = (e) => {
  e.preventDefault();
  this.setState({ [e.target.name]: e.target.value });
};

updateList = (key, newlist) => {
  let choicesList = [...this.state.choices];
  let choice = { ...choicesList[key] };
  choice.optionlist = newlist;
  choicesList[key] = choice;

  this.setState({ choices: choicesList });
};

hideModal = () => {
  this.setState({ show: false });
};

render() {
  this.state.edit = this.props.match.params.id;
    return (
      <BaseQuestion name="Speaking B" color="card badge-pink">
        <form onSubmit={this.onSubmit}>
          <Question ptmodel={this.state.ptmodel} name={this.state.name} order={this.state.order} level={this.state.level} timer={this.state.timer} modelname={this.state.modelname} grammar={this.state.grammar} onChange={this.onChange}/>
            <div className="row">
                <div className="col-sm">
                    <div className="form-group"> 
                        <label>Sentence: </label>
                        <input type="text" name="sentence" required className="form-control" value={this.state.sentence} onChange={this.onChange} />
                    </div>
                </div>
            </div>   
            <div className="row">
              <div className="col-sm">
                <div className="form-group">
                  <label>Audio transcription: </label>
                  <input type="text" name="sentence_type" required className="form-control" value={this.state.sentence_type} onChange={this.onChange} />
                </div>
              </div>
            </div>
          <ImgBackground  src= "../../img/upfilepink.png " classname="btn btn-outline-pink " file={this.state.file} addFiles={this.addFiles} deleteFile={this.deleteFile}  values={this.state.values} onChangeValues={this.onChangeValues}/> 
          <Button class="badge-pink" redirect="../../admin/question" />
          <Modal show={this.state.show} hideModal={this.hideModal} text="Item added successfully!" redirect="../../admin/question"></Modal>
        </form>
      </BaseQuestion>
    );
  }
}
