var Card = require('../Models/Card')
var Account = require('../Models/Account')
var Device = require('../Models/Device')
var Group = require('../Models/Group')
var Project = require('../Models/Project')
var SeparateFloor = require('../Models/SeparateFloor')
var SeparateGroup = require('../Models/SeparateGroup')
var CardEventLog = require('../Models/CardEventLog')
var Registered = require('../Models/Registered')
var TimeZone = require('../Models/TimeZone')
var StateDevice = require('../Models/StateDevice')
var functionPrivate = require('../Ulti/functionPrivate')
var Protocol = require('./Protocol')
var AppVar = require('./AppVar')

//
var net = require('net');
var server = net.createServer();
server.listen(11000, function (){
    console.log('TCP Server is running on port ' + 11000 + '.');
});
//
var mainDevice = new Device();
var mainRegistered = new Registered();
var mainSeparateFloor = new SeparateFloor();
var mainCardEvent = new CardEventLog();

//
server.on('connection', function(socket) {
    var adresscn = socket.remoteAddress + ":" + socket.remotePort;
    console.log('new client connect %s', adresscn);
    Protocol.GetIDBoard(socket);
    socket.setKeepAlive(true, 1000);

    socket.on('disconnect', () => {
      console.log('socket timeout');
      socket.end();
    });

   socket.on("data", function (dt)
   {
       //Dang Ky
    if(AppVar.Register(dt))
    {
        var IDBo = functionPrivate.TachIDBo(dt);

        AppVar.ListDevice.push({WorkSocket: socket, IDBo: IDBo.toString("hex")});
        AppVar.NumberClients.forEach(PC => PC.socket.emit('EventConnect', AppVar.ListDevice));
        mainDevice.Find(IDBo.toString("hex"), Device.FindDeviceType.IDBoard).then(doc =>
            {
                if(doc != undefined)
                {
                    console.log("Bo dang ky");
                    Protocol.RegisterBoard(IDBo, socket);
                }
                else
                {
                    console.log("Bo chua dang ky");
                    console.log(IDBo.toString("hex"));
                }
            });
    }  
    //Quet The
    else if(AppVar.CardEvent(dt))
       {
        var IDBo = functionPrivate.TachIDBo(dt);
        MaThe = Buffer.alloc(4);
        ProcessCard(dt, socket,IDBo);
       }
     //Get Parameter
     else if(AppVar.GetPara(dt))
     {
      //
      var IDBo = functionPrivate.TachIDBo(dt);
      ProcessBypass(socket, IDBo);
     }   
      else
       console.log("data "+ dt.toString("hex") +"");
   });

   socket.once("close", function (data)
   {    
  
    let index = AppVar.ListDevice.findIndex(p => p.WorkSocket === socket);
    if (index !== -1)
    {
        socket.end();    
        AppVar.ListDevice.splice(index, 1);
        console.log('CLOSED: ' + socket.remoteAddress + ' ' + socket.remotePort);
        AppVar.NumberClients.forEach(PC => PC.socket.emit('EventConnect',AppVar.ListDevice));
    } 
    
   });
    
   socket.on("error", function (err)
   {
    let index = AppVar.ListDevice.findIndex(p => p.WorkSocket === socket);
    if (index !== -1)
    {
        socket.end();    
        AppVar.ListDevice.splice(index, 1);
        console.log('CLOSED: ' + socket.remoteAddress + ' ' + socket.remotePort);
        AppVar.NumberClients.forEach(PC => PC.socket.emit('EventConnect',AppVar.ListDevice));
    } 
   });
});

exports.test = function()
{
    a1 = "ffffffff";
    a2 = "00000000";
    a3 = "00000000";
    a4 = "00000000";

    a = functionPrivate.convertPT(a1) + functionPrivate.convertPT(a2) + functionPrivate.convertPT(a3) + functionPrivate.convertPT(a4);
    b = Buffer.from(a, 'hex');                    
    Protocol.SendParameter(AppVar.ListDevice[0].IDBo, b, AppVar.ListDevice[0].WorkSocket);
}

//
var ProcessCard = function(dt, socket, IDBo)
{
    MaThe = Buffer.alloc(4);
    MaThe[0] = dt[24]; MaThe[1] = dt[23]; MaThe[2] = dt[22]; MaThe[3] = dt[21];
    var MaTheStr = functionPrivate.FillMuoiSo(parseInt(MaThe.toString("hex"), 16).toString(10));
    var IDBoSTR = IDBo.toString("hex");
    var dataCardEvent = new CardEventLog();

    dataCardEvent.Serial = MaTheStr;
    dataCardEvent.DeviceID = IDBoSTR;
    var dateStr = functionPrivate.getDateTimeNow();

    dataCardEvent.DateCreate = dateStr;
    dataCardEvent.DateTimeEvent =  dateStr;
    dataCardEvent.DateTimeSS = Date.now();

    var tmpMainCard = new Card();
    var tmpMainDevice = new Device();
    tmpMainCard.Find(MaTheStr, Card.FindCardType.Serial).then(
        dataCard => 
        {
            if(dataCard != undefined)
            {
                var tmpCard = new Card();
                tmpCard = dataCard;
                dataCardEvent.IDPrintMarket = tmpCard.IDPrintMarket;
                dataCardEvent.CardID = tmpCard._id;
                dataCardEvent.CustomerName = tmpCard.CustomerName;
                dataCardEvent.CustomerAddress = tmpCard.CustomerAddress;

               if(tmpCard.Enable == false)
               {
                console.log("The Bi Khoa");
               }
              
               ProcessDevice(MaTheStr, IDBo, socket, dataCardEvent, tmpCard.Enable)
            }
            else
            {
                console.log("The Chua Dang Ky");
                mainCardEvent.save(dataCardEvent);
                AppVar.NumberClients.forEach(PC => PC.socket.emit('EventCard',dataCardEvent));
            }
        }
    );
       
}

var ProcessDevice = function(SerialCard, IDBo, Socket, dataCardEvent, CardActivate)
{
    mainDevice.Find(IDBo.toString("hex"), Device.FindDeviceType.IDBoard).then(dataDevice =>
        {
            if(dataDevice != undefined)
            {
                var tmpDevice = new Device();
                tmpDevice = dataDevice;

                dataCardEvent.GroupName = tmpDevice.GroupName;
                dataCardEvent.DeviceName = tmpDevice.Name;
                dataCardEvent.Status = "NEW";
                var DeviceID = tmpDevice._id;
            }

            mainCardEvent.save(dataCardEvent);
            AppVar.NumberClients.forEach(PC => PC.socket.emit('EventCard',dataCardEvent));
            ProcessSeparateFloor(SerialCard, IDBo, Socket, CardActivate, DeviceID);
        }

       );
}

var ProcessSeparateFloor = function(SerialCard, IDBo, Socket, CardActivate, DeviceID)
{
    mainSeparateFloor.Find(SerialCard, IDBo.toString("hex") , SeparateFloor.FindType.SerialAndIDBoard, DeviceID).then(
        docSepa =>
        {
            if(docSepa != undefined)
            {
                if(CardActivate)
                {
                    var tmpSepa = new SeparateFloor();
                    tmpSepa = docSepa;
                    a1 = tmpSepa.SeparateFL1;
                    a2 = tmpSepa.SeparateFL2;
                    a3 = tmpSepa.SeparateFL3;
                    a4 = tmpSepa.SeparateFL4;

                    a = functionPrivate.convertPT(a1) + functionPrivate.convertPT(a2) + functionPrivate.convertPT(a3) + functionPrivate.convertPT(a4);
                    b = Buffer.from(a, 'hex');                    
                    Protocol.OpenElevator(IDBo, b, Socket);
                }
            }
            else
            {
                console.log("Khong co du lieu phan tang");
            }
        }
    )
}
//
var ProcessBypass = function(socket, IDBo){
    mainDevice.Find(IDBo.toString("hex"), Device.FindDeviceType.IDBoard).then(doc =>
        {
            if(doc !== undefined)
            {
                a1 = (doc.ByPass1);
                a2 = (doc.ByPass2);
                a3 = (doc.ByPass3);
                a4 = (doc.ByPass4);

                a = functionPrivate.convertPT(a1) + functionPrivate.convertPT(a2) + functionPrivate.convertPT(a3) + functionPrivate.convertPT(a4);
                b = Buffer.from(a, 'hex');                    
                Protocol.SendParameter(IDBo, b, socket);
            }
            else
            {
                console.log("Chua co du lieu phan tang");
            }
        });
    //
}