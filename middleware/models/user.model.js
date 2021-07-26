const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    name: {type: String, required: true},
    //school: {type: String}, 
    level: {type: String, default: ""}, 
    email: {type: String, default: ""},
    password: {type: String, default: ""},
    distributor: {type: mongoose.Schema.Types.ObjectId, ref: "Distributor", default: ""},
    school: {type: mongoose.Schema.Types.ObjectId, ref: "School", default: ""},
    classroom: {type: mongoose.Schema.Types.ObjectId, ref: "Classroom", default: ""},
    login: {type: String, default: ""},
    id: {type:String, default: ""},
    profile: {type: String, default: ""},
    active: {type: Boolean, default: true},
    importID: {type: mongoose.Schema.Types.ObjectId, ref: "Import", default: ""},
    block: {type: Boolean, default: false}
}, {timestamps: true}));