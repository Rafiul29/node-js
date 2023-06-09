

const handle={}

handle.sampleHander=(requestProperties,callback)=>{
    callback(200,{
      message:'this is a sample url'
    })
}

module.exports=handle;