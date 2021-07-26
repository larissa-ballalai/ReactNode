import React, { Component } from 'react';
import Modal from "./modal";
import Button from "./button"
import Logo from './logo'
import {distributorAction} from '../scripts/distributor'
import {  adminConfig } from '../api';
import { uploadBackground } from "../scripts/upload"
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import BaseQuestion from './base-question';

export default class Distributor extends Component {
constructor(props) {
    super(props);

    this.onChangeDate = this.onChangeDate.bind(this);
    this.state = {
        name: '',
        contact: '',
        email: '',
        phone: '',
        address: '',
        country: '',
        date_contract:new Date(),
        role: '',
        show: false,
        file: [],
        values: '',

    }
}

async componentDidMount() {
    if(this.state.edit !== undefined) {
        const distributorById = await distributorAction("GETBYID", this.props.match.params.id)
        this.setState({
            name: distributorById.name,
            address: distributorById.address,
            contact: distributorById.contact,
            country: distributorById.country,
            createdAt: distributorById.createdAt,
            date_contract:new Date(distributorById.date_contract), 
            email: distributorById.email,
            logo: distributorById.logo,
            phone: distributorById.phone,
            role: distributorById.role,
            updatedAt: distributorById.updatedAt,
            file: {
                blob: adminConfig().root + "logo/db/" + distributorById.logo,
                name: distributorById.logo,
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

onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]:e.target.value});
}

onSubmit = async(e) => {
    e.preventDefault();

    if(this.state.file.file)
        uploadBackground(this, "logo/db")

    const objectDistributor = {
        name: this.state.name,
        address: this.state.address,
        contact: this.state.contact,
        email: this.state.email,
        phone: this.state.phone,
        country: this.state.country,
        role: this.state.role,
        date_contract: this.state.date_contract,
        logo: this.state.file.name
    }

    if(this.props.match.params.id === undefined) {
        await distributorAction("ADD", objectDistributor)
    }
    else {
        await distributorAction("UPDATE", this.props.match.params.id, objectDistributor)
        console.log(this.state.file)
    }

    this.setState({ show: true });
}

hideModal = () => {
    this.setState({ show: false });
}

onChangeDate(date_contract) {
    this.setState({ date_contract: date_contract});
}


render() {
  this.state.edit = this.props.match.params.id;
  return (
    <BaseQuestion name="Distributor" color="card badge-conexia">
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
                        <label>Date of Contract: </label>
                        <div className="d-flex ">
                            <DatePicker name="date_contract" className="form-control" selected={this.state.date_contract} onChange={this.onChangeDate}/>
                        </div>
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
            <Logo file={this.state.file} addFiles={this.addFiles} deleteFile={this.deleteFile}
                values={this.state.values} onChangeValues={this.onChangeValues}/>
            <Button class="badge-azul" redirect="../../admin/distributor-list" />
        </form>
        <Modal show={this.state.show} hideModal={this.hideModal} text ="Item added successfully!" redirect="../../admin/distributor-list"></Modal>
    </BaseQuestion>                            
  )}
}