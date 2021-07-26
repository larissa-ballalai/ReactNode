import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menuitem from "./menu-item";
import { clearSession } from "../scripts/isLoggedIn"
import { menuAccessControl } from "../scripts/menu"

export default class Main extends Component {
  
constructor(props) {
    super(props);        
    this.state = {}
}
    
componentDidMount() {
    this.setState({ profile:  menuAccessControl() })   
    document.body.className = "adback"
}

render() {
    return (
      <div>                
          <label className="tog font-45" htmlFor="toggle"> &#8801; </label>
          <input type="checkbox" id="toggle" />
          <div className="left side-menu">
              <div className="topbar-left">
                  <img className="logosmall" src="../../img/logo_conexia.png" alt=""/>
              </div>
              <div className="" id="remove-scroll">                
                  <ul className="metismenu">
                    <div className="menu-title">Main</div>
                    
                    {/* home */}
                    <div className="menu-b">
                    <img alt="" className="" src="../../img/home.png" /> &nbsp;
                        Home
                    </div>

                    {/* dashboard */}
                    <div className="menu-b">
                        <img alt="" className="" src="../../img/dash.png" /> &nbsp;
                        <Link to="../../admin/dash">Dashboard</Link>
                    </div>

                    <Menuitem image="resgister.png" className="badge badge-azul" divId="register" name="Registers"> 
                    <div className=" m-t-15 d-block">
                        {this.state.profile === "ADMIN" &&         
                            <Link  className="adminsub" to="../../admin/distributor-list">Distributor</Link>
                        }

                        { (this.state.profile === "ADMIN" || this.state.profile === "DISTRIBUTOR_ADMIN") &&      
                            <Link className="adminsub" to="../../admin/school-list">School</Link>
                        }

                            <Link className="adminsub" to="../../admin/classroom-list">Classroom</Link>
                        
                        { (this.state.profile === "ADMIN" || this.state.profile === "DISTRIBUTOR_ADMIN") && 
                                <Link className="adminsub" to="../../admin/user-list">User</Link>
                        } 

                        {this.state.profile === "ADMIN" &&         
                            <Link  className="adminsub" to="../../admin/importusers">Import</Link>
                        }
                    </div>
                  </Menuitem>
                      
                    {this.state.profile === "ADMIN" && 
                        <>
                            <div className="menu-title">Placement Test</div>
                            <div className="menu-b">
                                <img alt=""  src="../../img/teste.png" /> &nbsp;
                                <Link to="../../admin/question">Summary</Link> 
                            </div>
                            <div className="menu-title">Add Questions</div>
                            
                            <Menuitem image="hearing.png" link="../../admin/question" className="badge badge-azul" name="Listening" divId="m_list">                                 
                                <div className="d-block m-t-10 ">
                                    <Link className="adminsub" to="../../admin/listening-a">Listening A</Link>
                                    <Link  className="adminsub" to="../../admin/listening-b">Listening B</Link>
                                </div>                                                                        
                            </Menuitem>
                           
                            <Menuitem image="book.png" link="../../admin/question" className="badge badge-orange" name="Grammar" divId="m_gram">
                                <div className="d-block m-t-10 ">
                                    <Link className="adminsub" to="../../admin/grammar-a">Grammar A</Link>
                                    <Link  className="adminsub"  to="../../admin/grammar-b">Grammar B</Link>
                                </div>
                            </Menuitem>
                                                                                                     
                            <Menuitem image="reading.png" link="../../admin/question" className="badge badge-azul" name="Reading" divId="m_read">
                                <div className="d-block m-t-10 ">
                                    <Link  className="adminsub" to="../../admin/reading-a">Reading A</Link> 
                                    <Link  className="adminsub" to="../../admin/reading-b">Reading B</Link>
                                </div>
                            </Menuitem>
                                                                                                      
                            <Menuitem image="mic.png" link="../../admin/question" className="badge badge-pink" name="Speaking" divId="m_speak">
                                <div className="d-block m-t-10  ">
                                    <Link  className="adminsub" to="../../admin/speaking-a">Speaking A</Link>
                                    <Link  className="adminsub" to="../../admin/speaking-b">Speaking B</Link>
                                 </div>
                            </Menuitem>
                           
                            <Menuitem image="writing.png" link="../../admin/question"  className="badge badge-azul" name="Writing" divId="m_writing">
                            <div className="d-block m-t-10 ">
                                    <Link  className="adminsub" to="../../admin/writing-a">Writing A</Link>
                                    <Link  className="adminsub" to="../../admin/writing-b">Writing B</Link>
                                    </div>
                            </Menuitem>                                     
                        </>                                
                    }                                                            
                    <br />
                    <a onClick={() => clearSession("userAdmin")} className="menu-title logout"> Log out </a>
                  </ul>                
                  <div className="clearfix"></div>
              </div>          
          </div>        
      </div>
    );
  }
}
