const router = require('express').Router();
let Test = require('../models/test.model');

router.route('/').get((req, res) => {
    Test.find()
        .then(test => res.json(test))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Test.findById(req.params.id)
        .then(test => res.json(test))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/user/:userid').get((req, res) => {    
    Test.find().where('userid').equals(req.params.userid)    
        .then(test => res.json(test))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Test.findByIdAndDelete(req.params.id)
        .then(() => res.json('Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateQuestion/:id').post((req, res) => {    
    Test.findOneAndUpdate( { _id: req.params.id, 'questions.id': req.body.question.id }, { $set: { 'questions.$' : req.body.question }})
        .then(test => {
            res.json('updated!')  
        })
        .catch(err => res.status(400).json('Error 2: ' + err));
});

router.route('/getQuestion/:id').post((req, res) => {    
    Test.findOne({_id: req.params.id}, {'questions': {$elemMatch: {id: req.body.question_position}}})
        .then(question => {
            console.log(question)
            res.json(question)
        })
        .catch(err => res.status(400).json('Error 2: ' + err));
});

router.route('/getOrder/:id').post((req, res) => {    
    Test.findOne({_id: req.params.id}, {'questions': {$elemMatch: {order: req.body.order}}})
        .then(question => {
            console.log(question)
            res.json(question)
        })
        .catch(err => res.status(400).json('Error 2: ' + err));
});

router.route('/getTest/:id').get((req, res) => {
    Test.find({_id: req.params.id})
        .then(test => { 
            var questions = test[0].questions
            test[0].questions = questions.filter(f => f.status == "done" || f.status == "started")
            res.json(test);       
        })
        .catch(err => res.status(400).json('Error: ' + err));    
});

router.route('/update/:id').post((req, res) => {
    Test.findById(req.params.id)
        .then(test => {
            test.userid = req.body.userid;
            test.questions = req.body.questions;

            test.save()
                .then(() => res.json('updated!'))
                .catch(err => res.status(400).json('Error 1: ' + err));               
        })
        .catch(err => res.status(400).json('Error 2: ' + err));
});

 router.route('/add').post((req, res) => {

    const userid = req.body.userid;
    const questions = req.body.questions;   

    const test = new Test({
        userid,
        questions
    });

    test.save()
        .then(() => { console.log(test._id);  res.json(test._id); })
        .catch(err => {console.log(err); res.status(400).json('Error: ' + err)});
});

module.exports = router;
