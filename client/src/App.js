import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./css/style.css";
import "./css/rwd-table.min.css";
import Login from "./components/login";
import Main from "./components/main";
import QuestionList from "./components/questions";
import ReadingA from "./components/reading-a";
import ReadingB from "./components/reading-b";
import GrammarA from "./components/grammar-a";
import GrammarB from "./components/grammar-b";
import ListeningA from "./components/listening-a";
import ListeningB from "./components/listening-b";
import SpeakingA from "./components/speaking-a";
import SpeakingB from "./components/speaking-b";
import WritingA from "./components/writing-a";
import WritingB from "./components/writing-b";
import SchoolList from "./components/school-list";
import School from "./components/school";
import ImportUsers from "./components/import-users";
// import PTHome from "./components-pt/home";
import PTLogin from "./components-pt/login";
import PTMain from "./components-pt/intro";
import Warmup from "./components-pt/warmup";
import Stop from "./components-pt/stop";
import Question from "./components-pt/question"
import PTStart from "./components-pt/pt-start";
import PTResults from "./components-pt/pt-results";
import PTResume from "./components-pt/resume";
import Dashboard from "./components/dashboard";
import { isLoggedIn } from "./scripts/isLoggedIn";
import ClassroomList from './components/classroom-list'
import Classroom from "./components/classroom";
import DistributorList from "./components/distributor-list";
import Distributor from "./components/distributor";
import User from "./components/user";
import UserList from "./components/user-list";
import { AnimatePresence } from 'framer-motion';
import TesteDispositivo from './components-pt/teste-dispositivo'
import IntroVideo from "./components-pt/intro-video";
import Load from "./components/load";
import StudentsResults from "./components-pt/student-results";

export default class App extends Component {  
    constructor(props) {
        super(props);
        this.state = {}
    }
  
    componentDidMount() {        
        isLoggedIn()                
    }

  render() {    
    return (
      <div>
          <Load />
          <AnimatePresence>
              <Switch>
                  <Route path="/" exact component={PTLogin} /> 
                  <Route path="/login" component={PTLogin} />
                  <Route path="/intro" component={PTMain} />
                  <Route path="/warmup/:order" component={Warmup} />
                  <Route path="/start" component={PTStart} />
                  <Route path="/stop/:order" component={Stop} />
                  <Route path="/question/:model/:question/:position" component={Question} />            
                  <Route path="/result" component={PTResults} />
                  <Route path="/resume" component={PTResume} />
                  <Route path="/teste-dispositivo" component={TesteDispositivo}/>
                  <Route path="/intro-video" component={IntroVideo}/>
                  <Route path="/admin" exact component={Login}/>
                  <Route path="/admin/main" component={Main} />
                  <Route path="/admin/reading-a" component={ReadingA} />
                  <Route path="/admin/edit-reading-a/:id" component={ReadingA} />
                  <Route path="/admin/reading-b" component={ReadingB} />
                  <Route path="/admin/edit-reading-b/:id" component={ReadingB} />
                  <Route path="/admin/grammar-a" component={GrammarA} />
                  <Route path="/admin/edit-grammar-a/:id" component={GrammarA} />
                  <Route path="/admin/grammar-b" component={GrammarB} />
                  <Route path="/admin/edit-grammar-b/:id" component={GrammarB} />
                  <Route path="/admin/listening-a" component={ListeningA} />
                  <Route path="/admin/edit-listening-a/:id" component={ListeningA} />
                  <Route path="/admin/listening-b" component={ListeningB} />
                  <Route path="/admin/edit-listening-b/:id" component={ListeningB} />
                  <Route path="/admin/speaking-a" component={SpeakingA} />
                  <Route path="/admin/edit-speaking-a/:id" component={SpeakingA} />
                  <Route path="/admin/speaking-b" component={SpeakingB} />
                  <Route path="/admin/edit-speaking-b/:id" component={SpeakingB} />
                  <Route path="/admin/writing-a" component={WritingA} />
                  <Route path="/admin/edit-writing-a/:id" component={WritingA} />
                  <Route path="/admin/writing-b" component={WritingB} />
                  <Route path="/admin/edit-writing-b/:id" component={WritingB} />
                  <Route path="/admin/question" component={QuestionList} />
                  <Route path="/admin/school-list" component={SchoolList} />
                  <Route path="/admin/school" component={School} />
                  <Route path="/admin/edit-school/:id" component={School} />
                  <Route path="/admin/importusers" component={ImportUsers} />
                  <Route path="/admin/classroom-list" component={ClassroomList} />
                  <Route path="/admin/classroom" component={Classroom} />
                  <Route path="/admin/edit-classroom/:id" component={Classroom} />
                  <Route path="/admin/distributor-list" component={DistributorList} />
                  <Route path="/admin/distributor" component={Distributor} />
                  <Route path="/admin/edit-distributor/:id" component={Distributor} />
                  <Route path="/admin/user" component={User} />
                  <Route path="/admin/user-list" component={UserList} />
                  <Route path="/admin/edit-user/:id" component={User} />
                  <Route path="/admin/dash" component={Dashboard} />
                  <Route path="/student-result/:id" component={StudentsResults} />
              </Switch>
          </AnimatePresence>
      </div>
    );
  }
}
