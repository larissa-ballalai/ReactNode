const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Result', new Schema({
    userid: {type: String, required: true},
    questions: {type: Array, required: true},
    testID: {type: String, required: true},
    testType: {type: String, required: true},
    results: {type: Object, required: true},
    user: {type: Object}
 }, {timestamps: true}));