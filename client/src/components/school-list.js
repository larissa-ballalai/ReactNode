import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Main from "./main";
import Header from "./header";
import { schoolAction } from '../scripts/school'
import { distributorAction } from '../scripts/distributor'
import BaseQuestion from './base-question';

export default class SchoolList extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            listobj: [],
            distributors:[],
            schools: [],
            distributor: "All",
            school: "All"     
        }    
    }

async componentDidMount() {
    const distributor = await distributorAction("GETCOMBO")
    this.setState({distributors: distributor})

    const schools = await schoolAction("GET")
    this.setState({ listobj: schools, schools: schools, dataset: schools})
}

delete = async(id) => {
    const deleteSchool = await schoolAction("DELETE", id)
    this.setState({
        listobj: this.state.listobj.filter(el => el._id !== id),
    })
}

onChange = (e) => {    
    this.setState({ [e.target.name]:e.target.value});
}

filterGrid = () => {
    var filtered = this.state.dataset.filter(l => (this.state.distributor !== "All") ? l.distributor.name === this.state.distributor : 1>0)
                                        .filter(l => (this.state.school !== "All" ? l.name === this.state.school : 1>0))

    this.setState({ listobj: filtered});
}

render() {
  return (
        <BaseQuestion name="School" color="card badge-conexia">
            <div className="row d-block ">
                <div className="col ">
                    <div className="float-right m-t-30 m-r-15">
                        <Link className="btn btn-secondary waves-effect waves-light" to="../admin/school">New school</Link>                                                                                                                                                                                              
                    </div>     
                </div>                                      
            </div>  
            <div className="row admin">
                <div className="col-sm-5">
                    <div className="form-group">
                        <label>Distributor </label>
                            <select ref="user" name="distributor" required className="form-control" value={this.state.distributor} onChange={this.onChange} >
                                <option value="All">All</option>
                                {this.state.distributors.map((item, key) => {
                                    return ( <option key={key} value={item.name}> {item.name} </option> );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="form-group"> 
                            <label>School </label>
                            <select ref="user" name="school" required className="form-control" value={this.state.school} onChange={this.onChange} >
                                <option value="All">All</option>
                                {this.state.schools.map((school, key) => {                                                        
                                    return (<option key={key} value={school.name}>{school.name} </option>)
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="col-sm">
                        <div className="form-group m-t-30 ">
                            <a className="btn btn-primary waves-effect waves-light" href="#" onClick={() => {this.filterGrid(); }}> Search </a>
                        </div>
                    </div>
                </div>  
            <div className="table-responsive b-0">
                <div className="col ">
                    <table className="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Information</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody> 
                        {this.state.listobj.map((obj, key) => {
                            return (
                            <tr key={key}>
                                <td>{obj.name}</td>
                                <td>{obj.contact}</td>
                                <td>{obj.email} </td>
                                <td>{obj.phone}</td>
                                <td>
                                    <div className="d-flex justify-content-end">
                                    <Link className="btn btn-primary btn-sm" to={"/admin/edit-school/" + obj._id}>Edit</Link> &nbsp;
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