const router = require('express').Router();
let Report = require('../models/report.model');
let UserReport = require('../models/user.model');

router.route('/').get((req, res) => {
    Report.find()
        .populate("user")
        .populate("classroom")
        .populate("school")
        .populate("distributor")
        .then(report => res.json(report))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/getReportProfile').post((req, res) => {           
    if(req.body.user.profile === "SCHOOL_ADMIN" ) {
        Report.find({ school: req.body.user.school._id } , " _id finalGrade listening grammar reading writing speaking testID date name")  
              .populate({ path: "classroom", select: "_id name" }) 
              .populate({ path: "school", select: "_id name" })
              .populate({ path: "user", select: "_id name" })
              .sort({ name: "asc" })
              .then(report => { res.json(report)})
              .catch(err => res.status(400).json('Error: ' + err));
    }
    else if(req.body.user.profile === "COACH") {
        Report.find({ school: req.body.user.school._id } , " _id finalGrade listening grammar reading writing speaking testID date name")  
              .populate({ path: "classroom", select: "_id name", populate: { path: "users", match: { _id: req.body.user._id }, select: "_id name" } }) 
              .populate({ path: "school", select: "_id name" })
              .populate({ path: "user", select: "_id name" })
              .sort({ name: "asc" })
              .then(report => { 
                    var reportCoach = []
                    for(var i=0; i < report.length; i++) {
                        if(report[i].classroom.users.length > 0)
                            reportCoach = reportCoach.concat(report[i])
                    }
                    
                    res.json(reportCoach)
                })
              .catch(err => res.status(400).json('Error: ' + err));     
    }
    else {
        Report.find() 
              .select(" _id finalGrade listening grammar reading writing speaking testID date name")                            
              .populate({ path: "classroom", select: "_id name" })            
              .populate({ path: "school", select: "_id name" })
              .populate({ path: "user", select: "_id name" })    
              .sort({ name: "asc" })      
              .then(report => { res.json(report)})
              .catch(err => res.status(400).json('Error: ' + err));
    }
})

router.route('/getReportDetail/:id').get((req, res) => {    
    Report.find({testID: req.params.id}, "_id testByAbility testID")  
          .then(test => { res.json({test}) })
          .catch(err => res.status(400).json('Error: ' + err));

})

router.route('/getReportByUser/:id').get((req, res) => {    
    Report.find({user: req.params.id})  
          .then(test => { res.json({test}) })
          .catch(err => res.status(400).json('Error: ' + err));

})

router.route('/:id').get((req, res) => {
    Report.find().where('testID').equals(req.params.id)
          .then(report => res.json(report))
          .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {

    const name = req.body.name
    const user = req.body.user
    const classroom = req.body.classroom
    const school = req.body.school
    const distributor = req.body.distributor
    const listening = req.body.listening
    const grammar = req.body.grammar
    const reading = req.body.reading
    const writing = req.body.writing
    const speaking = req.body.speaking
    const testID = req.body.testID
    const testByAbility = req.body.testByAbility
    const finalGrade = req.body.finalGrade
    const date = req.body.date  
   
    const report = new Report({
          name,
          user,
          classroom,
          school,          
          distributor,          
          listening,
          grammar,
          reading,
          writing,
          speaking,
          testID,
          testByAbility,
          finalGrade,
          date
    });

    report.save()
          .then(() => res.json('added!'))
          .catch(err => res.status(400).json('Error: ' + err));


    UserReport.findById(user)
        .then(users => {            
            users.name = users.name
            users.school = users.school
            users.level = users.level
            users.email = users.email
            users.password = users.password
            users.distributor = users.distributor
            users.classroom  = users.classroom
            users.login  = users.login
            users.profile  = users.profile
            users.active = users.active
            users.importID = users.importID
            users.id = users.id
            users.schoolID = users.schoolID
            
            users.block = true
            users.save()
                 .then(res => console.log(res))            
        })
        .catch(err => console.log(err));
});

router.route('/:id').get((req, res) => {
    Report.findById(req.params.id)
        .then(report => res.json(report))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
