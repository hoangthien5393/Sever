let mongoose = require('mongoose')

let RegisteredSchema = new mongoose.Schema({
        Code: String,
        License: String,
        PCName: String,
        CustomerName: String,
        MobilePhone: String,
        DateCreate: {type: String, default: "0001-01-01T00:00:00"},
        DateModified: {type: String, default: "0001-01-01T00:00:00"},
        DateTimeFrom: {type: String, default: "0001-01-01T00:00:00"},
        DateTimeExpire: {type: String, default: "0001-01-01T00:00:00"},
        ProjectName: String,
        ProjectID: String,
        Status: String,
        Note: String
    })

    var FindType = Object.freeze({"ID":1, "Code":2, "License":3, "All":4});

    const MongoDataRegistered = mongoose.model('Registered', RegisteredSchema);

    class Registered extends MongoDataRegistered {

        constructor(Code, License, PCName, CustomerName, MobilePhone, DateCreate, DateModified, DateTimeFrom, 
            DateTimeExpire, ProjectName, ProjectID, Status, Note) {
            super();
        this.Code = Code;
        this.License = License;
        this.CustomerName = CustomerName;
        this.PCName = PCName;
        this.MobilePhone = MobilePhone;
        this.DateCreate = DateCreate;
        this.DateModified = DateModified;
        this.DateTimeFrom = DateTimeFrom;
        this.DateTimeExpire = DateTimeExpire;
        this.ProjectName = ProjectName;
        this.ProjectID = ProjectID;
        this.Status = Status;
        this.Note = Note;
      }
    
    async save(data){
        var dataRegister = mongoose.model('Registered', RegisteredSchema);

        try {
            var contact = new dataRegister(data);
            var result = await contact.save();
            return result;

        } catch (error) {
            
        } 

       
      }
    
      async Find(KeyWord, FindDataType){
                var dataRegister = mongoose.model('Registered', RegisteredSchema);
                switch (FindDataType) {
                    case FindType.ID:
                        var res = await dataRegister.findOne({
                            _id: KeyWord // search query
                        });
                    break;
                    case FindType.Code:
                        var res = await dataRegister.findOne({
                            Code: KeyWord // search query
                        });
                    break;
                    case FindType.License:
                        var res = await dataRegister.findOne({
                            License: KeyWord // search query
                        });
                    break;
                    case FindType.All:
                        var res = await dataRegister.find();
                    break;
                    default:
                        console.log("Default");
                    break;
                }     
                return res;
      }
    
      async update(data)
      {
        var dataRegister = mongoose.model('Registered', RegisteredSchema);
        var contact = await dataRegister.findById(data._id).exec();
        contact.set(data);
        var res = await contact.save();
        return res;
      }

      async Delete(data)
      {
        var dataRegister = mongoose.model('Registered', RegisteredSchema);
        var res = await dataRegister.deleteOne({_id: data}, function (err) {
            if (err) return handleError(err);
            // saved!
          });
          return res;
      }

    
    }
    
   module.exports = Registered;
   module.exports.FindType = FindType;
   //module.exports = mongoose.model('Register', RegisteredSchema);