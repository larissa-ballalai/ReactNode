const router = require('express').Router();
let Import = require('../models/import.model');

router.route('/').get((req, res) => {
    Import.find()
        .then(imports => res.json(imports))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Import.findById(req.params.id)
        .then(imports => res.json(imports))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/integration/add').post((req, res) => {
    const distributor = req.body.distributor
    const information = req.body.information
    const date = req.body.date
    const status = req.body.status

    const imports = new Import({
        distributor,
        information,
        date,
        status,
    });

    imports.save()
        .then(() => { res.json(imports._id); })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
