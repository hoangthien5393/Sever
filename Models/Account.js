let mongoose = require('mongoose')

let AccountSchema = new mongoose.Schema({
        UserName: String,
        Password: String,
        Role: String,
        AccountName: String,
        MobilePhone: String,
        Email: String,
        Address: String,
        DateCreate: Date,
        DateModified: Date,
        Enable: Boolean,
        ProjectName: String,
        ProjectID: String,
        Status: String,
        Note: String
    })

module.exports = mongoose.model('Account', AccountSchema)
