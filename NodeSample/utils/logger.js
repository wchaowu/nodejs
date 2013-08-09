/**
 * Created with JetBrains WebStorm.
 * User: cwwu
 * Date: 13-7-16
 * Time: 下午3:46
 * To change this template use File | Settings | File Templates.
 * var log = logger("filePath");
 * log.writeLog("err",logMessage);
 */
var fs = require('fs');
var buffersize = 30000;

exports.init = function(logfile){
    if(logfile){
        var buffer = new Buffer(buffersize);
        var fd = fs.openSync(logfile,'a');
    }
    function writeLog(type,logmsg){
        var log = {type:type,msg:logmsg,time:getTime()};
        console.log(formatLogMsg(log));
        fs.writeSync(fd,formatLogMsg(log),0,0,null);
    }
    return {
        log: function(type,logmsg){writeLog(type,logmsg)},
    };
}
//格式化日志内容
function formatLogMsg(log){
    return [log.time,log.type,log.msg] + "\n";
}

function getTime() {
    var t = new Date();
    return [t.getFullYear(), '-', add0(t.getMonth() + 1) , '-', add0(t.getDate()), ' ',
        add0(t.getHours()), ':', add0(t.getMinutes()), ':', add0(t.getSeconds())].join('');
}

function add0(num) {
    return num > 9 ? num : '0' + num;
}
function allPrpos ( obj ) {
    // 用来保存所有的属性名称和值
    var props = "" ;
    // 开始遍历
    for ( var p in obj ){
        // 方法
        if ( typeof ( obj [ p ]) == " function " ){
            obj [ p ]() ;
        } else {
            // p 为属性名称，obj[p]为对应属性的值
            props += p + " = " + obj [ p ] + " \t " ;
        }
    }
    // 最后显示所有的属性
    return props;
}