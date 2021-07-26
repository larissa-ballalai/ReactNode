const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Classroom', new Schema({
    name: {type: String, required: true},
    period: {type: String},
    school: {type: mongoose.Schema.Types.ObjectId, ref: "School"},     
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    year: {type: String},    
    id: {type: String},
    active: {type: Boolean},
    importID: {type: mongoose.Schema.Types.ObjectId, ref: "Import"},
 }));