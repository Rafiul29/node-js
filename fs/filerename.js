var fs = require('fs');
var http = require('http');


var server = http.createServer(function (req,res) {
    //asynchonous system ..............
//    if (req.url == "/") {
//         //asynchonous system ................
//         fs.rename('demo1.txt', "demo2.txt", function (error) {
//             if (error) {
//                 res.writeHead(200, { 'content-Type': 'text/html' });
//                 res.write('File Rename Fail');
//                 res.end();
//             } else {
//                 res.writeHead(200, { 'content-Type': 'text/html' });
//                 res.write('File Rename success');
//                 res.end();
//             }
//         });

//     }
if (req.url == "/") {
    //synchonous system ................
    let result=fs.renameSync('demo2.txt', "demo3.txt") 
        if (result){
            res.writeHead(200, { 'content-Type': 'text/html' });
            res.write('File Rename Fail');
            res.end();
        } else {
            res.writeHead(200, { 'content-Type': 'text/html' });
            res.write('File Rename success');
            res.end();
        }
}




    
});
server.listen(6050);
console.log("server success full");