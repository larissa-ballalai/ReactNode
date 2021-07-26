import React, { Component } from "react";
import Structure from "./site-structure";
import { nextModel, stopLayout } from "../scripts/stop"
import Header from "./header";

export default class Stop extends Component {
constructor(props) {
    super(props);
    this.state = {
        layout: {
            currentModel: "",
            nextModel: "",
            backgroundImage: ""
        }
    }
}

componentDidMount() {
    var layout = stopLayout(this.props.match.params.order)
    this.setState({layout: layout})    
    document.body.style.backgroundImage = layout.backgroundImage   
}

nextModel = (e) => {
    nextModel(this.props.match.params.order)
}

render() { 
    return (
        <Structure>
            <Header/>
                <div className="card m-t-50 ">
                    <div className={this.state.layout.border}>
                        <div className={this.state.layout.titulo}>Parabéns!</div>
                            <div className="m-t-20">
                                <div className="col-sm-6 d-flex m-auto justify-content-center">
                                    <div>
                                        <img alt="" src={this.state.layout.medal} />
                                    </div>
                                    <div className="text-left">
                                        <ul>
                                            <li className="font-24 f-r t-dark"> Etapa</li>
                                            <li className="tstop t-dark">{this.state.layout.currentModel}</li>
                                            <li className="font-35 f-r t-dark"> Concluída!</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        <div className="m-b-20">
                            <div className="col-sm-10 m-auto">
                                <div className="m-t-30 start"> A etapa {this.state.layout.nextModel} começará em breve </div>
                            </div>
                            <div className="col-md-8 m-auto">
                                <div className="linha3 m-auto">
                                    <div className={this.state.layout.linha}></div>
                                </div>
                                <button className={this.state.layout.btn} onClick={() => this.nextModel()}>next</button>
                            </div>
                        </div>
                    </div>
                </div>
        </Structure>
    );
  }
}