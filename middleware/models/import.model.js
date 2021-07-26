const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Import', new Schema({
    distributor: {type: mongoose.Schema.Types.ObjectId, ref: "Distributor"},
    information: {type: Object},
    date: {type: Date},
    status: {type: String}
 }, {timestamps: true}));