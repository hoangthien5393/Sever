var functionPrivate = require('../Ulti/functionPrivate')


exports.RegisterBoard = function(IDBo, socket)
{
    datatmp = Buffer.from([0xAA, 0x01, 0x08,  0x018, 0x01, IDBo[0],IDBo[1],IDBo[2],IDBo[3],IDBo[4],IDBo[5],
        IDBo[6],IDBo[7],IDBo[8],IDBo[9], IDBo[10],IDBo[11],IDBo[12],IDBo[13],IDBo[14],IDBo[15], 0x01 ]);
    crc = functionPrivate.CRC16_TPE(datatmp, 22);
    data = Buffer.from([0xAA, 0x01, 0x08,  0x018, 0x01, IDBo[0],IDBo[1],IDBo[2],IDBo[3],IDBo[4],IDBo[5],
        IDBo[6],IDBo[7],IDBo[8],IDBo[9], IDBo[10],IDBo[11],IDBo[12],IDBo[13],IDBo[14],IDBo[15], 0x01, crc[0], crc[1]]);    
    socket.write(data);

    //RegisterBoard2(IDBo, socket);
    return data;
}
//
exports.GetIDBoard = function(socket)
{
    datatmp = Buffer.from([0xAA, 0x01, 0x08,  0x07, 0x00]);
    crc = functionPrivate.CRC16_TPE(datatmp, 5);
    data = Buffer.from([0xAA, 0x01, 0x08,  0x07, 0x00, crc[0], crc[1]]);
    socket.write(data);
    return data;
}
//
exports.SendParameter = function(IDBo, PT, socket)
{
    datatmp = Buffer.from([0xAA, 0x01, 0x02,  0x2B, 0x00, IDBo[0],IDBo[1],IDBo[2],IDBo[3],IDBo[4],IDBo[5],
        IDBo[6],IDBo[7],IDBo[8],IDBo[9], IDBo[10],IDBo[11],IDBo[12],IDBo[13],IDBo[14],IDBo[15], PT[0], PT[1], PT[2], PT[3], PT[4],
    PT[5], PT[6], PT[7], PT[8], PT[9], PT[10], PT[11], PT[12], PT[13], PT[14], PT[15], 0x05, 0x00, 0x05, 0x00 ]);
    crc = functionPrivate.CRC16_TPE(datatmp, 41);
    data = Buffer.from([0xAA, 0x01, 0x02,  0x2B, 0x00, IDBo[0],IDBo[1],IDBo[2],IDBo[3],IDBo[4],IDBo[5],
        IDBo[6],IDBo[7],IDBo[8],IDBo[9], IDBo[10],IDBo[11],IDBo[12],IDBo[13],IDBo[14],IDBo[15], PT[0], PT[1], PT[2], PT[3], PT[4],
    PT[5], PT[6], PT[7], PT[8], PT[9], PT[10], PT[11], PT[12], PT[13], PT[14], PT[15], 0x05, 0x00, 0x05, 0x00, crc[0], crc[1]]);   
    socket.write(data);
    return data;
}
//
exports.OpenElevator = function(IDBo, PT, socket)
{
    datatmp = Buffer.from([0xAA, 0x01, 0x05,  0x27, 0x00, IDBo[0],IDBo[1],IDBo[2],IDBo[3],IDBo[4],IDBo[5],
        IDBo[6],IDBo[7],IDBo[8],IDBo[9], IDBo[10],IDBo[11],IDBo[12],IDBo[13],IDBo[14],IDBo[15], PT[0], PT[1], PT[2], PT[3], PT[4],
    PT[5], PT[6], PT[7], PT[8], PT[9], PT[10], PT[11], PT[12], PT[13], PT[14], PT[15] ]);
    crc = functionPrivate.CRC16_TPE(datatmp, 37);
    data = Buffer.from([0xAA, 0x01, 0x05,  0x27, 0x00, IDBo[0],IDBo[1],IDBo[2],IDBo[3],IDBo[4],IDBo[5],
        IDBo[6],IDBo[7],IDBo[8],IDBo[9], IDBo[10],IDBo[11],IDBo[12],IDBo[13],IDBo[14],IDBo[15], PT[0], PT[1], PT[2], PT[3], PT[4],
        PT[5], PT[6], PT[7], PT[8], PT[9], PT[10], PT[11], PT[12], PT[13], PT[14], PT[15], crc[0], crc[1]]);   
    socket.write(data);
    return data;
}