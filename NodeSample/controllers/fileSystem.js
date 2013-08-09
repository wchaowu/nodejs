/**
 * Created with JetBrains WebStorm.
 * User: cwwu
 * Date: 13-7-17
 * Time: 下午5:34
 * To change this template use File | Settings | File Templates.
 */

var fileUtils = require('../utils/file.js');
var configInfo = require('../config.js');
var root=configInfo.root+"/public/upload";
var url=require("url"),
    path=require("path"),
    util=require('util'),
    fs=require("fs");

exports.initFileInfo=function (req,res,next){
    console.log(url.parse(req.url).pathname);
    //将url地址的中的%20替换为空格，不然Node.js找不到文件
    var filePath= fileUtils.urlParse(req);
    if(filePath=='/'){
        fileUtils.listDirectory(root,req,res);

    }else{
      var  filename=path.join(root,filePath);
        path.exists(filename,function(exists){
            if(!exists){
                util.error('找不到文件'+filename);
                res.redirect("404.html");
            }else{
                fs.stat(filename,function(err,stat){
                    if(stat.isFile()){
                        fileUtils.showFile(filename,req,res);
                    }else if(stat.isDirectory()){
                     fileUtils.listDirectory(filename,req,res);
                    }
                });
            }
        });
    }

};
exports.initPdf = function (req,res,next){
    var fileUrl = req.url.split("url=")[1];
    console.log("fileUrl"+fileUrl);
    res.render('./file/pdfBrowser.html',{url:fileUrl});

};
