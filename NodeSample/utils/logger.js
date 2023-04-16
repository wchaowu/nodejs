/**
 * Created with JetBrains WebStorm.
 * User: cwwu
 * Date: 13-7-16
 * Time: 下午3:46
 * To change this template use File | Settings | File Templates.
 * var log = logger("filePath");
 * log.writeLog("err",logMessage);
 */
const fs = require('fs');
const buffersize = 30000;

exports.init = function(logfile){
    if(logfile){
        const buffer = Buffer.alloc(buffersize);
        let fd;
        try {
            fd = await fs.promises.open(logfile, 'a');
        } catch (err) {
            throw err;
        }
    }
    async function writeLog(type,logmsg){
        const log = {type:type,msg:logmsg,time:getTime()};
        console.log(formatLogMsg(log));
        try {
            await fs.promises.write(fd, formatLogMsg(log), 0, 0);
        } catch (err) {
            throw err;
        }
    }
    return {
        log: async function(type,logmsg){await writeLog(type,logmsg)},
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
