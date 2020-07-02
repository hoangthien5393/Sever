let mongoose = require('mongoose');

var FindCardType = Object.freeze({"ID":1, "Serial":2, "IDPrintMarket":3, "All":4, "DateTimeEvent": 5});

let CardEventLogSchema = new mongoose.Schema({
        Serial: String,
        IDPrintMarket: String,
        CardID: String,
        CustomerName: String,
        CustomerAddress: String,
        DeviceName: String,
        DeviceID: String,
        GroupName: String,
        GroupID: String,
        DateTimeEvent: {type: String, default: "0001-01-01T00:00:00"},
        DateTimeSS: Date,
        Content: String,
        DateCreate: {type: String, default: "0001-01-01T00:00:00"},
        DateModified: {type: String, default: "0001-01-01T00:00:00"},  
        ProjectName: String,
        ProjectID: String,
        Status: String,
        Note: String
    });

    const MongoDataCardEvent = mongoose.model('CardEventLog', CardEventLogSchema);

    class CardEventLog extends MongoDataCardEvent {

        constructor(Serial, IDPrintMarket, CardID, CustomerName, CustomerAddress, DeviceID, DeviceName, GroupName, GroupID, DateTimeEvent, DateTimeSS, Content, DateCreate, DateModified, ProjectName, ProjectID, Status, Note) {
            super();
        this.Serial = Serial;
        this.IDPrintMarket = IDPrintMarket;
        this.CardID = CardID;
        this.CustomerName = CustomerName;
        this.CustomerAddress = CustomerAddress;
        this.DeviceID = DeviceID;
        this.DeviceName = DeviceName;
        this.GroupName = GroupName;
        this.GroupID = GroupID;
        this.DateTimeEvent = DateTimeEvent;
        this.DateTimeSS = DateTimeSS;
        this.Content = Content;
        this.DateCreate = DateCreate;
        this.DateModified = DateModified;
        this.ProjectName = ProjectName;
        this.ProjectID = ProjectID;
        this.Status = Status;
        this.Note = Note;
    
      }
    
      async save(data){
        var EventCard = mongoose.model('CardEventLog', CardEventLogSchema);

        try {
            var contact = new EventCard(data);
            var result = await contact.save();
            return result;

        } catch (error) {
            
        } 

       
      }
    
      async Find(KeyWord, DateFrom, DateTo, FindType){
                var EventCard = mongoose.model('CardEventLog', CardEventLogSchema);
                switch (FindType) {
                    case FindCardType.ID:
                        var res = await EventCard.findOne({
                            _id: KeyWord // search query
                        });
                    break;
                    case FindCardType.Serial:
                        var res = await EventCard.findOne({
                            Serial: KeyWord // search query
                        });
                    break;
                    case FindCardType.IDPrintMarket:
                        var res = await EventCard.findOne({
                            IDPrintMarket: KeyWord // search query
                        });
                    break;
                    case FindCardType.DateTimeEvent:
                        var res = await EventCard.find({
                            DateTimeSS: {$gte : DateFrom}
                            
                        }).find({
                            DateTimeSS: {$lte : DateTo}
                        });
                    break;
                    case FindCardType.All:
                        var res = await EventCard.find();
                    break;
                    default:
                        console.log("Default");
                    break;
                }     
                return res;
      }
    
      async update(data)
      {
        var EventCard = mongoose.model('CardEventLog', CardEventLogSchema);
        var contact = await EventCard.findById(data._id).exec();
        contact.set(data);
        var res = await contact.save();
        return res;
      }

      Delete(data)
      {
        var EventCard = mongoose.model('CardEventLog', CardEventLogSchema);
        var res = EventCard.deleteOne({_id: data}, function (err) {
            if (err) return handleError(err);
            // saved!
          });
          return res;
      }
    
    }
    
   module.exports = CardEventLog;
   module.exports.FindCardType = FindCardType;
//module.exports = mongoose.model('CardEventLog', CardEventLogSchema);

