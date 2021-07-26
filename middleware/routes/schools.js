const router = require('express').Router();
let School = require('../models/school.model');


router.route('/middleware/get').get((req, res) => {
    School.find({}, "_id name contact email phone importID")
          .sort({ name: "asc"})        
          .populate({ path: "distributor", select: "_id name"}) 
          .then(school => res.json(school))
          .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/getCombo').get((req, res) => {
    School.find({}, "_id name")
          .sort({ name: "asc"})
          .then(school => res.json(school))
          .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/getCombo/:id').get((req, res) => {
    School.find({ _id: req.params.id }, "_id name")
          .sort({ name: "asc"})
          .then(school => res.json(school))
          .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/getComboDistributor/:id').get((req, res) => {
    School.find({ distributor: req.params.id }, "_id name")
          .sort({ name: "asc"})
          .then(school => res.json(school))
          .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/get/:id').get((req, res) => {    
    School.findById(req.params.id)       
          .populate("distributor")   
          .then(school => { res.json(school)})
          .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/delete/:id').delete((req, res) => {
    School.findByIdAndDelete(req.params.id)
        .then(() => res.json('Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/update/:id').post((req, res) => {
    console.log(req.body)
    School.findById(req.params.id)
        .then(school => {
            school.name = req.body.name;
            school.contact = req.body.contact;
            school.email = req.body.email;
            school.phone = req.body.phone;
            school.address = req.body.address;
            school.country = req.body.country;
            school.role = req.body.role;
            school.distributor = req.body.distributor;
            school.id = req.body.id;
            school.importID = req.body.importID;
            school.logo = req.body.logo;

            school.save()
                  .then(() => res.json('updated!'))
                  .catch(err => { console.log(err); res.status(400).json('Error 1: ' + err) });               
        })
        .catch(err => res.status(400).json('Error 2: ' + err));
});

router.route('/middleware/add').post((req, res) => {
    School.findOne({ id: req.body.id })
          .then(school => {        
                if(school && req.body.importID != undefined) {
                    console.log('school already exists')
                    school.name = req.body.name                
                    school.distributor = req.body.distributor
                    school.id = req.body.id
                    school.active = true
                    school.importID = req.body.importID                
                    school.contact = req.body.contact;
                    school.email = req.body.email;
                    school.phone = req.body.phone;
                    school.address = req.body.address;
                    school.country = req.body.country;
                    school.role = req.body.role;
                    school.logo = req.body.logo;
                
                    school.save()
                          .then(() => res.json(school._id))
                          .catch(err => res.status(400).json('Error: ' + err))
                } 
                else {                    
                    console.log('new school')
                    const name = req.body.name                
                    const distributor = req.body.distributor
                    const id = req.body.id
                    const active = true
                    const importID = req.body.importID                
                    const contact = req.body.contact
                    const email = req.body.email
                    const phone = req.body.phone
                    const address = req.body.address
                    const country = req.body.country
                    const role = req.body.role
                    const logo = req.body.logo
                
                    const school = new School({
                        name, 
                        distributor, 
                        id, 
                        active, 
                        importID,
                        contact,
                        email,
                        phone,
                        address,
                        country,
                        role,
                        logo
                    })
                
                    school.save()
                        .then(() => res.json(school._id))
                        .catch(err => res.status(400).json('Error: ' + err))
                }      
        })   
});

module.exports = router;
