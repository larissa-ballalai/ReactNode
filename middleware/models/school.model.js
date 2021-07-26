const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('School', new Schema({
    name: {type: String, required: true},
    contact: {type: String, default: ""}, 
    email: {type: String, default: ""},
    phone: {type: String, default: ""},
    address: {type: String, default: ""},
    country: {type: String, default: ""},
    role: {type: String, default: ""},
    logo: {type: String, default: ""},
    distributor: {type: mongoose.Schema.Types.ObjectId, ref: "Distributor", default: ""},
    id: {type: String, default: ""},
    active: {type: Boolean, default: true},
    importID: {type: mongoose.Schema.Types.ObjectId, ref: "Import", default: ""},
 }, {timestamps: true}));