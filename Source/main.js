var http = require('http');
var URL = require('url');
var server=http.createServer(function(req,res){
    var myURL="http://rabbil.com/blog.html?year=2020&month=junly";

    var myURLObj=URL.parse(myURL,ture);
    var myHostName=myURLObj.host;
    var myPathName=myURLObj.pathname;
    res.writeHead(200,{'Content-Type':'text/html'})
    res.write(myPathName);
    res.end();
});
server.listen(5055);
console.log("Server running good");

server.listen(5055);
console.log("Server Run Success request and responce");


