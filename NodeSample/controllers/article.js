"use strict";

var config = require('../config');
var fs = require('fs');
var util = require('util');
var articleDBModel = require('../models/article.js');
var log = require('../utils/logger.js');
var logger =new log.init("filelog.txt");
exports.setup = function(callback) { callback(null); }
var article =new articleDBModel.Schema("articleType").model;
var articleDetail =articleDBModel.Schema("articleDetail").model;
exports.saveArticleType = function (req, res, next) {
    exports.findUpload(req,res);
    var articleEntity = new article();
    articleEntity.articleType = req.body.txtArticleType;
    if(req.body.id){
        articleEntity._id=req.body.id;
    }
    articleEntity.describe =  req.body.txtDescribe;
    articleEntity.logoSrc ="logo.png";
    articleEntity.save(function (err, row) {
        if (err) {
            return next(err);
        }
        res.redirect('/article/listContext');
    });
};
exports.findUpload=function(req,res){
    var tmp_path = req.files.articleLogo.path;
    console.log("temp_path->"+tmp_path);
    // 指定文件上传后的目录 - 示例为"images"目录。
    var target_path = './public/upload/imgages/' + req.files.articleLogo.name;
    console.log(target_path);
    var readStream = fs.createReadStream(tmp_path)
    var writeStream = fs.createWriteStream(target_path);
    readStream.pipe(writeStream);
    readStream.on('end',function() {
        fs.unlinkSync(tmp_path);
      //  res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes' + "target_path" + target_path);
    });
}

exports.saveArticleDetail = function (req, res, next) {
    var articleDetailEntity =  new articleDetail();

    articleDetailEntity.title = req.body.txtTitle || '';
    if(req.body.id){
      //  articleDetailEntity._id=req.body.id;
    }
    articleDetailEntity.summary=req.body.txtSummary;
    articleDetailEntity.content=req.body.txtContent;
    articleDetailEntity.refArticleId=req.body.txtType;
    articleDetailEntity.save(function (err, row) {
        if (err) {
            return next(err);

        }
        res.redirect('/article/listContext');
    });
};
exports.index = function(req,res,next){
	db.allContent(function (err, indexContent) {	       
        res.render('index.html', {indexContent: indexContent});       
    });
	
};
exports.articleTypeAll=function(req,res,next){
    //var articleEntity = new article();
    article.find({},function (err,result){
        console.log(result);
        res.send(result);
    });
}
exports.articleTypeAll=function(req,res,next){
    //var articleEntity = new article();
    article.find({},function (err,result){
        console.log(result);
        res.send(result);
    });
}
exports.articleItem=function(req,res,next){
    //var articleEntity = new article();
    article.find({},function (err,result){
        res.render('./article/article.html',{articleItem:result});
    });
}
exports.search = function(req,res,next){
  var searchKey = req.body.searchKey;
    if(searchKey){
        res.render('./article/search.html',{articleItem:""});
    }else{
        res.render('./article/search.html',{articleItem:""});
    }
}

exports.initManager=function (req,res,next){
   var articleDetailEntity =  new articleDetail();
    if(req.params.articleId){
        articleDetail.find({_id:req.params.articleId}, function (err, row) {
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
exports.articleDetail=function (req,res,next){
    if(req.params.articleId){
        articleDetail.find({_id:req.params.articleId}, function (err, row) {
            if (err) {
                return next(err);
            }
            if (!row) {
                return next();
            }
            res.render('./article/articleDetail.html',{article:row});
        });
    }else{
        res.render('./article/articleDetail.html',{article:articleDetailEntity});
    }
};

exports.initDetailManager=function (req,res,next){
	if(req.params.id){
	    db.find({_id:req.params.articleId}, function (err, row) {
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
        console.log("pageCount"+pageCount+"   articleList"+articleList.length);
		page['pageCount']=pageCount;
		page['size']=articleList.length;
		page['numberOf']=pageCount>5?5:pageCount;	
		res.render('./article/articleList.html', {articleList: articleList,page:page});
	});
}

exports.findPagination = function(obj,callback) {
    var q=obj.search||{}
    var col=obj.columns;

    var pageNumber=obj.page.num||1;
    var resultsPerPage=obj.page.limit||10;

    var skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;
    var query = articleDetail.find({}).sort('-create_date').skip(skipFrom).limit(resultsPerPage);

    query.exec(function(error, results) {
        if (error) {
            callback(error, null, null);
        } else {
            articleDetail.count(q, function(error, count) {
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

exports.deleteContectById = function (req, res, next) {
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


