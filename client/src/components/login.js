import React, { Component } from "react";
import "../css/estilo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { login } from "../scripts/isLoggedIn";

export default class Login extends Component {
    constructor(props) {
        super(props);    
        this.state = {
            login: '',
            pssw: ''
        };
    }
    
componentDidMount() {
    document.body.className = "adback"              
}

onChange = (e) => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
}
    
render() {
    return (
        <div>
            <form>
                <div className="bloco">
                  <div className="logo">
                      <h3>
                          <img src="../../img/logo_conexia.png" alt="logo" />
                      </h3>
                  </div>
                  <div className="login ">
                      <div className="parte1 m-b-30 text-center">
                          <h6>Sign in</h6>
                      </div>
                      <div className="form-group">
                          <label className="label_str">Username</label>
                          <input type="text" name="login" placeholder="Enter username" required className="form-control" value={this.state.login} onChange={this.onChange} />
                      </div>
                      <div className="form-group">
                          <label className="label_str">Password</label>
                          <input type="password" name="pssw" placeholder="Enter password" required className="form-control" value={this.state.pwd} onChange={this.onChange} />
                      </div>
                      <div className="form-group m-t-10 mb-0 row">
                          <div className="col-6">
                              <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="customControlInline"/>
                                  <label className="custom-control-label py-1 w-100px" htmlFor="customControlInline"> Remember me </label>
                              </div>                   
                          </div>
                          <div className="col-6 text-right">
                              <label><u><small>Forgot your password?</small></u></label>
                          </div>
                      </div>
                      <div className="text-center m-t-40">                         
                            <input type="button" value="Log In" className="btn-big grad-mains" onClick={() => login(this.state.login, this.state.pssw)} /> 
                      </div>                      
                  </div>
                </div>          
            </form>           
        </div>
    );
  }
}
