import React, { Component } from "react";
import axios from "axios";
import { adminConfig, apiURL } from "../api";
import PTAudio from "./pt-audio";
import PTMultiplechoicerecord from "./pt-multiplechoice-record";
import PTButton from "./pt-button";
import MicRecorder from "mic-recorder-to-mp3";
import { saveTest } from "../scripts/test";
import Countdown from "./countdown"
import QuestionBack from "./questionback";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default class PTSpeakingA extends Component {
constructor(props) {
    super(props);
    this.state = {
        choices: [],
        values: "",
        audio: "",
        stop: "none",
        play: "block",
        player: "none",
        blob: null,
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

start = (key) => { 
    if (this.state.isBlocked) {
        alert("Permission to use microphone denied.")
    } 
    else {
        Mp3Recorder.start()
                .then(() => {
                    this.setState({ isRecording: true })
                    this.controlvisibility("block", "fade modal-backdrop opacity show")
                    this.setState({values: this.state.choices[0].optionlist[key]})  
                    this.border(key)                     
                })
                .catch((e) => console.error(e))
    }
}

stop = () => {
    Mp3Recorder.stop()
                .getMp3()
                .then(([buffer, blob]) => {
                    const blobURL = URL.createObjectURL(blob)

                    this.setState({ blob: blob })
                    this.setState({ player: "block" })
                    this.setState({ blobURL, isRecording: false })                    
                    
                    this.controlvisibility("none", "","options opg d-flex justify-content-center m-t-5")
                })
                .catch((e) => console.log(e));
}

controlvisibility = (state2, className, key) => {     
    document.getElementById("stop").style.display = state2
    document.getElementById("fadee").className = className
}

onSubmit = async(e) => {
    e.preventDefault(); 
    saveTest(this, "Speaking");          
}

border = (key) => {
    for(var i = 0; i < 4; i++) 
        document.getElementById("play_" + i).className = "options d-flex justify-content-center m-t-5"

    document.getElementById("play_" + key).className = "options opg d-flex justify-content-center m-t-5"            
}

render() {
    return (
        <form onSubmit={this.onSubmit}>
            <Countdown timer={this.state.timer} color="toptimer white t-green" colortext="bottimer txt-green" next={() => saveTest(this, "Speaking")}/>
            <div className="row mt-2">
                <div className="col-md-9 m-auto">
                    <PTMultiplechoicerecord values={this.state.values} choices={this.state.choices} correctAnswer={this.correctAnswer}
                    start={this.start} stop={this.stop} />
                </div>
            </div>
            <div className={"row justify-content-center " + this.state.player}>
                <audio src={this.state.blobURL} controls="controls" />
            </div>
            <PTAudio img="../../../img/replaygreen.png" audio={this.state.audio} addAudio={this.addAudio} />
            <PTButton class="btn-big gradient-green" redirect="../question" />
        </form>
    );
  }
}
