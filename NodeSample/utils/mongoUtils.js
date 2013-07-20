
var dburl = require("../config").db;//数据库地址
var mongoose = require('mongoose');
exports.connect = function(callback) {
    mongoose.connect(dburl);
}

exports.disconnect = function(callback) {
    mongoose.disconnect(callback);
}
exports.mongoObj = function(){
	return 	mongoose;	
}
