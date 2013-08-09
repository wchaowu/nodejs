
exports.setRequestUrl=function(app){
    var user = require('./Controllers/user')
        ,indexObj = require('./controllers/index')
        ,fileObj = require('./controllers/fileSystem')
        ,mongoObj = require('./controllers/mongoManagement')
        ,articleObj = require('./controllers/article');

    app.get('/', user.login);
    app.post('/onLogin', user.onLogin);
    app.get('/userList', user.userList);
    app.get('/user/addUser', user.addUser);
    app.get('/user/userManager', user.userManager);

    app.post('/index/newContent', indexObj.newContent);
    app.get('/index', indexObj.index);
    app.get('/index/:id', indexObj.viewContect);
    app.get('/index/:id/edit', indexObj.editContect);
    app.post('/index/:id/edit', indexObj.saveContect);
    app.get('/index/:id/delete', indexObj.deleteContectById);

    app.all("/mongo/index",mongoObj.index);

    app.get("/file/*",fileObj.initFileInfo)
    app.get("/fileBrowser/pdf/*",fileObj.initPdf)


    //  app.get("/article/articleManager",articleObj.initManager);
    app.get("/article/articleManager/:articleId?",articleObj.initManager);
    app.get("/article/articleDetail/:articleId?",articleObj.articleDetail);
    app.get("/article/articleItem",articleObj.articleItem);
    app.all("/article/search",articleObj.search)

    app.post("/article/saveArticleType",articleObj.saveArticleType);
    app.post("/article/saveArticleDetail",articleObj.saveArticleDetail);
    app.get("/article/listContext",articleObj.listContextPage);
    app.get("/article/articleTypeAll",articleObj.articleTypeAll);



}