//Mongodb
var Card = require('../Models/Card')
var Account = require('../Models/Account')
var Device = require('../Models/Device')
var Group = require('../Models/Group')
var Project = require('../Models/Project')
var SeparateFloor = require('../Models/SeparateFloor')
var SeparateGroup = require('../Models/SeparateGroup')
var CardEventLog = require('../Models/CardEventLog')
var TimeZone = require('../Models/TimeZone')

let mongoose = require('mongoose')

var FindCardType = Object.freeze({"ID":1, "Serial":2, "IDPrintMarket":3, "All":4});
var FindAccountType = Object.freeze({"ID":1});
var FindDeviceType = Object.freeze({"ID":1,"DeviceID":2 });
var FindSeparateFloorType = Object.freeze({"ID":1,"DeviceID":2, "CardID":3 });

//Thêm Thẻ
exports.CreateCard = function(dt)
{
    dt.save(function (err) {
        if (err) return handleError(err);
        // saved!
      });
}
//Them Tai Khoan
exports.CreateAccount = function(dt)
{
    //if(dt == Account)
    dt.save(function (err) {
        if (err) return handleError(err);
        // saved!
      });
}
//Them Phan Tang
exports.CreateSeparateFloor = function(dt)
{
    //if(dt == Account)
    dt.save(function (err) {
        if (err) return handleError(err);
        // saved!
      });
}
//Them Thiet Bi
exports.CreateDevice = function(dt)
{
    //if(dt == Account)
    dt.save(function (err) {
        if (err) return console.log(err);
        // saved!
      });
}
//Timer
var id;
exports.intervalId = function(){
    id = setInterval(() => {
        console.log('Hello World' + id.toString("0"));
      }, 1000);
} 

exports.StopTimer = function(){
    clearInterval(id);
}

//Tìm Kiếm Thẻ
exports.FindCard = async function(KeyWord, FindType)
{
    res = new Card();
    switch (FindType) {
        case FindCardType.ID:
            res = await Card.find({
                _id: KeyWord // search query
            });
        break;
        case FindCardType.Serial:
            res = await Card.find({
                Serial: KeyWord // search query
            });
        break;
        case FindCardType.IDPrintMarket:
            res = await Card.find({
                IDPrintMarket: KeyWord // search query
            });
        break;
        case FindCardType.All:
            res = await Card.find();
        break;
        default:
            console.log("Default");
        break;
    }     
return res;

}
//Tìm Kiếm Tai Khoan
exports.FindAccount = async function(KeyWord, FindType)
{
    res = new Account();
    switch (FindType) {
        case FindAccountType.ID:
            res = await Account.find({
                _id: KeyWord // search query
            });
        break;
        default:
            console.log("Default");
        break;
    }     
return res;
}
//Tim kiem Thiet Bi
exports.FindDevice = async function(KeyWord, FindType)
{
    res = new Device();
    switch (FindType) {
        case FindDeviceType.ID:
            res = await Device.find({
                _id: KeyWord // search query
            });
        break;
        case FindDeviceType.DeviceID:
            res = await Device.find({
                IDBoard: KeyWord // search query
            });
        break;
        default:
            console.log("Default");
        break;
    }     
return res;
}
//Tim Kiem Phan Tang
exports.FindSeparateFloor = async function(KeyWord, FindType)
{
    res = new SeparateFloor();
    switch (FindType) {
        case FindSeparateFloorType.ID:
            res = await SeparateFloor.find({
                _id: KeyWord // search query
            });
        break;
        case FindSeparateFloorType.DeviceID:
            res = await SeparateFloor.find({
                DeviceID: KeyWord // search query
            });
        break;
        case FindSeparateFloorType.CardID:
            res = await SeparateFloor.find({
                CardID: KeyWord // search query
            });
        break;
        default:
            console.log("Default");
        break;
    }     
return res;
}
//Sua Thiet Bi
exports.UpdateDevice = async function(dt)
{
    Device.updateOne({DeviceID: "00000001353732343233471900390036"},{$set: {DeviceID: dt.DeviceID, ByPass1: dt.ByPass1, ByPass2: dt.ByPass2}}).then();
}
//Xóa Thẻ
exports.DeleteCard = function(dt)
{
    Card.deleteOne({Serial: dt}, function (err) {
        if (err) return handleError(err);
        // saved!
      });
}
//Xóa Tai Khoan
exports.DeleteAccount = function(dt)
{
    Account.deleteOne({ID: dt}, function (err) {
        if (err) return handleError(err);
        // saved!
      });
}

module.exports.FindCardType = FindCardType;
module.exports.FindDeviceType = FindDeviceType;
module.exports.FindSeparateType = FindSeparateFloorType;
