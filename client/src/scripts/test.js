import axios from "axios"
import { apiURL } from "../api"
import { getUserSession, setUserSession } from "../scripts/isLoggedIn"
import { warmup } from "../scripts/warmup"
import { uploadAudio } from "../scripts/upload"

export const createTest = async (model) => { 
    
    var user = getUserSession("userPT")
    
    //get question by model
    const getQuestions = await axios.get(apiURL() + "questions/getByTestType/" + model)
    var questions = getQuestions.data.filter((f) => f.order > 0)

    //create test object
    let key = 0;
    questions.map(question => (
        question.id = key++,
        question.model = model,  
        question.status = "",
        question.url = question.modelname.toLowerCase() + "/" + question._id     
    ));
    questions[0].status = "started";

    const test = {
        userid: user._id,
        questions: questions
    };
    
    if(model == "Listening") {
        axios.post(apiURL() + "test/add", test)
             .then(response => {
                 user.testID = response.data
                 var test_weight = { positive: 0, negative: 0, positive_count: 0, negative_count: 0 }
                 user.test_weight = test_weight

                 setUserSession("userPT", JSON.stringify(user))
                 
                 window.location = "../question/" + questions[0].url +  "/" + questions[0].id     
             })                         
    } 
    else {
        axios.post(apiURL() + "test/update/" + getUserSession("userPT").testID, test)
             .then(r => {
                window.location = "../question/" + questions[0].url +  "/" + questions[0].id
             })
    }         
}

export const saveTest = async (param, type, selectedAnswer) => {

    //flow warmup
    var origin = window.location.pathname
    if(origin.search("warmup") === 1 || origin.search("teste-dispositivo") === 1){        
        warmup(origin)     
    }
    //flow teste
    else {    
        var user = getUserSession("userPT")
        var answer = ""
        var iscorrect = false
        var quality_score = 0
        var audio_status = ""
        var speech_results = { exchange_data: { status: "no audio" }}
        var question_weight = getWeigthByAbility(type)[1]                    
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
            case "Speaking":
                if (param.state.blob !== null) 
                    speech_results = await speechAce(param, testID, current_position)

                var audio_status = speech_results.exchange_data.status
                var quality_score = audio_status === "error" || audio_status === "no audio"  ? 0 : speech_results.exchange_data.text_score.quality_score;   
                var check_answer =  param.state.choices[0].word === param.state.values ? true : false 
                
                answer = param.state.values === "" ? "No answer selected" : param.state.values

                iscorrect = check_answer === true && quality_score > 70 ? true : false 
                break;
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

        user.test_weight.positive = iscorrect ? test_weight.positive + question.question_weight.correct : test_weight.positive
        user.test_weight.negative = iscorrect ? test_weight.negative : test_weight.negative + question.question_weight.wrong    
        user.test_weight.positive_count = iscorrect ? user.test_weight.positive_count + 1 : user.test_weight.positive_count 
        user.test_weight.negative_count = iscorrect ? user.test_weight.negative_count : user.test_weight.negative_count + 1

        setUserSession("userPT", JSON.stringify(user))
                                    
        await axios.post(apiURL() + "test/updateQuestion/" + testID, { 'question': question } )
        
        var next_question_key = await getNextQuestion(question, testID, user)                  
        if(next_question_key == 0) 
            saveTestAbility(testID, user)
        else                         
            window.location = "../../../../question/" + next_question_key[0].url + "/" + next_question_key[0].id   
    }
}

const speechAce = async(param, testID, current_position) => {    

    //upload AWS
    var filename = current_position + ".mp3" 
    var file = new File([param.state.blob], filename);  
    uploadAudio(file, "audio/" + testID)
    
    //speech ace
    const data = new FormData();
    data.append("file", param.state.blob, "audio.mp3");

    const uploadFile = await axios.post(apiURL() + "speechace/upload", data)

    const speechAce = {
        file: uploadFile.data.filename,
        answer: param.state.choices[0].word
    };    

    //send to the API
    const object = await axios.post(apiURL() + "speechace/speechrecognition", speechAce)
    return object.data                        
}

// *** Rule description *** //
//If you have -20 negative points, the test ends, else , you continue.
//If you make a mistake If you have >= 80 positive points, you pass to the next level.
const getNextQuestion = async (question, testID, user) => {
    var next_question_key = 0
    var item = "none"

    if (question.iscorrect) {
        /*next order*/
        let next_question = await axios.post(apiURL() + "test/getOrder/" + testID, { 'order': question.order + 1 })         
        next_question = next_question.data.questions

        if (next_question.length > 0) 
            next_question_key = next_question;
    } 
    else {
        if (user.test_weight.negative > -20) {
            /*restricting level*/
            let next_question = await axios.post(apiURL() + "test/getQuestion/" + testID, { 'question_position': question.id + 1 })
            next_question = next_question.data.questions
                                    
            if(next_question.length > 0) {
                if(next_question[0].level === question.level || user.test_weight.positive >= 80) {
                    next_question_key = next_question;
                }                    
            }
        } 
    }

    return next_question_key    
}

const saveTestAbility = async(testID, user) => {        
    let results = await axios.get(apiURL() + "test/getTest/" + testID)
    results = results.data[0]
  
    var finalresult = { mistakes: user.test_weight.negative, 
                        mistakes_count: user.test_weight.negative_count, 
                        correct: user.test_weight.positive, 
                        correct_count: user.test_weight.positive_count, 
                        count: user.test_weight.positive_count + user.test_weight.negative_count }    
    
    const result = {
        userid: user._id,
        questions: results.questions,
        testID: testID,
        testType: results.questions[0].model,
        results: finalresult
    }
    
    await axios.post(apiURL() + "results/add", result)             
    
    updateUserSession(user)
    nextAbility(result.testType)
}

export const resume = async () => {    
    let user = getUserSession("userPT")
    let test = await axios.get(apiURL() + "test/getTest/" + user.testID)    
    test = test.data[0]

    //current question   
    var current_question = test.questions[test.questions.length -1]

    //teste iniciado
    if(current_question.status == "done") {
        for(var i=0; i < test.questions.length; i++) {
            var question = test.questions[i]
            user.test_weight.positive       = question.iscorrect ? user.test_weight.positive + question.question_weight.correct : user.test_weight.positive
            user.test_weight.negative       = question.iscorrect ? user.test_weight.negative           : user.test_weight.negative + question.question_weight.wrong
            user.test_weight.positive_count = question.iscorrect ? user.test_weight.positive_count + 1 : user.test_weight.positive_count 
            user.test_weight.negative_count = question.iscorrect ? user.test_weight.negative_count     : user.test_weight.negative_count + 1
        }
        
        var next_question = await getNextQuestion(current_question, user.testID, user)         
        setUserSession("userPT", JSON.stringify(user))

        if(next_question == 0) {
            nextAbility(current_question.model)
            updateUserSession(user)
        }        
        else 
            window.location = "../../../../question/" + next_question[0].url + "/" + next_question[0].id
    } 
    //test: not started.
    else
        window.location = "../../../../question/" + current_question.url + "/" + current_question.id
}

const nextAbility = async (model) => {    
    switch(model) {
        case "Listening":
            return window.location = "../../../../stop/1"
        case "Grammar":
            return window.location = "../../../../stop/2"
        case "Reading":
            return window.location = "../../../../stop/3"       
        case "Writing":
            return window.location = "../../../../stop/4"
        case "Speaking":
            await calculateResults()
            return window.location = "../../../../result"
        default:
            return 
    }
}

const calculateResults = async () => {
    const levelList = [ { level: "A1", grade: 1.00 },{ level: "A2", grade: 2.00 },
                        { level: "B1", grade: 3.00 },{ level: "B2", grade: 4.00 },
                        { level: "C1", grade: 5.00 },{ level: "C2", grade: 6.00 }]
    
    var user = getUserSession("userPT")
    var report = {
        name: user.name,
        user: user._id,      
        school: user.school._id, 
        classroom: user.classroom,
        distributor: user.school.distributor,
        listening: {level: "", weight: ""},
        grammar:   {level: "", weight: ""}, 
        reading:   {level: "", weight: ""}, 
        writing:   {level: "", weight: ""}, 
        speaking:  {level: "", weight: ""}, 
        testID: user.testID,
        testByAbility: [],
        finalGrade: "", 
        date: ""
    } 
    
    let grade = []
    let total = 0

    //get test by ability
    const results = await axios.get(apiURL() + "results/" + user.testID) 
    results.data.map((m) => {
        var level = m.questions[m.questions.length - 1].level
                    
        var finalGrade = {
            testType: m.testType,            
            grade: levelList.filter((f) => f.level === level)[0].grade,
            detail_results: m.results,
            questions: m.questions,
            createdAt: m.createdAt,
            level: level,
            average_weight: m.results.correct_count == 0 ? 0.00 : ( (m.results.correct_count / m.results.count) * 100.00 ).toFixed(2)
        }                                 
                
        switch(m.testType) {
            case "Listening":
                report.listening.level = finalGrade.level
                report.listening.weight = finalGrade.average_weight
                break;
            case "Grammar":
                report.grammar.level = finalGrade.level
                report.grammar.weight = finalGrade.average_weight
                break;

            case "Reading":
                report.reading.level = finalGrade.level
                report.reading.weight = finalGrade.average_weight
                break;
            case "Writing":
                report.writing.level = finalGrade.level
                report.writing.weight = finalGrade.average_weight
                break;
            case "Speaking":
                report.speaking.level = finalGrade.level
                report.speaking.weight = finalGrade.average_weight
            break;
            default:
                break
        }

        report.date = m.createdAt                    

        grade = grade.concat(finalGrade)
        total = total + finalGrade.grade
    })
    
    //final grade
    var finalgrade = Math.round(total / (grade.length + 1))           
    finalgrade = levelList.filter((f) => f.grade === finalgrade)[0].level

    report.finalGrade = finalgrade
    report.testByAbility = grade
    
    //save report
    await axios.post(apiURL() + "report/add", report)    

    //delete Test
    axios.delete(apiURL() + "test/" + user.testID)
         .then((res) => console.log(res.data))
}

const updateUserSession = (user) => {
    user.test_weight.positive = 0
    user.test_weight.negative = 0 
    user.test_weight.positive_count = 0
    user.test_weight.negative_count = 0

    setUserSession("userPT", JSON.stringify(user))
}

const getWeigthByAbility = (model) => {
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
