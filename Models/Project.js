let mongoose = require('mongoose')

let ProjectSchema = new mongoose.Schema({
        Code: String,
        Name: String,
        Address: String,
        Enable: Boolean,
        DateCreate: Date,
        DateModified: Date,             
        Status: String,
        Note: String
    })

module.exports = mongoose.model('Project', ProjectSchema)