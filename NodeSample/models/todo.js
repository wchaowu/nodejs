/**
 * Created with JetBrains WebStorm.
 * User: cwwu
 * Date: 13-7-19
 * Time: 下午3:00
 * To change this template use File | Settings | File Templates.
 */
var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//定义article type实体对象模型
var todoTypeScheme = new Schema({
        taskType:String,
         status:String,
       title:String,
        project:String,
        startDate: { type: Date, default: Date.now },
         endDate: { type: Date, default: Date.now },
        priority:{type:int,default:0}

});
mongoose.model('todoManager', todoTypeScheme);
module.exports.Schema =function (modelName){
    return{model:mongoose.model(modelName)};
}
