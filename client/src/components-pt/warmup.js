import React, { Component } from "react";
import Structure from "./site-structure";
import PTListeningA from "./pt-listening-a";
import PTListeningB from "./pt-listening-b";
import PTReadingA from "./pt-reading-a"
import PTReadingB from "./pt-reading-b"
import PTWritingA from "./pt-writing-a"
import PTWritingB from "./pt-writing-b"
import PTSpeakingA from "./pt-speaking-a"
import PTSpeakingB from "./pt-speaking-b"
import { warmupLayout } from "../scripts/warmup"
import PTGrammarA from "./pt-grammar-a";

export default class Warmup extends Component {
constructor(props) {
    super(props); 
    this.state = {
        order: "",
        layout: {
            model: "",
            icon: "",
            subtitle: "",
            color: "",
            cordar: "",
            cordal: "",
            bolal: "",
            bolar: "",
        }
    }
} 

componentDidMount() {
    var configLayout = warmupLayout(this.props.match.params.order)        
    this.setState({layout: configLayout})       
    this.setState({order: this.props.match.params.order})
}
render() { 
    return ( 
            <Structure >
                <div className="text-center m-t-20 aq">
                    <div className="text1">Preparação</div>
                    <div className={this.state.layout.color}> {this.state.layout.model} </div>
                    <div className={this.state.layout.cordal}><div className={this.state.layout.bolal}></div></div>
                    <div className={this.state.layout.cordar}><div className={this.state.layout.bolar}></div></div>
                    <div className="row"> 
                        <div className="card col-sm-12 sha m-t-20">
                            <div className="card-body">
                                <img className="w-70" alt="" src={this.state.layout.icon}/>
                                <div className="st3">{this.state.layout.subtitle}</div>
                                <div>
                                    {(this.state.order === "1") &&  <PTListeningA id="5fb152013118260017507bc0" />}
                                    {(this.state.order === "2") &&  <PTListeningB id="5fbbd1d127cc0d00170cf7e9" />}
                                    {(this.state.order === "3") &&  <PTReadingA id="5fb151ae3118260017507bbe"  />}
                                    {(this.state.order ==="4")  &&  <PTReadingB id="605201792cf5810017faa987" />}
                                    {(this.state.order ==="5")  &&  <PTGrammarA id="5fb14f963118260017507bbb" />}
                                    {(this.state.order ==="6")  &&  <PTWritingA id="5fb99ec6fce58b00176f0f5f" />}
                                    {(this.state.order ==="7")  &&  <PTWritingB id="5fb99ed8fce58b00176f0f60"/>}
                                    {(this.state.order === "8") &&  <PTSpeakingA id="5fb9b06efce58b00176f0f65"/>}
                                    {(this.state.order === "9") && <PTSpeakingB id="5fb9b07efce58b00176f0f66"/>}
                                </div>                               
                            </div>
                        </div>
                    </div>
                </div>
            </Structure>
        );
    }
}
