let mongoose = require('mongoose')

let GroupSchema = new mongoose.Schema({
        Name: String,
        ParentGroupName: String,
        ParentGroupID: String,
        Enable: Boolean,
        DateCreate: Date,
        DateModified: Date,      
        ProjectName: String,
        ProjectID: String,
        Status: String,
        Note: String
    })

module.exports = mongoose.model('Group', GroupSchema)