//Sever Socket

let mongoose = require('mongoose')
var DVConnect = require('./DeviceControl/DeviceConnect');
var AppVar = require('./DeviceControl/AppVar')

mongoose.connect('mongodb://127.0.0.1/TPEAccessServer', { useUnifiedTopology: true, useNewUrlParser: true })
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })



//Sever API
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Initialize the app
let app = express();
//
let server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ioCL = require('socket.io-client')('http://66.42.36.164:4141/');

    ioCL.on('addToChat', function(data)
    {
        if(data == "onrelay")
        {
            DVConnect.test();
        }
    }
    );
    ioCL.on('EVENT_CONNECT', function(data)
    {
        if(data == "onrelay")
        {
            DVConnect.test();
        }
    }
    );

    ioCL.emit('sendMsgToServer', "Sever Online"
    );
// Import routes
let apiRoutes = require("./ClientSoftWare/API/API-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    limit: '500mb', extended: true
}));
app.use(bodyParser.json({limit: '500mb', extended: true}));
// Heroku Mongoose connection
// mongoose.connect('mongodb://heroku_5686p02g:sia8l3fni4jmu7qbn0ac1t75mf@ds349857.mlab.com:49857/heroku_5686p02g', { useNewUrlParser: true });
// Setup server port
var port = process.env.PORT || 9000;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
server.listen(port );
// app.listen(port, function () {
//     console.log("Running RestHub on port " + port);
// });
var Card = require('./Models/Card')
var mainSepa = new Card();
  
io.sockets.on('connection', function(socket){
    socket.on("new user", function(name){
            {
            AppVar.NumberClients.push({socket, name} );
            AppVar.NumberClients.forEach(PC => PC.socket.emit('EventConnect', AppVar.ListDevice));
            
        }

    });

    
    socket.on('open-chatbox', function(data){
        mainSepa.save(data);
    });
    socket.on('send message',function(data, sendto){
        users[sendto].emit('new message',{msg: data, nick: socket.nickname, sendto: sendto});
        users[socket.nickname].emit('new message',{msg: data, nick: socket.nickname, sendto: sendto});

        console.log(data);
    });
    socket.on('disconnect', function(data){
        AppVar.NumberClients.splice(socket);
    });
    });

//Database
let DBcon = require('./DeviceControl/DBConnect');
var Card = require('./Models/Card');
var Account = require('./Models/Account');
var SeparateFloor = require('./Models/SeparateFloor');
var Device = require('./Models/Device')

var dt = new Card({
    Serial: '0145363161',
    CustomerName: 'Hoang Xuan Thien',
        IDPrintMarket: "123",
        CustomerAddress: "abc",
        MobilePhone: "0123456789",
        Email: "Hoangthien5393@gmail.com",
        Enable: true,
        ProjectName: "gggg",
        ProjectID: "String",
        Status: "New",
        Note: ""
});

var dt1 = new Account({
    UserName: 'admin',
    Password: 'hitech123'
})

var dt2 = new Device(
    {
        Name: "PL1",
        IPKCZAddress: "192.168.0.7",
        DeviceID: "00000001353732343233471900390036",
        ByPass1: "6",
        ByPass2: "9",
        ByPass3: "0",
        ByPass4: "0",
        TimeOnRoleFunc1: 5,
        TimeOnReleFunc2: 5,
        Enable: true,
        DeviceStatus: false,
        Status: "NEW",
    }
)

var dt3 = new SeparateFloor(
    {
        DeviceID: "5e707116f5fbd15acc607c43",
        IPKCZAddress: "192.168.0.7",
        CardID: "5e70584cf7dda52a7c119d61",
        IDPrintMarket: null,
        SeparateFL1: "FFFF",
        SeparateFL2: "0",
        SeparateFL3: "0",
        SeparateFL4: "0",
        DateCreate: null,
        DateModified: null,      
        ProjectName: null,
        ProjectID: null,
        Status: "NEW",
        Note: null
    }
)
//DBcon.UpdateDevice(dt2);

// DBcon.FindCard("", DBcon.FindCardType.All).then(doc =>
//     {
//         if(doc[0] !== undefined)
//         console.log(doc.toString());
//         //res = doc;
//         //DB.StopTimer();
//         //test();
//     });

//DBcon.DeleteCard('0123456789');