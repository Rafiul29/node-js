const http=require('http');

const server=http.createServer((req,res)=>{
  if(req.url=='/'){
    res.write("hello programmers")
  res.end()
  }else if(req.url=='/about'){
    res.write("hello about us page")
    res.end()
  }else{
    res.write("Not found")
    res.end()
  }
});

// server.on("connection",(socket)=>{
//   console.log("new connection")
// })

server.listen(3000,()=>{
  console.log("listening on port 3000")
})


