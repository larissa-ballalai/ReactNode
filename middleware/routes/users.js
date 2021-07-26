const router = require('express').Router();
let User = require('../models/user.model');


router.route('/middleware/get').get((req, res) => {        
    User.find({}, "_id name login email profile importID") 
        .populate({ path: "school", select: "_id name" })
        .populate({ path: "distributor", select: "_id name" })
        .sort({ name: "asc"})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/middleware/getBySchool/:id').get((req, res) => {
    User.find({ school: req.params.id }, "_id name profile")
        .sort({ name: "asc"})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/getByDistributor/:id').get((req, res) => {
    User.find({ distributor: req.params.id }, "_id name profile")
        .sort({ name: "asc"})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/getbyprofile').post((req, res) => {
    User.find({ profile: req.body.profile })
        .populate({ path: "school", select: "_id name" })
        .populate({ path: "distributor", select: "_id name" })
        .sort({ name: "asc"})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/getconexia').post((req, res) => {        
    User.findOne({ id: req.body.id })
        .populate({ path: "school", select: "_id name" })
        .populate({ path: "distributor", select: "_id name" })
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/getlogin').post((req, res) => {
    User.findOne({ login: req.body.login , password: req.body.password})
        .populate({ path: "school", select: "_id name" })
        .populate({ path: "distributor", select: "_id name" })
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/get/:id').get((req, res) => {
    User.findById(req.params.id)
        .populate({ path: "school", select: "_id name" })
        .populate({ path: "distributor", select: "_id name" })
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/update/:id').post((req, res) => {
    
    User.findById(req.params.id)
        .then(user => {
            user.name = req.body.name
            user.school = req.body.school
            user.level = req.body.level
            user.email = req.body.email
            user.password = req.body.password
            user.distributor = req.body.distributor
            user.classroom  = req.body.classroom
            user.login  = req.body.login
            user.profile  = req.body.profile
            user.active = req.body.active
            user.importID = req.body.importID
            user.id = req.body.id
            user.schoolID = req.body.schoolID
            user.block = req.body.block

            user.save()
                .then(() => res.json('updated!'))
                .catch(err => {console.log(err); res.status(400).json('Error 1: ' + err)});               
        })
        .catch(err => res.status(400).json('Error 2: ' + err));
});

router.route('/middleware/add').post((req, res) => { 
    console.log("chegou aqui")       
    User.findOne({ id: req.body.id })
        .then(user => {
            if(user && req.body.importID != undefined) {   
                user.name = req.body.name
                user.school = req.body.school
                user.level = req.body.level
                user.email = req.body.email
                user.password = req.body.password
                user.distributor = req.body.distributor
                user.classroom = req.body.classroom
                user.login = req.body.login
                user.profile = req.body.profile
                user.active = true
                user.importID = req.body.importID
                user.id = req.body.id
                user.block = false

                user.save()
                    .then(() => res.json(user._id))
                    .catch(err => res.status(400).json('Error: ' + err));
            } 
            else {
                const name = req.body.name
                const school = req.body.school
                const level = req.body.level
                const email = req.body.email
                const password = req.body.password
                const distributor = req.body.distributor
                const classroom = req.body.classroom
                const login = req.body.login
                const profile = req.body.profile
                const active = true
                const importID = req.body.importID
                const id = req.body.id
                //const block = req.body.block
                
                const user = new User({
                        name,
                        school,        
                        level,
                        email,
                        password,
                        distributor,
                        classroom,
                        login,
                        profile,                           
                        id, active, importID,
                        //block
                });

                user.save()
                    .then(() => res.json(user._id))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        })    
});

router.route('/middleware/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
