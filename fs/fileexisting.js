var fs=require('fs');
var http=require('http');

var server=http.createServer(function(req,res){
    if(req.url=="/"){
        let rest=fs.existsSync("2.txt");
        if(rest){
            res.end("True");
        }else{
            res.end("False");
        }
    }
});

server.listen(8000);
console.log("server running");