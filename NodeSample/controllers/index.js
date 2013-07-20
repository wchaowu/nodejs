"use strict";

var config = require('../config');
exports.newContent = function (req, res, next) {
    var title = req.body.title || '';
    title = title.trim();
    if (!title) {
        return res.render('error.html', {message: '标题是必须的'});
    }
    db.add(title, function (err, row) {
        if (err) {
            return next(err);
        }
        res.redirect('/index');
    });
};
exports.index = function(req,res,next){
	db.allContent(function (err, indexContent) {	       
        res.render('index.html', {indexContent: indexContent});       
    });
	
}
exports.viewContect = function (req, res, next) {
    res.redirect('/index');
};

exports.editContect = function (req, res, next) {
    var id = req.params.id;
    db.findTodoById(id, function (err, row) {
        if (err) {
            return next(err);
        }
        if (!row) {
            return next();
        }
        res.render('todo/edit.html', {todo: row});
    });
};

exports.saveContect = function (req, res, next) {
    var id = req.params.id;
    var title = req.body.title || '';
    title = title.trim();
    if (!title) {
        return res.render('error.html', {message: '标题是必须的'});
    }
    db.editTitle(id,title,function (err, result) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};

exports.deleteContectById = function (req, res, next) {
    var id = req.params.id;
    db.delete(id, function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};

exports.finish = function (req, res, next) {
    var finished = req.query.status === 'yes' ? true : false;
    var id = req.params.id;
    db.editFinished(id,finished, function (err, result) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};
