"use strict";

var config = require('../config');
var userDBModel = require('../models/user.js');
var user =new userDBModel.Schema("user").model;
exports.login = function (req, res, next) {
        res.render('login.html'); 
};
exports.onLogin = function (req, res, next) {
    user.userName=req.body.userName;
	user.password=req.body.password;
    userDBModel.find(user,function(err,userInfo){
		if(err){
			 res.render('./login.html'); 			
		}else{
			if(userInfo){
				console.log("onload index.html");
				res.redirect("/index")
			}else{
				 res.render('./login.html'); 
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

exports.userList=function(req, res, next) {

};

exports.userManager = function (req,res,next){

};

