var fs = require('fs');
var http = require('http');

var server = http.createServer(function (req, res) {

    if (req.url == "/") {

        //asynchonous system............
        // fs.writeFile('demo.txt','welcome to node js',function (error) {
        //     if (error) {
        //         res.writeHead(200, { 'content-Type': 'text/html' });
        //         res.write('File Write Fail');
        //         res.end();
        //     } else {
        //         res.writeHead(200, { 'content-Type': 'text/html' });
        //         res.write('File Write success');
        //         res.end();
        //     }
        // })


        //synchonous system .................
        var error = fs.writeFileSync('1.txt', 'welcome to node JS')
        if (error) {
            res.writeHead(200, { 'content-Type': 'text/html' });
            res.write('File Write Fail');
            res.end();
        } else {
            res.writeHead(200, { 'content-Type': 'text/html' });
            res.write('File Write success');
            res.end();
        }
    }
});

server.listen(6060);
console.log("server run");