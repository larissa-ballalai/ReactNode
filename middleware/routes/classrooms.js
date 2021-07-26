const router = require('express').Router();
let Classroom = require('../models/classroom.model');

router.route('/middleware/get').get((req, res) => {
    Classroom.find({}, "_id name year")
             .sort({name: "asc", year: "asc"})
             .populate({ path: "school", select: "_id name distributor" })
             .then(classroom => res.json(classroom))
             .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/getBySchool/:id').get((req, res) => {
    Classroom.find({ school: req.params.id }, "_id name year")
        .sort({name: "asc"})
        .populate({ path: "school", select: "_id name distributor" })
        .populate({ path: "users", select: "_id name" })
        .then(classroom => res.json(classroom))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/getByCoach').post((req, res) => {    

    Classroom.find({ school: req.body.school }, '_id name year')
             .sort({name: "asc"})
             .populate({ path: "school", select: "_id name distributor" })
             .populate({ path: "users", match: { _id: req.body.user }, select: "_id name profile"})
             .then(classroom => {  
                 var classroomFiltered = []
                 console.log(classroom)
                 for(var i=0; i < classroom.length; i++) {
                    if(classroom[i].users.length > 0)
                        classroomFiltered = classroomFiltered.concat(classroom[i])
                 }
                 res.json(classroomFiltered)
             })
             .catch(err => res.status(400).json('Error: ' + err));    
});

router.route('/middleware/getCombo').post((req, res) => {

    if(req.body.user.profile !== "ADMIN" ) {
       Classroom.find({ school: req.body.user.school._id }, '_id name school')
                .sort({ name: "asc" })
                .populate({ path: "users", match: { profile: "STUDENT" }, select: "_id name" })
                .then(classroom => { res.json(classroom) })
                .catch(err => res.status(400).json('Error: ' + err));
    }  
    else {
        Classroom.find({}, '_id name school')
                 .sort({ name: "asc" })
                 .populate({ path: "users", match: { profile: "STUDENT" }, select: "_id name" })
                 .then(classroom => { res.json(classroom) })
                 .catch(err => res.status(400).json('Error: ' + err));
    }
});    

router.route('/middleware/get/:id').get((req, res) => {
    Classroom.findById(req.params.id)
        .populate({ path: "users", select: "_id name profile" })
        .populate({ path: "school", select: "_id name distributor" })
        .then(classroom => res.json(classroom))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/add').post((req, res) => {
    Classroom.findOne({ id: req.body.id })
             .then(classroom => {

                  if(classroom && req.body.importID != undefined) {  
                        console.log('classroom already exists')
                        classroom.name = req.body.name 
                        classroom.period = req.body.period
                        classroom.school = req.body.school
                        classroom.users = req.body.users
                        classroom.year = req.body.year
                        classroom.id = req.body.id
                        classroom.active = true
                        classroom.importID = req.body.importID

                        classroom.save()
                                 .then(() => res.json(classroom._id))
                                 .catch(err => console.log(err));
                  } else {
                        console.log('new classroom')
                        const name = req.body.name
                        const period = req.body.period
                        const school = req.body.school
                        const users = req.body.users
                        const year = req.body.year
                        const id = req.body.id
                        const active = true
                        const importID = req.body.importID
                    
                        const classroom = new Classroom({
                            name,
                            period,
                            school,        
                            users,
                            year,
                            id, active, importID
                        });
                    
                        classroom.save()
                                 .then(() => res.json(classroom._id))
                                 .catch(err => res.status(400).json('Error: ' + err));
                    }
              })    
});

router.route('/middleware/update/:id').post((req, res) => {
    Classroom.findById(req.params.id)
        .then(classroom => {
            classroom.name = req.body.name;
            classroom.period = req.body.period;
            classroom.school = req.body.school;
            classroom.users = req.body.users;
            classroom.year = req.body.year;
            classroom.id = req.body.id;
            classroom.active = req.body.active;
            classroom.importID = req.body.importID

            classroom.save()
                     .then(() => res.json('updated!'))
                     .catch(err => res.status(400).json('Error 1: ' + err));               
        })
        .catch(err => res.status(400).json('Error 2: ' + err));
});

router.route('/middleware/delete/:id').delete((req, res) => {
    Classroom.findByIdAndDelete(req.params.id)
        .then(() => res.json('Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
