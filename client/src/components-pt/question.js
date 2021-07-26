import React, { Component } from "react"
import PTGrammarA from "./pt-grammar-a";
import PTListeningA from "./pt-listening-a";
import PTListeningB from "./pt-listening-b";
import PTReadingA from "./pt-reading-a"
import PTReadingB from "./pt-reading-b"
import PTWritingA from "./pt-writing-a"
import PTWritingB from "./pt-writing-b"
import PTSpeakingA from "./pt-speaking-a"
import PTSpeakingB from "./pt-speaking-b"
import Structure from "./site-structure"
import { questionLayout } from "../scripts/question"

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: {
                model: "",
                icon:""
            } 
        } 
    }

    componentDidMount() {         
        var configQuestion = questionLayout(this.props.match.params.model)  
        this.setState({layout: configQuestion})

        document.body.style.backgroundImage = configQuestion.backgroundImage
        document.body.style.backgroundColor = configQuestion.background
    }

    render() { 
        return ( 
              <Structure >
                    <div className="text-center m-t-20"> 
                    <div className="text1">teste</div>   
                    <div className={this.state.layout.color}> {this.state.layout.name} </div>                 
                    <div className={this.state.layout.cordal}><div className={this.state.layout.bolal}></div></div>
                    <div className={this.state.layout.cordar}><div className={this.state.layout.bolar}></div></div>
                    <div className="row"> 
                        <div className="card col-sm-12 sha m-t-20">
                            <div className="card-body">
                                <img className="w-70" alt="" src={this.state.layout.icon}/>
                                    <div className="st3">{this.state.layout.subtitle}</div>
                                <div>
                                    {(this.state.layout.model === "listening-a") &&
                                        <PTListeningA id={this.props.match.params.question} position={this.props.match.params.position}/>}   
                        
                                    {(this.state.layout.model === "listening-b") &&
                                        <PTListeningB id={this.props.match.params.question} position={this.props.match.params.position}/>}   

                                    {(this.state.layout.model === "grammar-a") &&
                                        <PTGrammarA id={this.props.match.params.question} position={this.props.match.params.position}/>}       
                                        
                                    {(this.state.layout.model === "reading-a") &&
                                        <PTReadingA  id={this.props.match.params.question} position={this.props.match.params.position}/>}   
                                    
                                    {(this.state.layout.model === "reading-b") &&
                                        <PTReadingB id={this.props.match.params.question} position={this.props.match.params.position}/>}   

                                    {(this.state.layout.model === "writing-a") &&
                                        <PTWritingA id={this.props.match.params.question}position={this.props.match.params.position}/>} 

                                    {(this.state.layout.model === "writing-b") &&
                                        <PTWritingB id={this.props.match.params.question} position={this.props.match.params.position}/>} 

                                    {(this.state.layout.model === "speaking-a") &&
                                        <PTSpeakingA id={this.props.match.params.question} position={this.props.match.params.position}/>}  

                                    {(this.state.layout.model === "speaking-b") &&
                                        <PTSpeakingB id={this.props.match.params.question} position={this.props.match.params.position}/>}                                     
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Structure>
        );
    }
}
