const express=require('express');
const publicRouter=express.Router();

const log=(req,res,next)=>{
  console.log("I am logging something")
  next();
}

publicRouter.all("*",log)

publicRouter.get("/about",(req,res)=>{
  console.log("first")
  res.end()
})
 
publicRouter.param('userId',(req,res,next,id)=>{
  req.userId=id==="1"? "Admin":"Anonymous"
  next()
})

publicRouter.get("/:userId",(req,res)=>{
    res.send(`Hello ${req.userId}`)
})

module.exports=publicRouter;