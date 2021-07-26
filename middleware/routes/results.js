const router = require('express').Router();
let Result = require('../models/result.model');

router.route('/').get((req, res) => {
    Result.find()
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Result.find().where('testID').equals(req.params.id)
          .then(result => res.json(result))
          .catch(err => res.status(400).json('Error: ' + err));
})

 router.route('/add').post((req, res) => {

    const userid = req.body.userid;
    const questions = req.body.questions;  
    const testID =  req.body.testID;
    const testType = req.body.testType;
    const results = req.body.results;

    const result = new Result({
        userid,
        questions,
        testID,
        testType,
        results
    });

    result.save()
    .then(() => res.json('added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Result.findByIdAndDelete(req.params.id)
        .then(() => res.json('Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
