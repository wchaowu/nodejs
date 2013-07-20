var config = require('../config');
var fs = require('fs');
var util = require('util');
var todoDBModel = require('../models/todo.js');
var log = require('../utils/logger.js');
var logger =new log.init("filelog.txt");
var todo =todoDBModel.Schema("todoManager").model;
exports.saveTodo = function (req, res, next) {
    var todoEntity = new todo();
    todoEntity.taskType = req.body.txtArticleType;
    if(req.body.id){
        todoEntity._id=req.body.id;
    }
    todoEntity.status =  req.body.txtDescribe;
    todoEntity.title ="logo.png";
    todoEntity.project = "";
    todoEntity.startDate= new Date();
    todoEntity.endDate = new Date();
    todoEntity.priority = 0;
    todoEntity.save(function (err, row) {
        if (err) {
            return next(err);
        }
        res.redirect('/article/listContext');
    });
};

exports.todoAll=function(req,res,next){

    todo.find({},function (err,result){
        console.log(result);
        res.send(result);
    });
}
exports.initManager=function (req,res,next){
    //   var articleDetailEntity =  new articleDetail();
    if(req.params.articleId){
        todo.find({_id:req.params.todoId}, function (err, row) {
            if (err) {
                return next(err);
            }
            if (!row) {
                return next();
            }
            res.render('./article/articleManager.html',{article:row});
        });
    }else{
        res.render('./article/articleManager.html',{article:articleDetailEntity});
    }
};

//代码片段
exports.listContextPage = function(req, res) {
    var search={};
    var page={limit:5,num:1};
    //查看哪页
    if(req.query.p){
        page['num']=req.query.p<1?1:req.query.p;
    }

    var model = {
        search:search,
        columns:'name alias director publish images.coverSmall create_date type deploy',
        page:page
    };
    exports.findPagination(model,function(err, pageCount, articleList){
        page['pageCount']=pageCount;
        page['size']=articleList.length;
        page['numberOf']=pageCount>5?5:pageCount;
        res.render('./article/articleList.html', {todoList: articleList,page:page});
    });
}

exports.findPagination = function(obj,callback) {
    var q=obj.search||{}
    var col=obj.columns;
    var pageNumber=obj.page.num||1;
    var resultsPerPage=obj.page.limit||10;
    var skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;
    var query = todo.find({}).sort('-create_date').skip(skipFrom).limit(resultsPerPage);
    query.exec(function(error, results) {
        if (error) {
            callback(error, null, null);
        } else {
            todo.count(q, function(error, count) {
                if (error) {
                    callback(error, null, null);
                } else {
                    var pageCount = Math.ceil(count / resultsPerPage);
                    callback(null, pageCount, results);
                }
            });
        }
    });
}

exports.deleteTodoById = function (req, res, next) {
    var id = req.params.id;
    exports.find({_id:id}, function(err, doc) {
        if (err)
            callback(err);
        else {
            doc.remove();
            res.send("删除成功！")
        }
    });
};


