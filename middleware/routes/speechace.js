
const router = require('express').Router();
const axios = require('axios');
const FormData = require('form-data');

var multer = require("multer")

var storage = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, 'files')
    },
    filename: function (req, file, cb) {        
        cb(null, Date.now() + '-' + file.originalname )
    }
})

var upload = multer({ storage: storage }).single('file')

router.route('/upload').post((req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
    
        res.status(200).send(req.file)
    })    
});

var fs = require('fs');

router.route('/speechrecognition').post(async (req, res) => {    

    var url = "https://api.speechace.co/api/scoring/text/v0.5/json?"
    var key = "lpQ4RscdMcqRvuzMdjvoTiQxOVkffB0Gl86UdYNEDkP2o2%2B%2Ffs36bbP%2Beab8LUn571RfJFEk23isouySDFn4wHDWaLNSB%2B1At8aYsTxy9J4nhDTDzNaDusxr92OPFVEn​"
    var dialect = "en-us"
    var user_id = "123-123-123"    

    var filepath = "files/" + req.body.file        
    var file = fs.createReadStream(filepath)
                
    const form = new FormData()
    form.append('text', req.body.answer)
    form.append('user_audio_file', file) 
    form.append('question_info', 'u1p1') 

    const querystring = require('querystring')
    var params = querystring.stringify({ key: key, dialect: dialect, user_id: user_id });
    
    try {
        const token = await axios.post(url + params, form, { headers: form.getHeaders() });        
        console.log(token.data)
        res.status(200).send({ exchange_data: token.data })
    } catch(error) {
        console.log(error);
        res.status(500).send(error.message);
    } 
});

module.exports = router;

