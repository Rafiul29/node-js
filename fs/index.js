var fs=require('fs');
var http=require('http');

var server =http.createServer(function(req,res){
//asynchonous file system.............
    // if(req.url="/"){
    // fs.readFile('home.html',function(error,data){
    //     res.writeHead(200,{'Content-Type':'text/html'});

    //     res.write(data);
    //     res.end();
    // });
    // }


    //synchonous file system...............
    let mydata=fs.readFileSync('home.html');
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write(mydata);
    res.end();

});

server.listen(5050);
console.log("fs module");