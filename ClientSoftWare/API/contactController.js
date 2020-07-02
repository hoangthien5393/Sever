// contactController.js
// Import contact model
var Card = require('../../Models/Card')
var Device = require('../../Models/Device')
var Registered = require('../../Models/Registered')
var SeparateFloor = require('../../Models/SeparateFloor')
var CardEvent = require('../../Models/CardEventLog')
//
var mainRegister = new Registered();
var mainDevice = new Device();
var mainCard = new Card();
var mainSeparateFloor = new SeparateFloor();
var mainCardEvent = new CardEvent();
//
//
//
// Card
exports.CardView = async function (req, res) {
    try {
        var result = await mainCard.Find("", Card.FindCardType.All);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.CardUpdate = async function (req, res) {
    try {
        var result = await mainCard.update(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }       
};
// Handle create contact actions
exports.CardNew = async function (req, res) {
    try {
        if(req.params.id == "normal")
        {
           await mainCard.save(req.body);
           res.send("Success");
        }
        else if(req.params.id == "list")
        {

            await mainCard.save(req.body);
            // await req.body.forEach(element => {
            //      mainSeparateFloor.save(element);
           //});
           //await mainSeparateFloor.save(req.body);
           res.send("Success");
        }
    } catch (error) {
        res.status(500).send(error);
    } 
};

exports.CardDelete = async function (req, res) {
    try {
        var id = req.params.id;
        var result = await mainCard.Delete(id);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};
//
//
//
//
//Device
exports.DeviceView = async function (req, res) {
    try {
        var result = await mainDevice.Find("", Device.FindDeviceType.ALL);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.DeviceUpdate = async function (req, res) {
    try {
        var result = await mainDevice.update(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }       
};
// Handle create contact actions
exports.DeviceNew = async function (req, res) {
    try {
        var result = await mainDevice.save(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    } 
};

exports.DeviceDelete = async function (req, res) {
    try {
        var id = req.params.id;
        var result = await mainDevice.Delete(id);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};
//
//
//
// Register
exports.RegisterView = async function (req, res) {
    try {
        var result = await mainRegister.Find("", Registered.FindType.All);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.RegisterUpdate = async function (req, res) {
    try {
        var result = await mainRegister.update(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }       
};
// Handle create contact actions
exports.RegisterNew = async function (req, res) {
    try {
        var result = await mainRegister.save(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    } 
};

exports.RegisterDelete = async function (req, res) {
    try {
        var id = req.params.id;
        var result = await mainRegister.Delete(id);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};
//
//
//
//SeparateFloor
exports.SeparateView = async function (req, res) {
    try {
        var id = req.params.id;
        var DeviceId = req.params.DeviceID;
        var result = await mainSeparateFloor.Find(id,res, SeparateFloor.FindType.All, DeviceId);
        //res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.SeparateUpdate = async function (req, res) {
    try {
        var DeviceId = req.params.DeviceID;
        var result = await mainSeparateFloor.Delete(req.body, DeviceId);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }       
};
// Handle create contact actions
exports.SeparateNew = async function (req, res) {
    try {
        var DeviceId = req.params.DeviceID;
        if(req.params.id == "normal")
        {
           await mainSeparateFloor.save(req.body, DeviceId);
           res.send("Success");
        }
        else if(req.params.id == "list")
        {
            await mainSeparateFloor.save(req.body, DeviceId);
           res.send("Success");
        }
       
    } catch (error) {
        res.status(500).send(error);
    } 
};

exports.SeparateDelete = async function (req, res) {
    try {
        var id = req.params.id;
        var DeviceId = req.params.DeviceID;
        var result = await mainSeparateFloor.Delete(id, DeviceId);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};
//
//
//
//
//CardEvent
exports.CardEventView = async function (req, res) {
    try {
        var result = await mainCardEvent.Find("", req.body.DateCreate, req.body.DateModified, CardEvent.FindCardType.DateTimeEvent);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.CardEventUpdate = async function (req, res) {
    try {
        var result = await mainCardEvent.update(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }       
};
// Handle create contact actions
exports.CardEventNew = async function (req, res) {
    try {
        var result = await mainCardEvent.save(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    } 
};

exports.CardEventDelete = async function (req, res) {
    try {
        var id = req.params.id;
        var result = await mainCardEvent.Delete(id);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};