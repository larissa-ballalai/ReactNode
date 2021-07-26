import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Main from "./main";
import Header from "./header";
import { apiURL } from '../api';
import { load } from './load';
import BaseQuestion from './base-question';



export default class QuestionList extends Component {

constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.state = {
        listobj: [],
        grid: [],
        ptmodels: [],
        levels: [],
        modelsname: [],
        modelname: 'All',
        ptmodel: 'All',
        level: 'All'
    };
}

onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]:e.target.value});   
}

componentDidMount() {
    load()
    this.setState({ 
        ptmodels: ['All', 'Academic', 'Kids'],
        levels: ['All', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2' ],
        modelsname: ['All', 'Grammar-A', 'Grammar-B', 'Reading-A', 'Reading-B', 'Listening-A', 'Listening-B', 'Writing-A', 'Writing-B', 'Speaking-A', 'Speaking-B']
    });
    
    axios.get(apiURL() + 'questions/getSummaryQuestions/x')
        .then(response => {
            this.setState({ listobj: response.data.question });
            this.setState({ grid: response.data.question });
            load()
        })
        .catch((error) => {console.log(error);})

             
}

delete = (id) => {
    axios.delete(apiURL() + 'questions/' + id)
        .then(res => console.log(res.data));
            
    this.setState({grid: this.state.grid.filter(el => el._id !== id)})
    this.setState({listobj: this.state.listobj.filter(el => el._id !== id)})
}

filterGrid = () => {
    let filter1 = this.state.ptmodel;
    let filter2 = this.state.modelname;
    let filter3 = this.state.level;
  
    let filtered = this.state.listobj
                    .filter(l => (filter1 !== 'All') ? l.ptmodel === filter1 : 1>0 )
                    .filter(l => (filter2 !== 'All') ? l.modelname === filter2 : 1>0 )
                    .filter(l => (filter3 !== 'All') ? l.level === filter3 : 1>0 )

    this.setState({ grid: filtered});
}

render() {
  return (  
    <BaseQuestion name="Summary of Questions" color="card badge-conexia" >
            <div className="row">                                    
                <div className="col-sm">
                    <div className="form-group"> 
                        <label>Placement Test Type </label>
                        <select ref="userInput" name="ptmodel" required className="form-control" value={this.state.ptmodel} onChange={this.onChange} >
                            {this.state.ptmodels.map(function(ptmodel) { return <option key={ptmodel} value={ptmodel}>{ptmodel} </option>;})}
                        </select>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-group"> 
                        <label>Question Type </label>
                        <select ref="userInput" name="modelname" required className="form-control" value={this.state.modelname} onChange={this.onChange} >
                            {this.state.modelsname.map(function(modelname) { return <option key={modelname} value={modelname}>{modelname} </option>;})}
                        </select>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-group"> 
                        <label>Level </label>
                        <select ref="userInput" name="level" required className="form-control" value={this.state.level} onChange={this.onChange} >
                            {this.state.levels.map(function(level) { return <option key={level} value={level}>{level} </option>;})}
                        </select>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-group m-t-15 m-r-15 float-right">                                                                                     
                        <a className="btn btn-secondary waves-effect waves-light" href="#" onClick={() => {this.filterGrid()}}>Search</a>                                    
                    </div>
                </div>
            </div>
            <div className="table-responsive b-0">
                <div className="col">
                    <table className="table table-hover mb-0">
                    <thead>
                        <tr>
                        <th>PT Type</th>
                        <th>Question Type</th>
                        <th>Question ID</th>
                        <th>Level</th>
                        <th>Order</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.grid.map((obj, key) => {
                            return (
                            <tr key={'qts'+key}>
                                <td>{obj.ptmodel}</td>
                                <td>{obj.modelname}</td>
                                <td>{obj.name} </td>
                                <td>{obj.level}</td>
                                <td>{obj.order}</td>
                                <td>
                                    <div className="d-flex justify-content-end">
                                        <Link className="btn btn-primary btn-sm" to={"/admin/edit-" + obj.modelname + "/" + obj._id}>Edit</Link> &nbsp;
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
