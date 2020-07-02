let mongoose = require('mongoose')

let TimeZoneSchema = new mongoose.Schema({
        TimeStart: Date,
        TimeEnd: Date,
        NumberOFWeek: String,
        DeviceName: String,
        IPKCZAddress: String,
        DeviceID: String,
        GroupName: String,
        GroupID: String,
        ByPass1: String,
        ByPass2: String,
        ByPass3: String,
        ByPass4: String,
        DateCreate: Date,
        DateModified: Date,      
        ProjectName: String,
        ProjectID: String,
        Status: String,
        Note: String
    })

module.exports = mongoose.model('TimeZone', TimeZoneSchema)