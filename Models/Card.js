let mongoose = require('mongoose');

var FindCardType = Object.freeze({"ID":1, "Serial":2, "IDPrintMarket":3, "All":4});

let CardSchema = new mongoose.Schema({
        Serial: String,
        IDPrintMarket: String,
        CustomerAddress: String,
        CustomerName: String,
        MobilePhone: String,
        DateCreate: {type: String, default: "0001-01-01T00:00:00"},
        DateModified: {type: String, default: "0001-01-01T00:00:00"},
        DateTimeFrom: {type: String, default: "0001-01-01T00:00:00"},
        DateTimeExpire: {type: String, default: "0001-01-01T00:00:00"},
        Email: String,
        Enable: Boolean,
        ProjectName: String,
        ProjectID: String,
        Status: String,
        Note: String
    })

    const MongoDataCard = mongoose.model('Card', CardSchema);

    class Card extends MongoDataCard {

        constructor(Serial, IDPrintMarket, CustomerName, CustomerAddress, MobilePhone, DateCreate, DateModified, DateTimeFrom, 
            DateTimeExpire, Email, Enable, ProjectName, ProjectID, Status, Note) {
            super();
        this.Serial = Serial;
        this.IDPrintMarket = IDPrintMarket;
        this.CustomerName = CustomerName;
        this.CustomerAddress = CustomerAddress;
        this.MobilePhone = MobilePhone;
        this.DateCreate = DateCreate;
        this.DateModified = DateModified;
        this.DateTimeFrom = DateTimeFrom;
        this.DateTimeExpire = DateTimeExpire;
        this.Email = Email;
        this.Enable = Enable;
        this.ProjectName = ProjectName;
        this.ProjectID = ProjectID;
        this.Status = Status;
        this.Note = Note;
    
      }
    
      async save(data){
        var dataCard = mongoose.model('Card', CardSchema);

        await dataCard.collection.insertMany(data, function (err) {
            if (err) {
              console.log(err);
            };
            //console.log(laptop);
          });

       
      }
    
      async Find(KeyWord, FindType){
                var dataCard = mongoose.model('Card', CardSchema);
                switch (FindType) {
                    case FindCardType.ID:
                        var res = await dataCard.findOne({
                            _id: KeyWord // search query
                        }).lean();
                    break;
                    case FindCardType.Serial:
                        var res = await dataCard.findOne({
                            Serial: KeyWord // search query
                        }).lean();
                    break;
                    case FindCardType.IDPrintMarket:
                        var res = await dataCard.findOne({
                            IDPrintMarket: KeyWord // search query
                        }).lean();
                    break;
                    case FindCardType.All:
                        var res = await dataCard.find().lean();
                    break;
                    default:
                        console.log("Default");
                    break;
                }     
                return res;
      }
    
      async update(data)
      {
        var dataCard = mongoose.model('Card', CardSchema);
        var contact = await dataCard.findById(data._id).exec();
        contact.set(data);
        var result = await contact.save();
        return result;
      }

      async Delete(data)
      {
        var dataCard = mongoose.model('Card', CardSchema);
        var res = await dataCard.deleteOne({_id: data}, function (err) {
            if (err) return handleError(err);
            // saved!
          });

          return res;
      }

    
    }
    
   module.exports = Card;
   module.exports.FindCardType = FindCardType;
    
//module.exports = mongoose.model('Card', CardSchema)