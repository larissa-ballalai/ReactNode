import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { userAction } from '../scripts/user'
import { schoolAction } from '../scripts/school'
import { distributorAction } from "../scripts/distributor"
import { load } from './load';
import BaseQuestion from './base-question';

export default class UserList extends Component {
constructor(props) { 
    super(props);
    this.state = {
        listobj: [],
        schools:[],
        users:[],  
        distributors:[],
        distributor: "All",
        school: "All",
        user: "All",
        profile: "All"  
    }    
}

async componentDidMount() {
    load()

    const distributor = await distributorAction("GETCOMBO")
    this.setState({distributors: distributor})

    const school = await schoolAction("GETCOMBO")
    this.setState({ schools: school})

    const user = await userAction("GET")
    this.setState({ users: user, listobj: user, dataset: user })

    load()
}

onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
}

delete = async(id) => {
    const deleteUsr = await userAction("DELETE",id)
    this.setState({
        listobj: this.state.listobj.filter(el => el._id !== id)
    })
}

filterGrid = () => {
    var filtered = this.state.dataset.filter(l => (this.state.distributor !== "All") ? l.distributor.name === this.state.distributor : 1>0)
                                        .filter(l => (this.state.profile !== "All" ? l.profile === this.state.profile : 1>0))
                                        .filter(l => (this.state.school !== "All" ? l.school.name === this.state.school : 1>0))
                                        .filter(l => (this.state.user !== "All" ? l.name === this.state.user : 1>0))

    this.setState({ listobj: filtered});
}

render() {
    return ( 
        <BaseQuestion name="User" color="card badge-conexia">
            <div className="row">
                <div className="col-sm ">
                    <div className="form-group">
                        <label>Distributor </label>
                        <select ref="user" name="distributor" required className="form-control" value={this.state.distributor} onChange={this.onChange} >
                        <option value="All">All</option>
                            {this.state.distributors.map((item, key) => {
                                return (
                                <option key={key} value={item.name}>
                                    {item.name}
                                </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-sm ">
                    <div className="form-group">
                        <label>School </label>
                        <select ref="user" name="school" require className="form-control" value={this.state.school} onChange={this.onChange} >
                            <option value="All">All</option>
                            {this.state.schools.map((school, key) => {
                                return (
                                    <option key={key} value={school.name}> {school.name} </option>
                                    );
                                })}
                        </select>
                    </div>
                </div>
                <div className="col-sm ">
                    <div className="form-group">
                        <label>User </label>
                            <select ref="user" name="user" required className="form-control" value={this.state.user} onChange={this.onChange} >
                                <option value="All">All</option>
                                    {this.state.users.map((user, key) => {
                                    return (
                                        <option key={key} value={user.name}>
                                            {user.name}
                                        </option>
                                    );
                                })}
                            </select>
                    </div>
                </div>
                <div className="col-sm ">
                    <div className="form-group">
                        <label>Profile </label>
                        <select ref="user" name="profile"  required className="form-control" value={this.state.profile} onChange={this.onChange} >
                            <option value="All">All</option>
                            <option value="COACH">COACH</option>
                            <option value="STUDENT">STUDENT</option>
                            <option value="SCHOOL_ADMIN">SCHOOL ADM</option>
                            <option value="DISTRIBUTOR_ADMIN">DISTRIBUTOR ADM</option>
                        </select>
                    </div>
                </div>                                        
                <div className="col-sm">
                    <div className="form-group m-t-30 ">
                        <a className="btn btn-primary waves-effect waves-light" href="#" onClick={() => {this.filterGrid(); }}>
                                Search
                        </a>
                        </div>
                </div>
                <div className="col m-b-20">
                    <div className="float-right m-t-30 m-r-15">
                        <Link className="btn btn-secondary waves-effect waves-light" to="../admin/user">New User</Link>                                                                                                                                                                                              
                    </div>     
                </div>                                      
            </div>  
            <div className="table-responsive b-0">
                <div className="col ">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Login</th>
                                <th>Email</th>
                                <th>Profile</th>
                                <th>Distributor</th>
                                <th>School</th>
                                <th></th>
                            </tr>
                        </thead>
                    <tbody> 
                        {this.state.listobj.map((obj, key) => {
                            return (
                            <tr key={key}>
                                <td>{obj.name}</td>
                                <td>{obj.login}</td>
                                <td>{obj.email} </td>
                                <td>{obj.profile} </td>
                                <td>{obj.distributor.name}</td>
                                <td>{obj.school.name}</td>
                                <td>
                                    <div className="d-flex justify-content-end">
                                    <Link className="btn btn-primary btn-sm" to={"/admin/edit-user/" + obj._id}>Edit</Link> &nbsp;
                                        <a className="btn  btn-sm btnred" href="#" onClick={() => { this.delete(obj._id);}}>Delete</a>
                                    </div>
                                </td>
                            </tr>)
                        })}                                           
                    </tbody>  
                    </table>
                </div>
            </div>                                                                                                    
        </BaseQuestion>
    )}
}