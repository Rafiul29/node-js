var fs = require('fs');
var http = require('http');

var server = http.createServer(function(req, res) {

    if (req.url == "/") {
        fs.writeFile('demo.txt','welcome to node js',function (error) {
            if (error) {
                res.writeHead(200, { 'content-Type': 'text/html' });
                res.write('File Write Fail');
                res.end();
            } else {
                res.writeHead(200, { 'content-Type': 'text/html' });
                res.write('File Write success');
                res.end();
            }
        })
    }
});

server.listen(6060);
console.log("server run");