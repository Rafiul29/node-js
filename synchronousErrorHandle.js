const express=require('express');
const app=express();


app.get("/",(req,res)=>{
  for(let i=0;i<10;i++){
    if(i===5){
      next("there was an error")
    }else{
      res.write('a')
    }
  }
  res.end()
})

//invisible default error handling middleware
// app.get('/',(req,res)=>{
//   res.send(a)
// })

//404 error handle
app.use((req,res,next)=>{
  next("Request url was not found")
})

app.use((err,req,res,next)=>{
  if(res.headersSent){
    next('there was a problem')
  }else{
    if(err.message){
      console.log(err)
    }else{
      res.status(500).send("there was an error")
    }
  }
})

app.listen(3000,()=>{
  console.log('listening on port 3000')
})