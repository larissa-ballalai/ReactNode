import React, { Component } from "react";
import { adminConfig, apiURL } from "../api";
import axios from "axios";
import PTButton from "./pt-button";
import PTQuestion from "./pt-question";
import MicRecorder from "mic-recorder-to-mp3";
import { saveTest } from "../scripts/test";
import Countdown from "./countdown"
import Recording from "./recording";
import QuestionBack from "./questionback";


const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default class PTSpeakingB extends Component {
constructor(props) {
    super(props);

    this.state = {
        values: "",
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
                choices: [{word: response.data.sentence}],
                grammar: response.data.grammar,
                audio: audio,
                values: response.data.sentence,
                background: response.data.background
            });
    })
    .catch(function (error) { console.log(error); });    
}

start = () => {
if (this.state.isBlocked) {      
    alert("Permission to use microphone denied.")
} else {
    Mp3Recorder.start()
                .then(() => {
                    this.setState({ isRecording: true })
                    document.getElementById("fadee").className="fade opacity modal-backdrop show"
                    this.controlvisibility("none", "block")
                })
                .catch((e) => console.error(e))
}
}

stop = () => {
    Mp3Recorder.stop()
            .getMp3()
            .then(([buffer, blob]) => {          
                    this.controlvisibility("block", "none")
                    document.getElementById("fadee").className=''
                    this.setState({ blob: blob })

                    const blobURL = URL.createObjectURL(blob)
                    this.setState({ blobURL, isRecording: false })
            })
            .catch((e) => console.log(e));
}

controlvisibility = (state1, state2) => {
    this.setState({ play: state1})
    this.setState({ stop: state2 }); 
    this.setState({ player: state1 })  
    document.getElementById("bt_next").style.display = state1
}

onSubmit = (e) => {    
    e.preventDefault(); 
    saveTest(this, "Speaking");        
}

  render() {
    return (
        <form className="text-center" onSubmit={this.onSubmit}> 
            <Countdown timer={this.state.timer} color="toptimer white t-green" colortext="bottimer txt-green"  next={() => saveTest(this, "Speaking")}/><br/>     
            <PTQuestion sentence={this.state.sentence} />          
            <div className="row "> 
                <div  className="col-md-11 m-auto">
                    <div className=" d-flex mt-4 mb-4">
                        <div onClick={this.start} className={ " mic-b " + this.state.play }> 
                            <svg width="5em" height="7em" viewBox="0 0 16 16" className="bi bi-mic-fill mic" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
                                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                            </svg> 
                        </div>
                        <div onClick={this.stop} className={ " " + this.state.stop }>
                        <div  id="fadee" >
                        <Recording type={"bars"} color={"red"} />
                            <div className="m-t-xl stop text-center  txt-up bold text-red">GRAVANDO</div>
                            </div>
                        </div>                 
                    </div> 
                </div>
            </div>
            <div className={"row justify-content-center " + this.state.player}>
                <audio src={this.state.blobURL} controls="controls" />
            </div>            
            <PTButton class="btn-big gradient-green mt3" redirect="../question" />
        </form>
    );
  }
}
