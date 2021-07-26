const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Question', new Schema({
    ptmodel: {type: String, required: true}, 
    name: {type: String, required: true},
    order: {type: Number, required: true},

    modelname: {type: String, required: true}, 
    level: {type: String, required: true}, 
    timer: {type: String, required: true},

    sentence: {type: String, required: true}, 
    sentence_type: {type: String, required: false}, 
    choices: {type: Array, required: true}, 
    grammar: {type:String, required: true},

    chuncks: {type: Array, required: true},
    background: {type: String, default: ""}
 }, {timestamps: true}));


