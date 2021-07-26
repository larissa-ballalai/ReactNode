const router = require('express').Router();
let Distributor = require('../models/distributor.model');


router.route('/middleware/get').get((req, res) => {
    Distributor.find()
               .sort({ name: "asc" })
               .then(distributor => res.json(distributor))
               .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/getCombo').get((req, res) => {
    Distributor.find({}, "_id name")
               .sort({ name: "asc" })
               .then(distributor => res.json(distributor))
               .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/getCombo/:id').get((req, res) => {
    Distributor.find({ _id: req.params.id }, "_id name")
               .sort({ name: "asc" })
               .then(distributor => res.json(distributor))
               .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/get/:id').get((req, res) => {
    Distributor
        .findById(req.params.id)        
        .populate('school')  
        .then(distributor => res.json(distributor))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/delete/:id').delete((req, res) => {
    Distributor.findByIdAndDelete(req.params.id)
        .then(() => res.json('Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/middleware/update/:id').post((req, res) => {

    Distributor.findById(req.params.id)
        .then(distributor => {
            distributor.name = req.body.name;
            distributor.contact = req.body.contact;
            distributor.email = req.body.email;
            distributor.phone = req.body.phone;
            distributor.address = req.body.address;
            distributor.country = req.body.country;
            distributor.role = req.body.role;
            distributor.date_contract = Date.parse(req.body.date_contract);
            distributor.logo = req.body.logo;
            distributor.school = req.body.school;
            
            distributor.save()
                .then(() => res.json('updated!'))
                .catch(err => res.status(400).json('Error 1: ' + err));               
        })
        .catch(err => res.status(400).json('Error 2: ' + err));
});

router.route('/middleware/add').post((req, res) => {    
    console.log('add dist' )

    const name = req.body.name;
    const contact = req.body.contact;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const country = req.body.country;
    const role = req.body.role;
    const date_contract = Date.parse(req.body.date_contract);
    const logo = req.body.logo;
    const school = req.body.school;

    const distributor = new Distributor({
        name,
        contact,        
        email,
        phone,
        address,
        country,
        role,
        date_contract, 
        logo,
        school
    });

    distributor.save()
               .then(() => res.json('added!'))
               .catch(err => {console.log(err); res.status(400).json('Error: ' + err)});
});


module.exports = router;
