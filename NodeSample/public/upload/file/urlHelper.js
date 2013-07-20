
exports.setRequestUrl=function(app){
    var loginObj = require('./../../../Controllers/user')
        ,indexObj = require('./controllers/index')
        ,fileObj = require('./controllers/fileSystem')
        ,articleObj = require('./controllers/article');

    app.get('/', loginObj.login);
    app.post('/onLogin', loginObj.onLogin);
    app.post('/index/newContent', indexObj.newContent);
    app.get('/index', indexObj.index);
    app.get('/index/:id', indexObj.viewContect);
    app.get('/index/:id/edit', indexObj.editContect);
    app.post('/index/:id/edit', indexObj.saveContect);
    app.get('/index/:id/delete', indexObj.deleteContectById);
    app.get('/index/:id/finish', indexObj.finish);
    app.get("/file/*",fileObj.initFileInfo)
  //  app.get("/article/articleManager",articleObj.initManager);
    app.get("/article/articleManager/:articleId?",articleObj.initManager);
    app.get("/article/articleDetail/:articleId?",articleObj.articleDetail);

    app.post("/article/saveArticleType",articleObj.saveArticleType);
    app.post("/article/saveArticleDetail",articleObj.saveArticleDetail);
    app.get("/article/listContext",articleObj.listContextPage);
    app.get("/article/articleItem",articleObj.articleItem);

    app.get("/article/articleTypeAll",articleObj.articleTypeAll);

}