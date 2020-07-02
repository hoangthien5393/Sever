let mongoose = require('mongoose');

let DeviceSchema = new mongoose.Schema({
      IPKCZAddress : String,
      Name: String,
      SeparateFloor : Boolean,
      IDBoard : String,
      ByPass1 : String,
      ByPass2 : String,
      ByPass3 : String,
      ByPass4 : String,
      TimeOnRelay1 : Number,
      TimeOnRelay2 : Number,
      GroupName : String,
      LockFloor1 : String,
      LockFloor2 : String,
      LockFloor3 : String,
      LockFloor4 : String,
      StructureElevator : String,
      DateCreate : {type: String, default: "0001-01-01T00:00:00"},
      DateModified : {type: String, default: "0001-01-01T00:00:00"},
      ProjectName : String,
      ProjectID : String,
      Status : String,
      Note : String
    })


    const MongoDataDevice = mongoose.model('Device', DeviceSchema);
    var FindDeviceType = Object.freeze({"ID":1,"IDBoard":2, "ALL":3});

    class Device extends MongoDataDevice {

        constructor(IPKCZAddress, Name, SeparateFloor, IDBoard, ByPass1, ByPass2, ByPass3, ByPass4, 
            TimeOnRelay1, TimeOnRelay2, GroupName, LockFloor1, LockFloor2, LockFloor3, LockFloor4, 
            StructureElevator, DateCreate, DateModified, ProjectName, ProjectID, Status, Note) {
            super();
        this.IPKCZAddress = IPKCZAddress;
        this.Name = Name;
        this.SeparateFloor = SeparateFloor;
        this.IDBoard = IDBoard;
        this.ByPass1 = ByPass1;
        this.ByPass2 = ByPass2;
        this.ByPass3 = ByPass3;
        this.ByPass4 = ByPass4;
        this.TimeOnRelay1 = TimeOnRelay1;
        this.TimeOnRelay2 = TimeOnRelay2;
        this.GroupName = GroupName;
        this.LockFloor1 = LockFloor1;
        this.LockFloor2 = LockFloor2;
        this.LockFloor3 = LockFloor3;
        this.LockFloor4 = LockFloor4;
        this.StructureElevator = StructureElevator;
        this.DateCreate = DateCreate;
        this.DateModified = DateModified;
        this.ProjectName = ProjectName;
        this.ProjectID = ProjectID;
        this.Status = Status;
        this.Note = Note;
    
      }
    
      async save(data){
        var dataDevice = mongoose.model('Device', DeviceSchema);

        try {
            var contact = new dataDevice(data);
            var result = await contact.save();
            return result;
            
        } catch (error) {
            
        } 
       
      }
    
      async Find(KeyWord, FindType){
                var dataDevice = mongoose.model('Device', DeviceSchema);
                switch (FindType) {
                    case FindDeviceType.ID:
                        var res = await dataDevice.findOne({
                            _id: KeyWord // search query
                        }).lean();
                    break;
                    case FindDeviceType.IDBoard:
                        var res = await dataDevice.findOne({
                            IDBoard: KeyWord // search query
                        }).lean();
                    break;
                    case FindDeviceType.ALL:
                        var res = await dataDevice.find().lean();
                    break;
                    default:
                        console.log(FindType.toString());
                    break;
                }     
                return res;
      }
    
      async update(data)
      {
        var dataDevice = mongoose.model('Device', DeviceSchema);
        var contact = await dataDevice.findById(data._id).exec();
        contact.set(data);
        var res = await contact.save();
        return res;
      }

      async Delete(data)
      {
        var dataDevice = mongoose.model('Device', DeviceSchema);
        var res = await dataDevice.deleteOne({_id: data}, function (err) {
            if (err) return handleError(err);
            // saved!
          });
          return res;
      }
      
    
    }
    
   module.exports = Device;
   module.exports.FindDeviceType = FindDeviceType;
   //module.exports = mongoose.model('Device', DeviceSchema)
