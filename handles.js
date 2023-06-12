
const handle=(req,res)=>{
  console.log(req.app.locals.title)
  console.log("hello word")
}

module.exports=handle