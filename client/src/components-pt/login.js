import React, { Component } from "react"
import "../css/estilo.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Structure from "./site-structure"
import { login } from "../scripts/isLoggedIn"
import { loginToken } from "../scripts/auth"

export default class PTLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          login: "",
          pwd: "",
          message: ""
        }
    }

  async componentDidMount() {    
      const jwtToken = new URLSearchParams(window.location.search).get('accessToken')
      if(jwtToken){
          var message = await loginToken(jwtToken)
          this.setState({ message: message })
      }
      
      document.body.style.background = "linear-gradient(178.87deg,#F5F9FD 24.14%,#D0DFF1 71.12%,#BED5F0 98.18%)";
  }

  onChangeHandler = (e) => {
      e.preventDefault();
      this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = async(e) => {
      e.preventDefault();
      var message = await login(this.state.login, this.state.pwd)
      this.setState({message: message})
  }

  render() {
    return (
      <div className="base">
          <div className="row">
            <div className="col-10 m-auto center"><div className="placementlogin">
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-xl-7 img-log m-auto align-self-end">
                <img alt="" className="img-fluid" src="../img/imgL.svg" />
              </div>
              <div className="col-xl-4 m-auto">
                <div className="card m-t-15 loginblock">
                  <div className="card-body">
                    <div className="text-center m-t-30">
                      <h3>
                        <img src="../img/livrosL.svg" alt="logo" />
                      </h3>
                    </div>
                    <div className="login "> 
                          <div className="hb-l">Bem vindo ao Placement Test!</div>
                        <div className="form-group">
                          <input id="user" type="text" name="login" placeholder=" nome@email.com" required className="form-control" value={this.state.login} onChange={this.onChangeHandler}/>
                        </div>
                        <div className="form-group">
                          <input id="psw" type="password" name="pwd" placeholder="*******" required className="form-control" value={this.state.pwd} onChange={this.onChangeHandler}/>
                        </div>
                        <div className={this.state.message.length > 0 ? "form-group alertlogin alert-danger" : ""} role="alert">
                          <span>{this.state.message}</span>
                        </div>
                        <div className="text-center m-t-40">
                          <input type="submit" value="Log In" className="btn-p grad-mains"/>                        
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div></div>
          </div>
      </div>
      
    );
  }
}