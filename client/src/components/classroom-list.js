import React, { Component } from "react";
import { Link } from "react-router-dom";
import { classroomAction } from '../scripts/classroom'
import { schoolAction } from '../scripts/school'
import { distributorAction } from "../scripts/distributor"
import { getUserSession } from "../scripts/isLoggedIn"
import BaseQuestion from "./base-question";

export default class ClassroomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listobj: [],
            schools: [],            
            distributors:[],
            distributor: "All",
            school: "All",
            user: ""
        }
    }

async componentDidMount() {
    const distributor = await distributorAction("GETCOMBO")
    this.setState({distributors: distributor})

    const classroom = await classroomAction("GET")      
    this.setState({ listobj: classroom, dataset: classroom})

    const school = await schoolAction("GETCOMBO")
    this.setState({ schools: school, schoolDataset: school})      

    this.setState({user: getUserSession("userAdmin")})  
}

onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
}

onChangeDistributor = async(e) => {
    e.preventDefault();
    this.setState({ [e.target.name]:e.target.value});
    
    if(e.target.value === "All") 
        this.setState({schools: this.state.schoolDataset})
    else {
      const school = await schoolAction("GETBYDISTRIBUTOR", e.target.value) 
      this.setState({schools: school})
    }
}

delete = async(id) => {
    const deleteClass = await classroomAction("DELETE", id)
    this.setState({listobj: this.state.listobj.filter(el => el._id !== id)});
}

filterGrid = () => {
    var filtered = this.state.dataset.filter(l => this.state.distributor !== "All" ? l.school.distributor === this.state.distributor : 1>0)
                                      .filter(l => (this.state.school !== "All" ? l.school.name === this.state.school : 1>0))

    this.setState({ listobj: filtered});
}

render() {
    return (
      <BaseQuestion name="Classroom" color="card badge-conexia">
        <div>
          <div className="row d-block">
            <div className="col-sm">
              <div className="float-right m-t-30 m-r-15">                          
                {this.state.user.profile !== "COACH" ? <Link className="btn btn-secondary waves-effect waves-light" to="../admin/classroom"> New Classroom</Link> : "" }
              </div>
            </div>
          </div>
          <div className="row admin">
            <div className="col-sm ">
              <div className="form-group">
                <label>Distributor </label>
                  <select ref="user" name="distributor" required className="form-control" value={this.state.distributor} onChange={this.onChangeDistributor} >
                    <option value="All">All</option>
                      {this.state.distributors.map((item, key) => {
                        return ( <option key={key} value={item._id}> {item.name} </option> );
                      })}
                  </select>
              </div>
            </div>
            <div className="col-sm ">
              <div className="form-group">
                <label>School </label>
                  <select ref="user" name="school" required className="form-control" value={this.state.school} onChange={this.onChange} >
                    <option value="All">All</option>
                      {this.state.schools.map((school, key) => {
                        return ( <option key={key} value={school.name}> {school.name} </option> );
                      })}
                  </select>
              </div>
            </div>         
            <div className="col-sm">
              <div className="form-group m-t-30 ">
                <a className="btn btn-primary waves-effect waves-light" href="#" onClick={() => { this.filterGrid(); }}> Search </a>
              </div>
            </div>
          </div>
          <div className="table-responsive b-0">
                        <div className="col ">
                          <table className="table table-hover mb-0">
                            <thead>
                              <tr>
                                <th>Classroom</th>
                                <th>Year</th>
                                <th>School</th>  
                                <th></th> 
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.listobj.map((obj, key) => {
                                return (
                                  <tr key={key}>
                                    <td>{obj.name}</td>
                                    <td>{obj.year} </td>
                                    <td>{obj.school.name} </td>
                                    <td>
                                      <div className="d-flex justify-content-end">
                                        <Link className="btn btn-primary btn-sm" to={"/admin/edit-classroom/" + obj._id} > Edit </Link> &nbsp;
                                        {this.state.user.profile === "ADMIN" ? <a className="btn  btn-sm btnred" href="#" onClick={() => { this.delete(obj._id); }} > Delete </a> : "" }
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
        </div>
    </BaseQuestion>        
    );
  }
}
