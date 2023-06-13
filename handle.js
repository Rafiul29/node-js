const { query } = require("express");

const handle=(req,res)=>{
  console.log(req.app.get('view engine'))
  console.log(req.app.get(query))
  res.send("hello get method");
}

module.exports=handle