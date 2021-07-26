import React, { Component } from 'react';
import Modal from "./modal";
import Button from "./button";
import { distributorAction }  from '../scripts/distributor'
import { userAction } from '../scripts/user'
import { schoolAction } from '../scripts/school'
import BaseQuestion from './base-question';

export default class User extends Component {

constructor(props) {
    super(props);
    
    this.state = {
        name: '',
        contact: '',
        email: '',
        phone: '',
        address: '',
        country: '',
        role: '', 
        distributors:[],
        schools: [],
        password: '',
        block: false,
        show: false
    }     
}

async componentDidMount() {
    const school = await schoolAction("GETCOMBO")
    this.setState ({schools:school})

    const distributor = await distributorAction("GETCOMBO")
    this.setState({ distributors: distributor})

    if(this.state.edit !== undefined) {
        const user = await userAction("GETBYID", this.props.match.params.id)                     
        this.setState({
            active:user.active,
            createdAt:user.createdAt,
            email:user.email,
            id: user.id,
            importID: user.importID,
            level: user.level,
            login: user.login,
            name: user.name,
            password: user.password,
            profile: user.profile,
            school: user.school.name,
            updatedAt:user.updatedAt,
            distributor: user.distributor.name,
            block: user.block           
        })
    }
}

onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]:e.target.value});
}

onCheck = () => {
    this.setState({ block :  !this.state.block})
}

onSubmit = async(e) => {
    e.preventDefault();
    const objectUser = {
        name: this.state.name,
        profile: this.state.profile, 
        school: this.state.schools.filter(f=> f.name === this.state.school)[0]._id, 
        email: this.state.email,
        phone: this.state.phone,
        distributor: this.state.distributors.filter(f=> f.name === this.state.distributor)[0]._id, 
        password: this.state.password,
        login: this.state.login,
        importID: this.state.import_id,
        block: this.state.block
    };

    if(this.props.match.params.id === undefined) {
        const addUsr = await userAction("ADD", objectUser)
    } 
    else {
        const updateUsr = await userAction("UPDATE",  this.props.match.params.id, objectUser)
    }

    this.setState({ show: true });
}

hideModal = () => {
    this.setState({ show: false });
}

render() {
  this.state.edit = this.props.match.params.id;
    return (
        <BaseQuestion name="User" color="card badge-conexia">
            <form onSubmit={this.onSubmit}>
                <div className="row">                   
                    <div className="col-sm-8">
                        <div className="form-group"> 
                            <label>Name: </label> 
                            <input type="text" name="name" required className="form-control" value={this.state.name} onChange={this.onChange} />
                        </div>
                    </div> 
                    <div className="col-sm-4">
                        <div className="form-group"> 
                            <label>Profile </label>
                            <select ref="user" name="profile"  required className="form-control" value={this.state.profile} onChange={this.onChange} >
                                <option value="">All</option>
                                <option value="COACH">COACH</option>
                                <option value="STUDENT">STUDENT</option>
                                <option value="SCHOOL_ADMIN">SCHOOL ADM</option>
                                <option value="DISTRIBUTOR_ADMIN">DISTRIBUTOR ADM</option>
                            </select>
                        </div>
                    </div>                                                                                   
                </div>
                <div className="row"> 
                    <div className="col-sm">
                        <div className="form-group"> 
                            <label>Distributor: </label>
                            <select ref="user" name="distributor"  required className="form-control" value={this.state.distributor} onChange={this.onChange} >
                                <option value="">All</option>
                                {this.state.distributors.map((distributor, key) => {                                                        
                                    return (<option key={key} value={distributor.name}>{distributor.name} </option>)
                                })}
                            </select>
                        </div>
                    </div>                                                                                              
                    <div className="col-sm">
                        <div className="form-group"> 
                            <label>School: </label>
                                <select ref="user" name="school" required className="form-control" value={this.state.school} onChange={this.onChange} >
                                    <option value="">All</option>
                                        {this.state.schools.map((school, key) => {
                                        return (<option key={key} value={school.name}> {school.name} </option>);
                                        })}
                                </select> 
                        </div> 
                    </div> 
                    <div className="col-sm">                                          
                        <div className="form-group"> 
                            <label>Phone number: </label>
                            <input type="text" name="phone" placeholder="(22) 1234-0000" className="form-control" value={this.state.phone} onChange={this.onChange} />
                        </div>                                           
                    </div>
                    </div>     
                    <div className="row"> 
                        <div className="col-sm">
                            <div className="form-group"> 
                                <label>Login </label>
                                <input type="text" name="login" required  className="form-control" value={this.state.login} onChange={this.onChange} />
                            </div>
                        </div>                  
                        <div className="col-sm">
                            <div className="form-group"> 
                                <label>Email: </label>
                                <input type="text" name="email" required placeholder="email@email.com"  className="form-control" value={this.state.email} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="form-group"> 
                                <label>Password: </label>
                                <input type="password"  required name="password" className="form-control" value={this.state.password} onChange={this.onChange} />
                            </div>
                        </div> 
                    </div>  
                    <div className="row"> 
                        <div className="col-md">
                            <div class="form-check">                                                    
                                <input class="form-check-input" name="block" type="checkbox" checked={this.state.block === true ? "checked" : ""} id="flexCheckDefault" onClick={this.onCheck}/>
                                <label class="form-check-label" for="flexCheckDefault">Block PT </label>
                            </div>
                        </div>                                                                       
                    </div>           
                <Button class="badge-azul" redirect="../../admin/user-list" />
            </form>
            <Modal show={this.state.show} hideModal={this.hideModal} text ="Item added successfully!" redirect="../../admin/user-list"></Modal>                                  
        </BaseQuestion>
  )}
}