import React, { Component } from "react";
import Structure from "./site-structure";
import { Link } from "react-router-dom";
import {createTest} from "../scripts/test"
import Header from "./header";

export default class PTStart extends Component {
constructor(props) {
    super(props);
    this.state = {
    };
}

componentDidMount() {
    document.body.style.backgroundImage = "url('../img/fundoazul.png')";
    this.setState({ userid: this.props.match.params.user });
}

onSubmit = async(e) => {
    e.preventDefault();
    await createTest("Listening")   
}

render() {
    return (
        <Structure>
          <Header/>
            <div className="row m-t-16">
              <div className="col-sm-11 m-auto">
                <div className="text-center m-t-10">
                  <p className="text1">aquecimento</p>
                  <div>
                    <h1 className="tblue t2 m-t-20 m-b-10"> 
                      Aquecimento Finalizado!
                    </h1>
                  </div>
                  <label className="start">
                    Você finalizou a fase de aquecimento, está pronto para seguir com o teste?
                  </label>
                </div>
              </div>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className="row space-start mt3">
                <div className="col-xl-5 m-auto d-flex justify-content-center  but-start">
                    <Link to="../../warmup/1" className="btn-big outline-start mr-1">Aquecimento</Link>
                    <input type="submit" value="Iniciar teste" className="btn-big blue-start ml-1" />
                </div>
              </div>
            </form>
        </Structure>
    );
  }
}