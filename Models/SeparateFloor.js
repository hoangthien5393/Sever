let mongoose = require('mongoose')
var Device = require('./Device');
const { db } = require('./Device');
//
var mainDevice = new Device();

let SeparateFloorSchema = new mongoose.Schema({
        DeviceID: String,
        IDBoard: String,
        IPKCZAddress: String,
        CardID: String,
        SerialCard: String,
        SeparateFL1: String,
        SeparateFL2: String,
        SeparateFL3: String,
        SeparateFL4: String,
        DateCreate: {type: String, default: "0001-01-01T00:00:00"},
        DateModified: {type: String, default: "0001-01-01T00:00:00"},
        ProjectName: String,
        ProjectID: String,
        Status: String,
        Note: String
    })


    var FindType = Object.freeze({"ID":1, "DeviceID":2, "IDBoard":3, "SerialCard":4, "SerialAndIDBoard":5, "All":6});

    const MongoDataSeparateFloor = mongoose.model('SeparateFloor', SeparateFloorSchema);

    class SeparateFloor extends MongoDataSeparateFloor {

        constructor(DeviceID, IDBoard, IPKCZAddress, CardID, SerialCard, SeparateFL1, SeparateFL2, SeparateFL3, SeparateFL4, DateCreate, DateModified, ProjectName, ProjectID, Status, Note) {
            super();
        this.DeviceID = DeviceID;
        this.IDBoard = IDBoard;
        this.IPKCZAddress = IPKCZAddress;
        this.CardID = CardID;
        this.SerialCard = SerialCard;
        this.SeparateFL1 = SeparateFL1;
        this.SeparateFL2 = SeparateFL2;
        this.SeparateFL3 = SeparateFL3;
        this.SeparateFL4 = SeparateFL4;
        this.DateCreate = DateCreate;
        this.DateModified = DateModified;
        this.ProjectName = ProjectName;
        this.ProjectID = ProjectID;
        this.Status = Status;
        this.Note = Note;
      }
    
     async save(data, DeviceID){
        var dataSeparateFloor = mongoose.model('SeparateFloor' + DeviceID, SeparateFloorSchema);

        await dataSeparateFloor.collection.insertMany(data, function (err) {
            if (err) {
              console.log(err);
            };
            //console.log(laptop);
          });
       
      }
    
      async Find(KeyWord1, KeyWord2, FindDataType, DeviceID){
      
            var dataSeparateFloor = mongoose.model('SeparateFloor' + DeviceID, SeparateFloorSchema);
                switch (FindDataType) {
                    case FindType.ID:
                        var res = await dataSeparateFloor.findOne({
                            _id: KeyWord1 // search query
                        }).lean();
                    break;
                    case FindType.DeviceID:
                        var res = await dataSeparateFloor.findOne({
                            DeviceID: KeyWord1 // search query
                        }).lean();
                    break;
                    case FindType.IDBoard:
                        var res = await dataSeparateFloor.findOne({
                            IDBoard: KeyWord1 // search query
                        }).lean();
                    break;
                    case FindType.SerialCard:
                        var res = await dataSeparateFloor.findOne({
                            SerialCard: KeyWord1 // search query
                        }).lean();
                    break;
                    case FindType.SerialAndIDBoard:
                        var res = await dataSeparateFloor.findOne({
                           SerialCard: KeyWord1,
                           IDBoard: KeyWord2
                        }).lean();
                    break;
                    case FindType.All:
                        // if(KeyWord1 == "0")
                        // {
                        //     var res = await dataSeparateFloor.find().limit(1000);
                        // }
                        // else
                        // {
                        //     var res = await dataSeparateFloor.find({
                        //         _id: {$gt : KeyWord1}
     
                        //      }).limit(2000);
                        // }
                       
                        //var res = await dataSeparateFloor.find().lean();
                        var res = await dataSeparateFloor.find().lean();
                        KeyWord2.send(res);

                    break;
                    default:
                        console.log("Default");
                    break;
                }     
                return res;
      }
    
      async update(data, DeviceID)
      {
        var dataSeparateFloor = mongoose.model('SeparateFloor' + DeviceID, SeparateFloorSchema);
        var contact = await dataSeparateFloor.findById(data._id).exec();
        contact.set(data);
        var res = await contact.save();
        return res;
      }

      async Delete(data, DeviceID)
      {
        var dataSeparateFloor = mongoose.model('SeparateFloor' + DeviceID, SeparateFloorSchema);
        var res = await dataSeparateFloor.deleteMany({_id: data}, function (err) {
            if (err) return handleError(err);
            // saved!
          });
          return res;
      }

    
    }
    
   module.exports = SeparateFloor;
   module.exports.FindType = FindType;