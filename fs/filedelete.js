var fs = require('fs');
var http = require('http');

var server = http.createServer(function (req, res) {
    if (req.url == "/") {
        //asynchononus system..................
        //    fs.unlink('1.txt',function(error){
        //        if(error){
        //            res.writeHead(200,{'Context-Type':'text/html'});
        //            res.write("File delete Fail");
        //            res.end();
        //        }else{
        //         res.writeHead(200,{'Context-Type':'text/html'});
        //         res.write("File delete success");
        //         res.end();
        //        }
        //    })

        let error = fs.unlinkSync('demo3.txt');
        if (error) {
            res.writeHead(200, { 'content-Type': 'text/html' });
            res.write('File delete Fail');
            res.end();
        } else {
            res.writeHead(200, { 'content-Type': 'text/html' });
            res.write('File delete success');
            res.end();
        }
    }
});
server.listen(7000);
console.log("server running");