const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Distributor', new Schema({
    name: {type: String, required: true},
    contact: {type: String, default: ""}, 
    email: {type: String, default: ""},
    phone: {type: String, default: ""},
    address: {type: String, default: ""},
    country: {type: String, default: ""},
    role: {type: String, default: ""},
    date_contract: {type: Date},
    logo: {type: String, default: ""},
    school: {type: mongoose.Schema.Types.ObjectId, ref: "School", default: ""}
 }, {timestamps: true}));