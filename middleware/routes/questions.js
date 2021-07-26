const router = require('express').Router();
let Question = require('../models/question.model');

router.route('/').get((req, res) => {
    Question.find({}, "_id name ptmodel modelname level order")
            .then(questions => res.json(questions))
            .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Question.findById(req.params.id)
        .then(question => res.json(question))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getByTestType/:id').get((req, res) => {    
    if(req.params.id === "Grammar-A") {
        Question.find({'modelname': req.params.id}, "_id order level modelname", {sort: { order : 'asc', level: "asc" }})
                .then(question => { res.json({question}) })
                .catch(err => res.status(400).json('Error: ' + err));
    }
    else {
        Question.find({ $or:[{'modelname': req.params.id + '-A'}, {'modelname': req.params.id + '-B'}]}, "_id order level modelname", {sort: { order : 'asc', level: "asc" }})
                .then(question => res.json(question))
                .catch(err => res.status(400).json('Error: ' + err));
    }     
});

router.route('/getSummaryQuestions/:id').get((req, res) => {    
    Question.find().select(" _id ptmodel modelname name order level ")
            .sort({ptmodel: 'asc', modelname: 'asc', level: "asc",  order : 'asc', name: 'asc'})
            .then(question => { res.json({question}) })
            .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Question.findByIdAndDelete(req.params.id)
        .then(() => res.json('Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Question.findById(req.params.id)
        .then(question => {
            question.ptmodel = req.body.ptmodel;
            question.name = req.body.name;
            question.order = Number(req.body.order);
            question.modelname = req.body.modelname;
            question.level = req.body.level;
            question.timer = req.body.timer;
            question.sentence_type = req.body.sentence_type;
            question.sentence = req.body.sentence;
            question.choices = req.body.choices;
            question.grammar = req.body.grammar;
            question.chuncks = req.body.chuncks;
            question.background = req.body.background;

            question.save()
                .then(() => res.json('updated!'))
                .catch(err => res.status(400).json('Error 1: ' + err));               
        })
        .catch(err => res.status(400).json('Error 2: ' + err));
});

 router.route('/add').post((req, res) => {
    
    const ptmodel = req.body.ptmodel;
    const name = req.body.name;
    const order = Number(req.body.order);
    const modelname = req.body.modelname;
    const level = req.body.level;
    const timer = req.body.timer;
    const sentence_type = req.body.sentence_type;
    const sentence = req.body.sentence;
    const choices = req.body.choices;
    const grammar = req.body.grammar;
    const chuncks = req.body.chuncks;
    const background = req.body.background;

    const question = new Question({
        ptmodel ,
        name,
        order,
        modelname,
        level,
        timer,
        sentence,
        sentence_type,
        choices,
        grammar,
        chuncks,
        background
    });

    question.save()
    .then(() => res.json('added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
