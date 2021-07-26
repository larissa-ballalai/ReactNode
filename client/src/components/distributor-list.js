import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { distributorAction } from "../scripts/distributor"
import load from './load';
import BaseQuestion from './base-question';

export default class DistributorList extends Component {

constructor(props) {
    super(props);
    
    this.state = {
        listobj: [],     
    }     
}

async componentDidMount() {
    load()
    const distributors = await distributorAction("GET")
    this.setState({ listobj: distributors})
    load()
}

delete = async(id) => {
    const deleteDistributor = await distributorAction("DELETE", id)
    console.log(deleteDistributor)
    this.setState({
        listobj: this.state.listobj.filter(el => el._id !== id)
    })
}

render() {
  return (
    <BaseQuestion name="Distributor" color="card badge-conexia">
        <div className="row">
            <div className="col m-b-20">
                <div className="float-right m-r-15">
                    <Link className="btn btn-secondary waves-effect waves-light" to="../admin/distributor">New distributor</Link>                                                                                                                                                                                              
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
                                <Link className="btn btn-primary btn-sm" to={"/admin/edit-distributor/" + obj._id}>Edit</Link> &nbsp;
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