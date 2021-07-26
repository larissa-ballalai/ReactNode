const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('Test', new Schema({
    userid: {type: String, required: true},
    questions: {type: Array, required: true}
}, {timestamps: true}));