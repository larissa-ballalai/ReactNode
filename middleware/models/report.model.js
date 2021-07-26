const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Report', new Schema({
    name: {type: String},
    user:  {type: mongoose.Schema.Types.ObjectId, ref: "User", default: ""},
    school: {type: mongoose.Schema.Types.ObjectId, ref: "School", default: ""}, 
    classroom: {type: mongoose.Schema.Types.ObjectId, ref: "Classroom", default: ""}, 
    distributor: {type: mongoose.Schema.Types.ObjectId, ref: "Distributor", default: ""},

    listening: {type: Object},
    grammar: {type: Object},
    reading: {type: Object},
    writing: {type: Object},
    speaking: {type: Object},

    testID: {type: String, unique: true},
    testByAbility: {type: Object},
    finalGrade: {type: String},
    date: {type: Date}
 }, {timestamps: true}));

