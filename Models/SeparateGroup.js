let mongoose = require('mongoose')

let SeparateGroupSchema = new mongoose.Schema({
        DeviceName: String,
        IPKCZAddress: String,
        DeviceID: String,
        GroupName: String,
        GroupID: String,
        DateCreate: Date,
        DateModified: Date,      
        ProjectName: String,
        ProjectID: String,
        Status: String,
        Note: String
    })

module.exports = mongoose.model('SeparateGroup', SeparateGroupSchema)