var http   = require('http'); 
var config = require('./config'); 

var server = http.createServer(function(req,res){
  res.end('find recycle centers nearby'); 
}).listen(config.APP.port);  

console.log('Recycler is started on port', server.address().port); 