
var express = require('./');
var app = express.createServer();

app.use(express.logger('dev'));

app.get('/', function(req, res){
  console.log(req.protocol);
  res.send('hello');
});

app.get('/user/:id', function(req, res){
  
});

app.del('/user/:id', function(req, res){
  
});

console.log(app.routes.get[1]);
app.listen(3000);
