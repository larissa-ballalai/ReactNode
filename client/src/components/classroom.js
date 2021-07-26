import React, { Component } from 'react';
import Modal from "./modal";
import { Link } from "react-router-dom";
import { classroomAction} from '../scripts/classroom'
import { distributorAction} from '../scripts/distributor'
import { schoolAction} from '../scripts/school'
import { userAction } from '../scripts/user'
import { getUserSession } from "../scripts/isLoggedIn"
import BaseQuestion from "./base-question";

export default class Classroom extends Component {
constructor(props) {
    super(props);
    
    this.state = {
        id: '',
        period: '', 
        year:'',
        name: '',
        school: '',
        distributor: '',
        show: false,
        schools: [],
        coaches:[],
        coach:"",
        classrooms:[],
        distributors:[],
        students:[],
        student:[],
        users: [],
        user: "",
    }    
}

async componentDidMount() {        
    const school = await schoolAction("GETCOMBO")
    this.setState ({schools:school})

    const distributor = await distributorAction("GETCOMBO")
    this.setState({ distributors:distributor})

    if(this.state.edit !== undefined) {       
        const classroomById = await classroomAction("GETBYID", this.props.match.params.id)          
        
        this.getUserBySchool(classroomById.school._id)
        
        this.setState({
            active: classroomById.active,
            id: classroomById.id,
            importID: classroomById.importID,
            name: classroomById.name,
            period: classroomById.period,
            school: classroomById.school._id,
            users: classroomById.users,
            year: classroomById.year,
            distributor: classroomById.school.distributor
        })        
    }

    this.setState({user: getUserSession("userAdmin")})
}

async getUserBySchool(schoolID) {
    const users = await userAction("GETBYSCHOOL", schoolID)
    this.setState({ students: users.filter(f=> f.profile === "STUDENT") })
    this.setState({ coaches: users.filter(f=> f.profile === "COACH") })
}

onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]:e.target.value});
}
 
onChangeSchool = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]:e.target.value});
    this.getUserBySchool(e.target.value)
}

onChangeDistributor = async(e) => {
    e.preventDefault();
    this.setState({ [e.target.name]:e.target.value});
    
    const school = await schoolAction("GETBYDISTRIBUTOR", e.target.value) 
    this.setState ({schools:school})
}

addUser = (type) => {    
    var new_user = null
    if(type === "COACH")
        new_user = this.state.coaches.filter(f => f.name === this.state.coach)        
    else 
        new_user = this.state.students.filter(f => f.name === this.state.student)
        
    var users = this.state.users
    if(users.filter(f => f.name === new_user[0].name).length === 0) {
        users = users.concat(new_user)
        this.setState({users: users})
    }        
}

deleteUser = (_id) => {
    var users = this.state.users.filter(f => f._id !== _id)
    this.setState({users: users})
}

onSubmit = async(e) => {
    e.preventDefault();

    var users_id = this.state.users.map(m => { return m._id })    
    const object = {
        active: true,
        id: this.state.id,
        importID: this.state.importID,
        name: this.state.name,
        period: this.state.period,
        school: this.state.school,
        users: users_id,
        year: this.state.year,
        distributor: this.state.distributor       
    };
    
    if (this.props.match.params.id === undefined) {
        await classroomAction("ADD", object)
    }    
    else {
        await classroomAction("UPDATE", this.props.match.params.id, object)
    }
        
    this.setState({ show: true });
}

hideModal = () => {
    this.setState({ show: false });
}

render() {
    this.state.edit = this.props.match.params.id;
    return (
        <BaseQuestion name="Classroom" color="card badge-conexia">
            <form onSubmit={this.onSubmit}>
                <div className="row">                   
                    <div className="col-sm-8">
                        <div className="form-group"> 
                            <label>Name: </label>
                            <input type="text" name="name" required className="form-control" value={this.state.name} onChange={this.onChange} disabled={this.state.user.profile === "COACH" ? true : false}/>
                        </div>
                    </div>   
                    <div className="col-sm-4">
                        <div className="form-group"> 
                            <label>Year: </label>
                            <input type="text" name="year" required className="form-control" value={this.state.year} onChange={this.onChange} disabled={this.state.user.profile === "COACH" ? true : false}/>
                        </div>
                    </div>                                                                                         
                </div> 
                <div className="row"> 
                    <div className="col-sm">
                        <div className="form-group"> 
                            <label>Distributor: </label>
                            <select ref="user" name="distributor"  required className="form-control" value={this.state.distributor} onChange={this.onChangeDistributor} disabled={this.state.user.profile !== "ADMIN" ? true : false}>
                                <option value="">All</option>
                                {this.state.distributors.map((distributor, key) => {                                                        
                                    return (<option key={key} value={distributor._id}>{distributor.name} </option>)
                                })}
                            </select>
                        </div>
                    </div> 
                    <div className="col-sm">
                        <div className="form-group"> 
                            <label>School: </label>
                            <select ref="user" name="school" required className="form-control" value={this.state.school} onChange={this.onChangeSchool} disabled={this.state.user.profile !== "ADMIN" ? true : false}>
                                <option value="">All</option>
                                {this.state.schools.map((school, key) => {                                                        
                                    return (<option key={key} value={school._id}>{school.name} </option>)
                                })}
                            </select>
                        </div>
                    </div>
                </div> 
                <div className="row m-0 ">
                    <div className="col-sm mr-2 classborder d-flex">
                        <div className="col-sm">
                            <div className="form-group">                                                            
                                <label>Coach: </label>                                                                
                                    <select ref="user" name="coach" className="form-control" value={this.state.coach} onChange={this.onChange} disabled={this.state.user.profile === "COACH" ? true : false}>
                                        <option value="">All</option>
                                        {this.state.coaches.map((item, key) => {                                                        
                                            return (<option key={key} value={item.name}>{item.name} </option>)})}
                                    </select>
                                    <table className="mt-2 " disabled={this.state.user.profile === "COACH" ? "disabled" : "enabled"}>
                                        <tbody>
                                            {this.state.users.filter(f => f.profile === "COACH").map((item, key) => {      
                                                return(
                                                        <tr>
                                                            <td className="p1box" key={key} value={item.name}> {item.name}</td>
                                                            <td onClick={() => this.deleteUser(item._id)}> 
                                                                <img className=" m-l-80 cancelred buts" alt="" src="../../img/brocoli.png" disabled={this.state.user.profile === "COACH" ? true : false}/> 
                                                            </td>
                                                        </tr>)
                                                    })}
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                        <div className="col-sm-3 m-t-27 ">
                            <div className=" btn waves-effect waves-light m-l-10 badge-azul" onClick={() => this.addUser("COACH")} > add </div>
                        </div>
                    </div>                                                      
                    <div className="col-sm ml-2 classborder d-flex">
                        <div className="col-sm">
                            <div className="form-group">
                                <label>Student </label>
                                    <select ref="user" name="student" className="form-control" value={this.state.student} onChange={this.onChange} disabled={this.state.user.profile === "COACH" ? true : false}>
                                        <option value="">All</option>
                                        {this.state.students.map((item, key) => {                                                        
                                            return (<option key={key} value={item.name}>{item.name} </option>)})}
                                    </select>
                                    <table className="mt-2 ">
                                        <tbody>
                                        {this.state.users.filter(f => f.profile === "STUDENT").map((item, key) => {      
                                        return(
                                                <tr>
                                                    <td className="p1box" key={key} value={item.name}> {item.name}</td>
                                                    <td onClick={() => this.deleteUser(item._id)}> 
                                                        <img className=" m-l-100 cancelred buts" alt="" src="../../img/brocoli.png" disabled={this.state.user.profile === "COACH" ? true : false}/> 
                                                    </td>
                                                </tr>)                                                            
                                            })}
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                        <div className="col-sm-3 m-t-27">
                            <div className=" btn waves-effect waves-light m-l-10 badge-azul" onClick={() => this.addUser("STUDENT")}>add</div>
                        </div>
                    </div>  
                </div>   
                <div key="button">
                    <div className="d-flex justify-content-center bd-highlight mb-3 m-t-80">
                        <Link className="btn btn-secondary waves-effect waves-light" to="../../admin/classroom-list"> Back </Link>
                        {this.state.user.profile === "ADMIN" ?  <input type="submit" value="Save" className="btn waves-effect waves-light m-l-10 badge-azul" />: ""}                                                    
                    </div>          
                </div>                                                    
            </form>
            <Modal show={this.state.show} hideModal={this.hideModal} text ="Item added successfully!" redirect="../../admin/classroom-list"></Modal>                                  
        </BaseQuestion>                               
    )}
}