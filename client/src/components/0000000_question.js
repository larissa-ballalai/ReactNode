import React, { Component } from "react"
import PTGrammarA from "./pt-grammar-a";
import PTListeningA from "./pt-listening-a";
import PTListeningB from "./pt-listening-b";
import PTReadingA from "./pt-reading-a"
import PTReadingB from "./pt-reading-b"
import PTWritingA from "./pt-writing-a"
import PTWritingB from "./pt-writing-b"
import PTSpeakingA from "./pt-speaking-a"
import PTSpeakingB from "./pt-speaking-b"
import Structure from "./site-structure"
import { questionLayout } from "../scripts/question"
import { adminConfig, apiURL } from "../api";
import axios from "axios"
import { getUserSession, setUserSession } from "../scripts/isLoggedIn"
import { getNextQuestion, saveTestAbility } from "../scripts/test"
import { aquecimento } from "../scripts/aquecimento"


export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: {
                model: "",
                icon: "",
                user: ""
            },
            question: "",
            position: -1,
            previouspos: -1,
            timer: 50
        } 
    }

    componentDidMount() { 
        
       // alert('mounted')

        var configQuestion = questionLayout(this.props.match.params.model)  
        this.setState({ 
            question: this.props.match.params.question,

            position: this.props.match.params.position,
            user: getUserSession("userPT"),
            layout: configQuestion
        })
                
        document.body.style.backgroundImage = configQuestion.backgroundImage
        document.body.style.backgroundColor = configQuestion.background
    }

    nextButton() {
        alert('a')

        this.setState({layout: {model: "listening-b"}})
        var configQuestion = questionLayout("listening-b")  
        this.setState({layout: configQuestion})
        document.body.style.backgroundImage = configQuestion.backgroundImage
        document.body.style.backgroundColor = configQuestion.background
    }

    getWeigthByAbility = (model) => {
        var weight = []    
        switch (model) {
            case "Listening":
                weight = [ {level: "A1", correct: 8.33, wrong: -2.1},
                        {level: "A2", correct: 12.5, wrong: -3.125},
                        {level: "B1", correct: 12.5, wrong: -3.125},
                        {level: "B2", correct: 12.5, wrong: -3.125},
                        {level: "C1", correct: 12.5, wrong: -3.125},
                        {level: "C2", correct: 12.5, wrong: -3.125}]
                return [["Listening-A", "Listening-B"], weight];
            case "Grammar":
                weight = [ {level: "A1", correct: 10, wrong: -2.5},
                        {level: "A2", correct: 20, wrong: -5},
                        {level: "B1", correct: 20, wrong: -5},
                        {level: "B2", correct: 16.7, wrong: -4.2},
                        {level: "C1", correct: 25, wrong: -6.25},
                        {level: "C2", correct: 20, wrong: -5}]
                    return [["Grammar-A", "Grammar-B"], weight];
            case "Reading":
                weight = [ {level: "A1", correct: 8.33, wrong: -2.1},
                        {level: "A2", correct: 12.5, wrong: -3.125},
                        {level: "B1", correct: 12.5, wrong: -3.125},
                        {level: "B2", correct: 12.5, wrong: -3.125},
                        {level: "C1", correct: 12.5, wrong: -3.125},
                        {level: "C2", correct: 12.5, wrong: -3.125}]
                    return [["Reading-A", "Reading-B"], weight];
            case "Writing":
                weight = [ {level: "A1", correct: 10, wrong: -2.5},
                        {level: "A2", correct: 20, wrong: -5},
                        {level: "B1", correct: 20, wrong: -5},
                        {level: "B2", correct: 16.7, wrong: -4.2},
                        {level: "C1", correct: 25, wrong: -6.25},
                        {level: "C2", correct: 20, wrong: -5}]
                    return [["Writing-A", "Writing-B"], weight];
            case "Speaking":
                weight = [ {level: "A1", correct: 10, wrong: -2.5},
                        {level: "A2", correct: 20, wrong: -5},
                        {level: "B1", correct: 20, wrong: -5},
                        {level: "B2", correct: 16.7, wrong: -4.2},
                        {level: "C1", correct: 25, wrong: -6.25},
                        {level: "C2", correct: 20, wrong: -5}]
                    return [["Speaking-A", "Speaking-B"], weight];                       
            default: 
                return;
        }        
    }

    saveTest = async (param, type, selectedAnswer) => {

        //flow aquecimento
        var origin = window.location.pathname
        if(origin.search("aquecimento") === 1 || origin.search("teste-dispositivo") === 1){        
            aquecimento(origin)     
        }
        //flow teste
        else {   

            var user = this.state.user
            var answer = ""
            var iscorrect = false
            var quality_score = 0
            var audio_status = ""
            var speech_results = { exchange_data: { status: "no audio" }}
            var question_weight = this.getWeigthByAbility(type)[1]                    
            var test_weight = user.test_weight
            var testID = user.testID 
            var current_position = parseInt(param.props.position)                     
    
            switch(type) {
                case "Grammar":
                    iscorrect = true
                    selectedAnswer.map(m => {
                        answer = answer.concat(m.answer)
                        if(m.answer !== m.word) iscorrect = false
                    })
                    break;
                case "Writing":
                    answer = param.state.value.replace(".", "").trim().toLowerCase();
                    param.state.choices[0].optionlist.map((m) => {
                        var choice = m.replace(".", "").trim().toLowerCase();
                        if (choice === answer) iscorrect = true;
                    });
                    break;
                // case "Speaking":
                //     if (param.state.blob !== null) 
                //         speech_results = await speechAce(param, testID, current_position)
    
                //     var audio_status = speech_results.exchange_data.status
                //     var quality_score = audio_status === "error" || audio_status === "no audio"  ? 0 : speech_results.exchange_data.text_score.quality_score;   
                //     var check_answer =  param.state.choices[0].word === param.state.values ? true : false 
                    
                //     answer = param.state.values === "" ? "No answer selected" : param.state.values
    
                //     iscorrect = check_answer === true && quality_score > 70 ? true : false 
                //     break;
                default:
                    answer = selectedAnswer;
                    iscorrect = param.state.choices[0].word === selectedAnswer ? true : false;
                    break;
            }
    
            var question = param.state
            question.model = type
            question.question_weight = question_weight.filter(f=> f.level === question.level)[0]
            question.id = current_position
            question.iscorrect = iscorrect
            question.answer = answer === "" ? "No answer." : answer
            question.weight = iscorrect ? question.question_weight.correct : question.question_weight.wrong
            question.status = "done"
            question.speechRecognition = speech_results
            question.quality_score = quality_score
            question.audio_status = audio_status   
            
            if(iscorrect) {
                user.test_weight.positive = test_weight.positive + question.question_weight.correct
                user.test_weight.positive_count = user.test_weight.positive_count + 1
            }
            else {
                user.test_weight.negative = test_weight.negative + question.question_weight.wrong    
                user.test_weight.negative_count = user.test_weight.negative_count + 1
            }

            console.log(this.state.user.test_weight)
            console.log(user.test_weight)
            
            // user.test_weight.positive = iscorrect ? test_weight.positive + question.question_weight.correct : test_weight.positive
            // user.test_weight.negative = iscorrect ? test_weight.negative : test_weight.negative + question.question_weight.wrong    
            // user.test_weight.positive_count = iscorrect ? user.test_weight.positive_count + 1 : user.test_weight.positive_count 
            // user.test_weight.negative_count = iscorrect ? user.test_weight.negative_count : user.test_weight.negative_count + 1
    
            this.setState({ user: user})
            setUserSession("userPT", JSON.stringify(user))
                                        
            await axios.post(apiURL() + "test/updateQuestion/" + testID, { 'question': question } )
            
            var next_question_key = await getNextQuestion(question, testID, user)       
       
            if(next_question_key == 0) 
                saveTestAbility(testID, user)
            else {
                               
                var configQuestion = questionLayout((next_question_key[0].modelname).toLowerCase())  
                

                this.setState({ 
                    question: next_question_key[0].url,
                    position: next_question_key[0].id,
                    layout: configQuestion
                })
                     
                this.setState({timer: 95})
                console.log(configQuestion.model)
                console.log(next_question_key[0].url)
                console.log(next_question_key[0].id)

                document.body.style.backgroundImage = configQuestion.backgroundImage
                document.body.style.backgroundColor = configQuestion.background
                //window.location = "../../../../question/" + next_question_key[0].url + "/" + next_question_key[0].id
            }                     
                //window.location = "../../../../question/" + next_question_key[0].url + "/" + next_question_key[0].id
        }
    }

    render() { 
        return ( 
              <Structure >
                    <div className="text-center m-t-20"> 
                    <div className="text1">teste</div>   
                    <div className={this.state.layout.color}> {this.state.layout.name} </div>                 
                    <div className={this.state.layout.cordal}><div className={this.state.layout.bolal}></div></div>
                    <div className={this.state.layout.cordar}><div className={this.state.layout.bolar}></div></div>
                    <div className="row"> 

                        {/* <div onClick={() => this.nextButton()}>Button </div> */}

                        model = {this.state.layout.model} - 
                        question = {this.state.question} -
                        position = {this.state.position} -
                        previouspos = {this.state.previouspos} -
                        enunciado2 = {this.state.subtitle} -

                        <div className="card col-sm-12 sha m-t-20">
                            <div className="card-body">
                              <img className="w-70" alt="" src={this.state.layout.icon}/>
                                <div className="st3">{this.state.layout.subtitle}</div>
                                <div>
                                    {(this.state.layout.model === "listening-a") && (this.state.previouspos < this.state.position) &&
                                        <PTListeningA id={this.state.question} position={this.state.position}                                                      
                                                      saveTest={this.saveTest}/>
                                    }   
                        
                                    {(this.state.layout.model === "listening-b") && (this.state.previouspos < this.state.position) &&
                                        <PTListeningB id={this.state.question} position={this.state.position} 
                                                      saveTest={this.saveTest}
                                                      timer={this.state.timer}
                                                      />
                                    }   

                                    {(this.state.layout.model === "grammar-a") &&
                                        <PTGrammarA id={this.props.match.params.question} position={this.props.match.params.position} enunciado2={this.state.subtitle}/>
                                    }       
                                        
                                    {(this.state.layout.model === "reading-a") &&
                                        <PTReadingA onChange1={this.next} id={this.props.match.params.question} position={this.props.match.params.position} enunciado2={this.state.subtitle}/>
                                    }   
                                    
                                    {(this.state.layout.model === "reading-b") &&
                                        <PTReadingB onChange1={this.next} id={this.props.match.params.question} position={this.props.match.params.position} enunciado2={this.state.subtitle}/>
                                    }   

                                    {(this.state.layout.model === "writing-a") &&
                                        <PTWritingA onChange1={this.next} id={this.props.match.params.question}position={this.props.match.params.position} enunciado2={this.state.subtitle}/>
                                    } 

                                    {(this.state.layout.model === "writing-b") &&
                                        <PTWritingB onChange1={this.next} id={this.props.match.params.question} position={this.props.match.params.position} enunciado2={this.state.subtitle}/>
                                    } 

                                    {(this.state.layout.model === "speaking-a") &&
                                        <PTSpeakingA onChange1={this.next} id={this.props.match.params.question} position={this.props.match.params.position} enunciado2={this.state.subtitle}/>
                                    }  

                                    {(this.state.layout.model === "speaking-b") &&
                                        <PTSpeakingB onChange1={this.next} id={this.props.match.params.question} position={this.props.match.params.position} enunciado2={this.state.subtitle}/>
                                    }                                     
                                </div>
                                {/* <QuestionBack src={adminConfig().listeningB + this.state.background}/>  */}
                            </div>
                        </div>
                    </div>
                </div>
            </Structure>          
                 
                  
        );
    }
}
