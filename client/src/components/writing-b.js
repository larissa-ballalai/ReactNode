import React, { Component } from "react";
import axios from "axios";
import Main from "./main";
import Question from "./question";
import Modal from "./modal";
import Button from "./button";
import BaseQuestion from "./base-question";
import Multipleanswer from "./multipleanswer";
import ImgBackground from './img-background'
import { uploadBackground } from "../scripts/upload";
import { apiURL ,adminConfig} from "../api";

export default class WritingA extends Component {
constructor(props) {
  super(props);

  this.state = {
    order: 0,
    name: "",
    sentence_type: "",
    sentence: "",
    values: "",
    choices: [{ word: "", optionlist: [] }],
    file: [], 
    show: false,
    timer: 45,
    level: "A1",
    ptmodel: "Academic",
    modelname: "Writing-B",
    grammar: "To be present tense",
  };
}

addFiles = (e) => {
  let file = this.state.file
  file= { blob: URL.createObjectURL(e.target.files[0]), 
          name: e.target.files[0].name,
          file: e.target.files[0]}

  this.setState({ file: file})
}

deleteFile = (e) => {
  this.setState({ file: ""})
}

componentDidMount() {
  if (this.state.edit !== undefined) {
    axios
      .get(apiURL()+ "questions/" + this.props.match.params.id)
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
            blob: adminConfig().root +"back/wb/" + response.data.background, 
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

    uploadBackground(this,"back/wb")

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
    chuncks: "",
    background: this.state.file.name
  };

  if (this.props.match.params.id == undefined) {
    axios.post(apiURL() + "questions/add", question)
      .then((res) => console.log(res.data))
      .catch((error) => { console.log(error);});
  } else {
    axios.post(apiURL() + "questions/update/" + this.props.match.params.id, question )
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

addItem = (item, key) => {
  let list = this.state.choices[key].optionlist.filter((i) => i !== item);
  let newlist = list.concat(item);
  this.updateList(key, newlist);
}

deleteItem = (item, key) => {
  let newlist = this.state.choices[key].optionlist.filter((i) => i !== item);
  this.updateList(key, newlist);
}

updateQuestion = (e) => {
  e.preventDefault();
  let choicesList = this.state.choices;
  choicesList[0].word = e.target.value;
  this.setState({ choices: choicesList });
}

hideModal = () => {
  this.setState({ show: false });
};

render() {
  this.state.edit = this.props.match.params.id;
    return (
      <BaseQuestion name="Writing B" color="card badge-azul">
        <form onSubmit={this.onSubmit}>
          <Question ptmodel={this.state.ptmodel} name={this.state.name} order={this.state.order} level={this.state.level} timer={this.state.timer} modelname={this.state.modelname} grammar={this.state.grammar} onChange={this.onChange}/>          
            <div className="row">
              <div className="col-sm">
                <div className="form-group">
                  <label>Title: </label>
                    <input name="sentence_type" className="form-control" required value={this.state.sentence_type} onChange={this.onChange}></input>                 
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                <div className="form-group">
                  <label>Sentence: </label>
                  <br/>
                  <textarea name="sentence" className="form-control" required value={this.state.sentence} onChange={this.onChange}></textarea>                 
                </div>
              </div>
            </div>        
            <Multipleanswer sentence={this.state.sentence} values={this.state.values} choices={this.state.choices} addItem={this.addItem} deleteItem={this.deleteItem} onChange={this.onChange} updateQuestion={this.updateQuestion}
              bagdeclass="badge badge-azul" bagdeclass2="badge badgelg-azul" asw="blue" img="../../img/add3.png" />
            <ImgBackground src="../../img/upfile2.png " classname="btn input_chunks btn-outline" file={this.state.file} addFiles={this.addFiles} deleteFile={this.deleteFile}  values={this.state.values} onChangeValues={this.onChangeValues}/>
            <Button class="badge-azul" redirect="../../admin/question" />
            <Modal show={this.state.show} hideModal={this.hideModal} text="Item added successfully!" redirect="../../admin/question"></Modal>
        </form>
    </BaseQuestion>
    );
  }
}

