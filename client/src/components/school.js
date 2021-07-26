import React, { Component } from 'react';
import Main from "./main";
import Header from "./header";
import Modal from "./modal";
import Button from "./button"
import Logo from './logo'
import { distributorAction } from '../scripts/distributor'
import { schoolAction } from '../scripts/school'
import { adminConfig } from '../api';
import { uploadBackground } from "../scripts/upload"
import BaseQuestion from './base-question';

export default class School extends Component {
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
            id: '',
            show: false,
            file: [],
            values: '',
            distributors:[]
        }    
    }

async componentDidMount() { 
    const distributor = await distributorAction("GETCOMBO")
    this.setState({distributors:distributor})

    if(this.state.edit !== undefined) {
        const school = await schoolAction("GETBYID",this.props.match.params.id )     

        this.setState({
            name: school.name,
            id: school.id,
            contact: school.contact,
            email: school.email,
            phone: school.phone,
            address: school.address,
            logo: school.logo,
            country: school.country,
            role: school.role,
            distributor: school.distributor.name,
            file: { 
                blob: adminConfig().root +"logo/school/" + school.logo, 
                name: school.logo,
                file: null },
        })          
    }
}

addFiles = (e) => {
    let file = this.state.file
    file = { blob: URL.createObjectURL(e.target.files[0]), 
            name: e.target.files[0].name,
            file: e.target.files[0]}

    this.setState({ file: file})
}

deleteFile = (e) => {
    this.setState({ file: ""})
}

onChangeValues = (e) => {
    this.setState({values: e})   
}

onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]:e.target.value});
}

onSubmit = async(e) => {
    e.preventDefault();

    if(this.state.file.file) 
        uploadBackground(this, "logo/school")

    const object = {
        id: this.state.id, 
        name: this.state.name,
        contact: this.state.contact,
        email: this.state.email,
        phone: this.state.phone,
        address: this.state.address,
        country: this.state.country,
        role: this.state.role,
        distributor: this.state.distributors.filter(f=> f.name === this.state.distributor)[0]._id, 
        logo: this.state.file.name
    };
            
    if(this.props.match.params.id === undefined) 
        await schoolAction("ADD", object) 
    else 
        await schoolAction("UPDATE", this.props.match.params.id, object)

    this.setState({ show: true });
}

hideModal = () => {
    this.setState({ show: false });
}

render() {
  this.state.edit = this.props.match.params.id;
    return (
        <BaseQuestion name="School" color="card badge-conexia">
            <form onSubmit={this.onSubmit}>
                <div className="row">                   
                    <div className="col-md-6">
                        <div className="form-group"> 
                            <label>Name: </label>
                            <input type="text" name="name" required className="form-control" value={this.state.name} onChange={this.onChange} />
                        </div>
                    </div> 
                    <div className="col-md-6">
                        <div className="form-group"> 
                            <label>Distributor: </label>
                            <select ref="user" name="distributor" required className="form-control" value={this.state.distributor} onChange={this.onChange} >
                                <option value="">All</option>
                                {this.state.distributors.map((distributor, key) => {                                                        
                                    return (<option key={key} value={distributor.name}>{distributor.name} </option>)
                                })}
                            </select>
                        </div>
                    </div>                                                                                       
                </div>
                <div className="row">  
                    <div className="col-sm">                                          
                        <div className="form-group"> 
                            <label>Main address: </label>
                            <input type="text" name="address" required className="form-control" value={this.state.address} onChange={this.onChange} />
                        </div>
                    </div>  
                    <div className="col-sm">                                          
                        <div className="form-group"> 
                            <label>Country: </label>
                            <input type="text" name="country" required className="form-control" value={this.state.country} onChange={this.onChange} />
                        </div>
                    </div>   
                </div>
                <div className="row"> 
                    <div className="col-md-6">
                        <div className="form-group"> 
                            <label>Name of main contact: </label>
                            <input type="text" name="contact" required className="form-control" value={this.state.contact} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="form-group"> 
                            <label>Role: </label>
                            <input type="text" name="role" required className="form-control" value={this.state.role} onChange={this.onChange} />
                        </div>
                    </div>                                                                                                                                                                                                            
                </div>       
                <div className="row"> 
                    <div className="col-sm">
                        <div className="form-group"> 
                            <label>Email: </label>
                            <input type="text" name="email" required placeholder="email@email.com"  className="form-control" value={this.state.email} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="col-sm">                                          
                        <div className="form-group"> 
                            <label>Phone number: </label>
                            <input type="text" name="phone" required placeholder="(22) 1234-0000"  className="form-control" value={this.state.phone} onChange={this.onChange} />
                        </div>                                           
                    </div>         
                </div>  
                {/* upload logo */}
                <Logo file={this.state.file} addFiles={this.addFiles} deleteFile={this.deleteFile} 
                    values={this.state.values} onChangeValues={this.onChangeValues}/>
                <Button class="badge-azul" redirect="../../admin/school-list" />
            </form>
            <Modal show={this.state.show} hideModal={this.hideModal} text ="Item added successfully!" redirect="../../admin/school-list"></Modal>                                  
        </BaseQuestion>      
  )}
}