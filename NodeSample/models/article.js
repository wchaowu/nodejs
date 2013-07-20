var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//定义article type实体对象模型
var articleTypeScheme = new Schema({
    articleType:String
    ,describe:String
    ,logoSrc:String
    //,create_date: { type: Date, default: Date.now }
});
//定义article details对象模型
var articleDetailScheme = new Schema({
    title:String
    ,summary:String
    ,content:String
    ,create_date: { type: Date, default: Date.now }
    ,refArticleId:{ type: Schema.Types.ObjectId, ref: 'articleType' }

});
mongoose.model('articleType', articleTypeScheme);
mongoose.model('articleDetail', articleDetailScheme);
module.exports.Schema =function (modelName){
    return{model:mongoose.model(modelName)};
}
