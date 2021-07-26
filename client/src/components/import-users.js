import React, { Component } from "react";
import { importData, closeAPI } from "../scripts/import"
import { distributorAction } from "../scripts/distributor"
import BaseQuestion from "./base-question";

export default class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            distributors: [], 
            Import:[]
        }
    }

    async componentDidMount() {
        const distributor = await distributorAction("GET")
        this.setState({ distributors: distributor})
    }
    
    onChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]:e.target.value});
    }

    async import() {
        try {
            var distributor_id = this.state.distributors.filter(f=> f.name === this.state.distributor)[0]._id
            const import_result = await importData(distributor_id)   
        } catch (err) {
            console.log(err)
        }     
    }

  render() {
    return (
      <BaseQuestion name="Import" color="card badge-conexia">
        <div className="row admin">                                               
          <div className="col-sm-9">
            <div className="form-group m-t-25 ">
            <label>Distributor: </label>
            <select ref="user" name="distributor" className="form-control" value={this.state.distributor} onChange={this.onChange} >
                <option value="">All</option>
                {this.state.distributors.map((distributor, key) => {                                                        
                    return (<option key={key} value={distributor.name}>{distributor.name} </option>)
                })}
            </select>                                                                                                                                                    
            </div>
          </div>
          <div className="col-sm-3 mt-50">
            <a className="btn btn-warning" href="#" onClick={() => { this.import(); }}> Import </a>
          </div> 
        </div>
        {/* <div className="table-responsive b-0">
            <div className="col ">
                <table className="table table-hover mb-0">
                <thead>
                    <tr>
                        <th>TenantName</th>
                        <th>Distributor</th>
                    </tr>
                </thead>
                <tbody> 
                      {this.state.Import.map((item,key) => {
                        return(
                          <tr key={key}>
                            <td>{item.information.tenantName}</td>
                            <td>{item.distributor}</td>
                          </tr>
                        )
                      })}                                     
                </tbody>  
                </table>
            </div>
        </div>  */}
      </BaseQuestion>                 
    );
  }
}
