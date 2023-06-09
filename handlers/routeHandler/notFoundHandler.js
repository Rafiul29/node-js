const handle={}

handle.notFoundHander=(requestProperties,callback)=>{
console.log("Not found")
callback(404,{
  message:'not found'
})
}

module.exports=handle;