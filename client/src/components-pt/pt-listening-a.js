import React, { Component } from "react";
import axios from "axios";
import PTAudio from "./pt-audio";
import PTImages from "./pt-images";
import { adminConfig, apiURL} from "../api";
import { saveTest } from "../scripts/test";
import Countdown from "./countdown"

export default class PTListeningA extends Component {
constructor(props) {
    super(props);

    this.state = {       
        values: "",        
        audio: "",
        choices: []
    };
}

componentDidMount() {
axios.get(apiURL() + "questions/" + this.props.id)
        .then((response) => {
            let files = response.data.choices[0];
            let newfiles = [];

            for (var i = 0; i < files.optionlist.length; i++) {
                var img = adminConfig().img +  files.optionlist[i];
                newfiles.push({ blob: img, name: files.optionlist[i], file: null });
            }

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
                files: newfiles,
                audio: audio
            });
    })
    .catch(function (error) { console.log(error);});     
}



onChangeValues = (e) => {
    this.setState({ values: e });
    saveTest(this, "Listening",  e)
}

onSubmit = (e) => { 
    e.preventDefault();      
}

render() {
    return (    
        <div>
            <Countdown timer={this.state.timer} color="toptimer white t-blue" colortext="bottimer txt-blue" next={() => saveTest(this, "Listening")}/>
            <form className="m-t-20" onSubmit={this.onSubmit}>                    
                <PTImages class="b-blue" files={this.state.files} values={this.state.values} onChangeValues={this.onChangeValues} />
                <PTAudio img="../../../img/replay.png" audio={this.state.audio} />
            </form> 
        </div>
    );
  }
}
