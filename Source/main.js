var http=require('http');

var server=http.createServer(function (req,res){
    
    if(req.url=="/"){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write('<h1> This is a home page</h1>')
        res.end();
    }
    else if(req.url=="/about"){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write('<h1> This is an about page</h1>')
        res.end();
    }
    else if(req.url=="/contact"){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write('<h1> This is an contact page</h1>')
        res.end();
    }
   


});

server.listen(5055);
console.log("Server Run Success");