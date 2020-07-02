var functionPrivate = require('../Ulti/functionPrivate')


exports.NumberClients = [];
exports.ListDevice = [];
//
exports.Register = function(data)
{
    var dataRegister = Buffer.from([0xAA, 0x01, 0x08, 0x017]);
    var CRC16 = Buffer.alloc(2);
    var LenData = dataRegister.length;
    CRC16 = functionPrivate.CRC16_TPE(data, data.length - 2);
    for(i = 0; i < LenData; i++)
    {
        if(data[i] != dataRegister[i])
        {
            return false;
        }
    }
    if(CRC16[0] != data[data.length - 2] || CRC16[1] != data[data.length - 1])
    {
        return false;
    }

    return true;
}

exports.CardEvent = function(data)
{
    var dataCardEvent = Buffer.from([0xAA, 0x01, 0x05, 0x027]);
    var CRC16 = Buffer.alloc(2);
    var LenData = dataCardEvent.length;
    CRC16 = functionPrivate.CRC16_TPE(data, data.length - 2);
    for(i = 0; i < LenData; i++)
    {
        if(data[i] != dataCardEvent[i])
        {
            return false;
        }
    }
    if(CRC16[0] != data[data.length - 2] || CRC16[1] != data[data.length - 1])
    {
        return false;
    }

    return true;
}

exports.GetPara = function(data)
{
    var dataGetPara = Buffer.from([0xAA, 0x01, 0x02, 0x017]);
    var CRC16 = Buffer.alloc(2);
    var LenData = dataGetPara.length;
    CRC16 = functionPrivate.CRC16_TPE(data, data.length - 2);
    for(i = 0; i < LenData; i++)
    {
        if(data[i] != dataGetPara[i])
        {
            return false;
        }
    }
    if(CRC16[0] != data[data.length - 2] || CRC16[1] != data[data.length - 1])
    {
        return false;
    }

    return true;
}

