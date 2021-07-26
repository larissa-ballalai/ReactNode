import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { adminConfig, apiURL } from "../api"
import { getUserSession } from "../scripts/isLoggedIn"
import { schoolAction } from '../scripts/school'
import { classroomAction } from '../scripts/classroom'
import { load } from "./load"
import BaseQuestion from "./base-question";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            levels: ["All", "A1", "A2", "B1", "B2", "C1", "C2"],
            schools: [],
            students: [],
            classrooms:[],
            school: "All",
            student: "All",
            level: "All",
            classroom: "All",
            grid: [],
            export: [],
            detail: {testByAbility: []},
            url: adminConfig().root
        }
    }

    async componentDidMount() {
        load()
        
        var user = getUserSession("userAdmin")
       
        const report = await axios.post(apiURL() + "report/getReportProfile", { user : { profile: user.profile, school: {_id: user.school._id}, _id: user._id} })               
        const school = await schoolAction("GETCOMBO")
        const classroom = await classroomAction("GETCOMBO")
                
        var listStudent = []
        classroom.filter(f => {
            for(var i=0; i<f.users.length; i++) 
                 listStudent = listStudent.concat({ _id: f.users[i]._id, name: f.users[i].name, classID: f._id, schoolID: f.school})     
        })

        this.setState({ grid: report.data, dataset: report.data, 
                        schools: school, schoolDataset: school, 
                        classrooms: classroom, classroomsDataset: classroom, 
                        students: listStudent , studentsDataset: listStudent}) 

        load()
    }

    onChangeSchool = async(e) => {
        e.preventDefault();

        if(e.target.value === "All") 
            this.setState({ classrooms: this.state.classroomsDataset, students: this.state.studentsDataset, [e.target.name]: e.target.value })
        else {
            const classes = this.state.classroomsDataset.filter(f => f.school === e.target.value)
            const students = this.state.studentsDataset.filter(f => f.schoolID === e.target.value)

            this.setState({ classrooms: classes, students: students, [e.target.name]: e.target.value })
        }
    }

    onChangeClassroom = async(e) => {
        e.preventDefault();

        if(e.target.value === "All") {
            const students = this.state.studentsDataset.filter(f => f.schoolID === this.state.school)
            this.setState({ students: students, [e.target.name]: e.target.value })
        }
        else {            
            const students = this.state.studentsDataset.filter(f => f.classID === e.target.value)
            this.setState({ students: students, [e.target.name]: e.target.value })
        }
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    filterGrid = () => {
        var filtered = this.state.dataset.filter(l => this.state.school !== "All" ? l.school._id === this.state.school : 1 > 0)
                                         .filter(l => this.state.student !== "All" ? l.user._id === this.state.student : 1 > 0)
                                         .filter(l => this.state.level !== "All" ? l.finalGrade === this.state.level : 1 > 0)
                                         .filter(l => this.state.classroom !== "All" ? l.classroom._id === this.state.classroom : 1 > 0)

        this.setState({ grid: filtered });
    }

    

    playAudio = (path) => {
        var audio = new Audio(path)
        audio.play()
    }

render() {
    return (
        <BaseQuestion name='Dashboad' color="card badge-conexia">                                                                                
            {/* filters */}
            <div className="row">
                <div className="col-sm">
                    <div className="form-group">
                        <label>School </label>
                            <select ref="user" name="school" required className="form-control" value={this.state.school} onChange={this.onChangeSchool} >
                                <option value="All">All</option>
                                    {this.state.schools.map((school, key) => {
                                        return (
                                            <option value={school._id}>{school.name} </option>
                                        ); })}
                            </select>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-group">
                        <label>Classroom </label>
                        <select ref="userInput" name="classroom" required className="form-control" value={this.state.classroom} onChange={this.onChangeClassroom}>
                            <option value="All">All</option>
                            {this.state.classrooms.map(function (classroom, key) {
                                return (
                                <option value={classroom._id}> {classroom.name} </option> );
                            })}
                            </select>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-group">
                        <label>Student</label>
                        <select ref="userInput" name="student" required className="form-control" value={this.state.student} onChange={this.onChange}>
                            <option value="All">All</option>
                            {this.state.students.map((student, key) => {
                                return (
                                <option value={student._id}>{student.name}</option>
                                );
                            })}
                        </select>
                    </div>
                </div>                                                                                                    
                <div className="col-sm">
                    <div className="form-group">
                        <label>Final Grade </label>
                        <select ref="userInput" name="level" required className="form-control" value={this.state.level} onChange={this.onChange}>
                            {this.state.levels.map(function (level) {
                            return (
                                <option key={level} value={level}> {level} </option>
                            );
                            })}
                        </select>
                    </div>
                </div>                                                  
                <div className="col-sm">
                    <div className="form-group m-t-28">
                        <a className="btn btn-secondary waves-effect waves-light" href="#" onClick={() => {this.filterGrid(); }}>Search </a>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-group m-t-28 m-r-15 float-right">                              
                    </div>
                </div>
            </div>
            <hr></hr>
            {/* grid */}
            <div>
                {/* header */}
                <div className="row txt-black mt-3 mb-3">
                    <div className="col-sm">Date</div>
                    <div className="col-sm">School</div>
                    <div className="col-sm">Classroom</div>
                    <div className="col-sm">Student</div>
                    <div className="col-sm">Listening</div>
                    <div className="col-sm">Grammar</div>
                    <div className="col-sm">Reading</div>
                    <div className="col-sm">Writing</div>
                    <div className="col-sm">Speaking</div>
                    <div className="col-sm">Grade</div>
                    <div className="col-sm"></div>
                </div>
                {/* body */}                                                  
                <hr></hr>
                {this.state.grid.map((item, key)=>(
                    <>
                    <div className="row">                                                            
                        <div className="griddash col-sm"> {moment(item.date).format("l")} </div>
                        <div className="griddash col-sm"> {item.school.name} </div>
                        <div className="griddash col-sm"> {item.classroom.name} </div>
                        <div className="griddash col-sm"> {item.user.name} </div>
                        <div className="griddash col-sm"> {item.listening.level}</div> 
                        {/* : {item.listening.weight} %  */}
                        <div className="griddash col-sm"> {item.grammar.level} </div>
                        <div className="griddash col-sm"> {item.reading.level} </div>
                        <div className="griddash col-sm"> {item.writing.level} </div>
                        <div className="griddash col-sm"> {item.speaking.level} </div>
                        <div className="griddash col-sm"> {item.finalGrade} </div>
                        <div className="griddash col-sm">
                            <button className="btn btn-primary btn-sm" onClick={() => this.detail("detail_" + key, item.testID)}>+ </button>
                        </div>
                    </div>
                    <hr></hr>

                                                                            
                    {/* detail */}
                    <div id={"detail_" + key}  className="row none">                                                                 
                        {this.state.detail &&                                                        
                            <div>
                                {this.state.detail.testByAbility.map((test, index)=>(
                                    <div>
                                        <div className="text-center font-18 bold m-t-20 "> {test.testType} {test.level} { ((test.detail_results.correct_count / test.detail_results.count) * 100.00).toFixed(2) } % </div>
                                            <div className="d-flex text-center justify-content-center m-b-20">
                                                <div className="mt-2 mr-4"> Total Hits
                                                    <div className="text-green bold font-20"> {test.detail_results.correct_count} </div>
                                                </div>
                                                <div className="mt-2 ml-4 "> Total Mistakes
                                                    <div className="text-red bold font-20"> {test.detail_results.mistakes_count} </div>
                                                </div>
                                            </div>
                                            <div className="row ml-2 m-0 f-5 justify-content-center">
                                                <div className="tab linha dasht col-sm-1">Level Order</div>
                                                <div className="tab linha dasht col-sm">Grammar</div>
                                                <div className="tab linha dasht col-sm">Sentence</div>
                                                <div className="tab linha dasht col-sm">Correct Answer</div>
                                                <div className="tab linha dasht col-sm">Student Answer</div>
                                                <div className="tab linha ma100 dasht br col-sm-2">Status</div>
                                            </div>
                                        
                                            {test.questions.map((question, key) => (                                                                    
                                                <div className="row ml-2 m-0 f-5 justify-content-center ">
                                                    <div className="tab linha col-sm-1 d-flex align-items-center">Level:{question.level} - {question.order} </div>
                                                    <div className="tab linha col-sm d-flex align-items-center">{question.grammar}</div>
                                                    
                                                    {/* sentence */}
                                                    <div className="tab linha col-sm d-flex align-items-center"> 
                                                        {question.modelname === "Listening-A"  &&
                                                            <div onClick={() => { this.playAudio(this.state.url + "la/" + question.sentence) }}>
                                                                <img src="../../img/play_arrow.png"/>
                                                            </div>
                                                        }
                                                        {question.modelname === "Listening-B" &&                                                                                                
                                                            <div onClick={() => { this.playAudio(this.state.url + "lb/" + question.sentence) }}> 
                                                                <img src="../../img/play_arrow.png"/>
                                                            </div>
                                                        }
                                                        {question.modelname === "Writing-A" &&                                                                                                                                                                                                                                                                                               
                                                            <div onClick={() => { this.playAudio(this.state.url + "wr/" + question.sentence) }}>
                                                                <img src="../../img/play_arrow.png"/>
                                                            </div>
                                                        }
                                                        {question.modelname === "Speaking-A" &&                                                                                                                                                                                                
                                                            <div onClick={() => { this.playAudio(this.state.url + "sa/" + question.sentence) }}>
                                                                <img src="../../img/play_arrow.png"/>
                                                            </div>
                                                        }
                                                            {question.modelname === "Writing-B" &&                                                                                                                                                                                                
                                                            <div>{question.choices[0].word} </div>
                                                        }
                                                        <span className="m-1">{question.modelname !== "Writing-B" && <span>{question.sentence}</span>}</span>
                                                    </div>
                                                    
                                                    {/* answer */}
                                                    <div className="tab linha col-sm d-flex align-items-center">
                                                        {question.model === "Listening"   && 
                                                            <div className="d-flex">
                                                                {question.modelname === "Listening-A" &&
                                                                    <div>
                                                                        <img width="70"  src={this.state.url + "la/" + question.choices[0].word} controls="controls" />
                                                                    </div>
                                                                }
                                                                <span className="ml-1 align-self-center"> {question.choices[0].word}</span>
                                                            </div>
                                                        }                                              
                                                        {question.model === "Reading"   && 
                                                            <div className="d-flex">
                                                                {question.modelname === "Reading-A"  &&
                                                                <div>
                                                                    <img width="70" src={this.state.url + "ra/" + question.choices[0].word} controls="controls" />
                                                                </div>
                                                                }
                                                                <span className=" ml-1 align-self-center"> {question.choices[0].word}</span>
                                                            </div>                                                    
                                                        }                                            
                                                        {question.model === "Grammar"  && 
                                                            <div>{question.choices.map((item, key) => (
                                                                <span className="mr-1">{item.word}.</span>))}
                                                            </div>
                                                        }                                                 
                                                        {question.modelname === "Speaking-A" && <div>{question.choices[0].word}</div>}
                                                        {question.modelname === "Speaking-B" && <div>{question.sentence}</div>}
                                                        {question.model === "Writing" && 
                                                            <div>
                                                                {question.choices[0].optionlist.map((itemm,key)=>(
                                                                    <div>{itemm}</div>
                                                                ))}
                                                            </div>
                                                        }
                                                    </div>
                                                    
                                                    {/* student answer */}
                                                    <div className="tab linha col-sm d-flex align-items-center">
                                                    {question.model === "Grammar"  && 
                                                            <div>{question.choices.map((item, key) => (
                                                                <span className="mr-1">{item.answer}.</span>))}
                                                            </div>
                                                        }  
                                                        
                                                        { question.modelname === "Listening-A" &&
                                                            <div className=" mr-1 ">
                                                                <img width="70" src={this.state.url + "la/" + question.answer} controls="controls" />
                                                            </div>
                                                        }
                                                        { question.modelname === "Reading-A"  &&
                                                            <div className=" mr-1 ">
                                                                <img width="70" src={this.state.url + "ra/" + question.answer} controls="controls" />
                                                            </div>
                                                        } 
                                                        <div className="d-block">                                                                                                
                                                            { question.modelname === "Speaking-A" &&
                                                                <div>                                                                                                       
                                                                    {question.answer !== "No answer selected" && 
                                                                        <div onClick={() => { this.playAudio(this.state.url + "audio/" + item.testID + "/" + question.id + ".mp3") }}>
                                                                            <img src="../../img/play_arrow.png"/>
                                                                            <label> &nbsp; Speech Score =  {question.quality_score}</label>
                                                                        </div>
                                                                    } 
                                                                </div> 
                                                            }

                                                            {question.modelname === "Speaking-B" &&
                                                                <div>
                                                                    {question.audio_status!== "no audio" && 
                                                                        <div onClick={() => { this.playAudio(this.state.url + "audio/" + item.testID + "/" + question.id + ".mp3") }}>
                                                                            <img src="../../img/play_arrow.png"/>
                                                                            <label> &nbsp; Speech Score =  {question.quality_score}</label>
                                                                        </div>
                                                                    } 
                                                                    {question.audio_status === "no audio" && 
                                                                        <div className="ml-1">No answer selected</div>
                                                                    } 
                                                                </div> 
                                                            }

                                                            { question.modelname !== "Speaking-B" && 
                                                                <span className=" ml-1 align-self-center">
                                                                    {question.model !== "Grammar" && <span>{question.answer}</span>}
                                                                </span>
                                                            }                                                                                    
                                                        </div>
                                                    </div>                                              
                                                    <div className="tab linha br text-center ma100 col-sm-2 d-flex align-items-center">
                                                        { question.iscorrect === true ? 
                                                            <span className="botaobag m-auto">CORRECT</span>: <span className="bag m-auto">INCORRECT</span>}
                                                    </div>
                                                </div>                                                                        
                                            ))}
                                    </div>
                                ))}
                            </div>
                        } 
                        <br/>                                  
                    </div>                                                      
                    </>
                ))}
            </div>
        </BaseQuestion>
    );
}

    detail = (id, testID) => { 
        load()
        
        var divSet = document.getElementsByClassName("set")
        var div = document.getElementById(id)

        if(divSet[0] !== undefined && divSet[0] !== div) divSet[0].style.display = 'none'
        
        if(div.style.display == "block") {
            div.className = "row"
            div.style.display = 'none'
            load()
        }
        else {
            div.className = "row set"
            div.style.display = 'block'
                        
            axios.get(apiURL() + "report/getReportDetail/" + testID)
                 .then(response => { this.setState({detail: response.data.test[0]}); load()})
        }
    }
    
}




    // gridView = (listReport) => {
    //     this.setState({ grid: listReport });

    //     let reportExcel = []
    //     listReport.map(item => {
    //         var register = {
    //             Date: moment(item.date).format("l"),
    //             School: item.school,
    //             Student: item.user,
    //             Type: "Final",
    //             Grade: item.finalGrade
    //         }

    //         reportExcel = reportExcel.concat(register)
    //         item.testByAbility.map(detail => {
    //             var register = {
    //                 Date: "",
    //                 School: item.school,
    //                 Student: item.user,
    //                 Type: detail.testType,
    //                 Grade: detail.level
    //             }

    //           reportExcel = reportExcel.concat(register)
    //         })
    //     })

    //     this.setState({export: reportExcel})
    // }