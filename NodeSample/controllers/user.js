"use strict";

var config = require('../config');
var userDBModel = require('../models/user.js');
var crypt = require('../utils/crypt.js');
var user =new userDBModel.Schema("user").model;
exports.login = function (req, res, next) {
        res.render('login.html',{message:""});
};
exports.onLogin = function (req, res, next) {
    var mdPassword=crypt.md5(req.body.password);
     var queryObj = {userName:req.body.userName,password:mdPassword};
    user.findOne(queryObj,function(err,userInfo){
		if(err){

			 res.render('./login.html',{message:"登陆失败！"});
		}else{
			if(userInfo){
				res.redirect("/index")
			}else{
				 res.render('./login.html',{message:"用户名和密码错误！"});
			}
		}
	})
};
 exports.addUser = function (){
     var userEntity = new user();
     userEntity.userName=req.body.userName;
     userEntity.password=req.body.password;
     userEntity.save(function (err,userInfo){

     })
 };

exports.userList=function(req, res, next){
     user.find({},function(err,userList){
         res.render('./user/users.html',{userList:userList});

    });

};

exports.userManager = function (req,res,next){

};

