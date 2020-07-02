exports.getDateTimeNow = function()
{
    var date = new Date();
    var dateStr =
      ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
      ("00" + date.getDate()).slice(-2) + "/" +
      date.getFullYear() + " " +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2);

      return dateStr;
}

exports.CRC16_TPE = function(DataCRC16, DataCRC16Len)
{
    numArray = Buffer.alloc(2);
    maxValue1 = 255;
    maxValue2 = 255;
    for ( index1 = 0; index1 < DataCRC16Len; ++index1)
    {
        maxValue2 ^= DataCRC16[index1];
        for ( index2 = 0; index2 < 8; ++index2)
        {
             num1 = maxValue2 & 1;
             num2 = maxValue1 & 1;
            maxValue1 >>= 1;
            maxValue2 >>= 1;
            if (num2 == 1)
                maxValue2 |= 128;
            if (num1 == 1)
            {
                maxValue1 ^= 243;
                maxValue2 ^= 182;
            }
        }
    }
    numArray[0] = maxValue2;
    numArray[1] = maxValue1;
    return numArray;
}

exports.convertPT = function(SourceString)
{
    for(i = SourceString.length; i < 8; i++)
    {
        SourceString = '0' + SourceString;
    }
    tmp = Buffer.from(SourceString, 'hex');
    tmp = tmp.reverse();
    var kq = tmp.toString("hex");
    return kq;
}


exports.FillMuoiSo = function(num)
{
    for(i = num.length; i < 10; i++)
    {
        num = 0 + num;
    }
    return num;
}

exports.TachIDBo = function(data)
{
    var IDBo = Buffer.alloc(16);
    for(i = 5; i < data.length - 2; i++)
    {
        IDBo[i - 5] = data[i];
    }
    IDBo = IDBo.reverse();
    return IDBo;
}