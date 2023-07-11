const express=require('express');
const fs=require('fs')
const app=express();


// app.get("/",(req,res,next)=>{
//   fs.readFile('/file-does-not-exit',(err,data)=>{
//      setTimeout(function(){
//      try{
//         console.log(a)
//      }catch(err){
//         next(err);
//      }
//      },100)
//   })
// })

app.get("/",[
  (req,res,next)=>{
    fs.readFile('/file-does-not-exit',(err,data)=>{
      console.log(data);
      next(err)
    })
  },
  (req,res,next)=>{
    console.log(data.property)
  }
])

app.use((req,res,next)=>{
  console.log('i am not calling');
  next()
})


app.listen(3000,()=>{
  console.log('listening on port 3000')
})