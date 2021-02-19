"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromHex = exports.numberFormat = exports.futureDay = exports.recentDay = exports.timeEver = exports.dateString = exports.timeStamp = exports.helloWorld = void 0;
function helloWorld(a, b) {
    return a + b;
}
exports.helloWorld = helloWorld;
function timeStamp(date) {
    // '2015-03-05 17:59:00' 或者 '2015/03/05 17:59:00' 转时间戳
    date = date.substring(0, 19);
    date = date.replace(/-/g, '/');
    var timestamp = new Date(date).getTime();
    return timestamp;
}
exports.timeStamp = timeStamp;
function dateString(timeStamp) {
    // 时间戳转日期字符串
    var stamp = Number(timeStamp);
    //输出13位的时间戳
    stamp = String(stamp).length >= 12 ? stamp : stamp * 1000;
    var d = new Date(stamp);
    var year = String(d.getFullYear());
    var month = (d.getMonth() + 1) >= 10 ? String(d.getMonth() + 1) : '0' + String(d.getMonth() + 1);
    var day = (d.getDate()) >= 10 ? String(d.getDate()) : '0' + String(d.getDate());
    var hour = (d.getHours()) >= 10 ? String(d.getHours()) : '0' + String(d.getHours());
    var minute = (d.getMinutes()) >= 10 ? String(d.getMinutes()) : '0' + String(d.getMinutes());
    var second = (d.getSeconds()) >= 10 ? String(d.getSeconds()) : '0' + String(d.getSeconds());
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}
exports.dateString = dateString;
function timeEver(timeData) {
    //时间格式：'2019-9-13 18:30:00',返回:昨天18：30 /今天/前天
    var stamp = timeStamp(timeData); // 先转成时间戳
    var d = new Date(); // 当前时间
    var times1 = d.getTime(); // 当前时间戳
    var hour1 = d.getHours();
    var minute1 = d.getMinutes();
    var second1 = d.getSeconds();
    var ZeroTime = times1 - hour1 * 3600 * 1000 - minute1 * 60 * 1000 - second1 * 1000; //当天零点的时间戳
    var ZeroTime2 = times1 - hour1 * 3600 * 1000 - minute1 * 60 * 1000 - second1 * 1000 - 24 * 60 * 60 * 1000; //昨天零点的时间戳
    var ZeroTime3 = times1 - hour1 * 3600 * 1000 - minute1 * 60 * 1000 - second1 * 1000 - 24 * 60 * 60 * 1000 * 2; //前天零点的时间
    if (stamp >= ZeroTime) { //说明是今天零时后
        // let ddd=`今天${d.Substring(0,10)}`
        return "\u4ECA\u5929" + timeData.substr(10, 6);
    }
    else if (stamp >= ZeroTime2) {
        return "\u6628\u5929" + timeData.substr(10, 6);
    }
    else if (stamp >= ZeroTime3) {
        return "\u524D\u5929" + timeData.substr(10, 6);
    }
    else {
        return timeData.substr(0, 16);
    }
}
exports.timeEver = timeEver;
function recentDay(days, strict, appoint) {
    if (strict === void 0) { strict = false; }
    if (appoint === void 0) { appoint = ''; }
    //获取今天开始最近n天的数组
    //当strict为false 输入7  输出['2021-2-19 00:00:00','2021-2-26 23:59:59'] 实际上有8天了 :)
    //当strict为true 输入7 输出['2021-2-19 15:21:15','2021-2-25 15:21:15'] 严格往前推7*24小时 :)
    //appoint 可选参数 指定某天开始往前n天的数组 格式 '2021-2-19 15:21:15'
    if (strict && !appoint) { //严格计算  且不存在指定时间
        var d = new Date().getTime(); // 当前时间的时间戳 
        var d2 = new Date().getTime() - days * 24 * 60 * 60 * 1000; // 往前推算的时间戳
        var time1 = dateString(d);
        var time2 = dateString(d2);
        return [time2, time1];
    }
    else if (!strict && !appoint) { //不严格计算  且不存在指定时间
        var d = new Date().getTime(); // 当前时间的时间戳 
        var d2 = new Date().getTime() - days * 24 * 60 * 60 * 1000; // 往前推算的时间戳
        var time1 = dateString(d).substr(0, 11) + '23:59:59';
        var time2 = dateString(d2).substr(0, 11) + '00:00:00';
        return [time2, time1];
    }
    else if (strict && appoint) { //严格计算  且指定时间
        var appointTime = appoint.replace(/-/g, '/');
        var d = new Date(appointTime).getTime(); // 指定时间的时间戳 
        var d2 = d - days * 24 * 60 * 60 * 1000; // 往前推算的时间戳
        var time1 = dateString(d);
        var time2 = dateString(d2);
        return [time2, time1];
    }
    else { //不严格计算  且指定时间
        var appointTime = appoint.replace(/-/g, '/');
        var d = new Date(appointTime).getTime(); // 指定时间的时间戳 
        var d2 = d - days * 24 * 60 * 60 * 1000; // 往前推算的时间戳
        var time1 = dateString(d).substr(0, 11) + '23:59:59';
        var time2 = dateString(d2).substr(0, 11) + '00:00:00';
        return [time2, time1];
    }
}
exports.recentDay = recentDay;
function futureDay(days, strict, appoint) {
    if (strict === void 0) { strict = false; }
    if (appoint === void 0) { appoint = ''; }
    //获取未来n天的数组  同recentDay
    if (strict && !appoint) { //严格计算  且不存在指定时间
        var d = new Date().getTime(); // 当前时间的时间戳 
        var d2 = new Date().getTime() + days * 24 * 60 * 60 * 1000;
        var time1 = dateString(d);
        var time2 = dateString(d2);
        return [time1, time2];
    }
    else if (!strict && !appoint) { //不严格计算  且不存在指定时间
        var d = new Date().getTime();
        var d2 = new Date().getTime() + days * 24 * 60 * 60 * 1000;
        var time1 = dateString(d).substr(0, 11) + '23:59:59';
        var time2 = dateString(d2).substr(0, 11) + '00:00:00';
        return [time1, time2];
    }
    else if (strict && appoint) { //严格计算  且指定时间
        var appointTime = appoint.replace(/-/g, '/');
        var d = new Date(appointTime).getTime();
        var d2 = d + days * 24 * 60 * 60 * 1000;
        var time1 = dateString(d);
        var time2 = dateString(d2);
        return [time1, time2];
    }
    else { //不严格计算  且指定时间
        var appointTime = appoint.replace(/-/g, '/');
        var d = new Date(appointTime).getTime();
        var d2 = d + days * 24 * 60 * 60 * 1000;
        var time1 = dateString(d).substr(0, 11) + '23:59:59';
        var time2 = dateString(d2).substr(0, 11) + '00:00:00';
        return [time1, time2];
    }
}
exports.futureDay = futureDay;
function numberFormat(value) {
    var _a;
    // 将整数部分逢三一断
    var f, r;
    if ((!value && value != 0) || Number.isNaN(Number(value)))
        return '--';
    !Number.isInteger(Number(value)) ? (_a = value.toString().split('.'), r = _a[0], f = _a[1], _a) : (r = value.toString());
    r = r.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    if (f) {
        return r + '.' + f;
    }
    return r;
}
exports.numberFormat = numberFormat;
function fromHex(hex) {
    //将css的16进制颜色属性值，转变为rgb格式的对像
    var t = {}, bits = hex.length == 4 ? 4 : 8, mask = (1 << bits) - 1;
    var color = Number('0x' + hex.substr(1));
    if (isNaN(color)) {
        return {};
    }
    ['b', 'g', 'r'].forEach(function (x) {
        var c = color & mask;
        color >>= bits;
        t[x] = bits == 4 ? 17 * c : c;
    });
    t.a = 1;
    return t;
}
exports.fromHex = fromHex;
