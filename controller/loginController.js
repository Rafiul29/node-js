

const getLogin=(req,res)=>{

  res.render("index",{
    title:"Login Chat Application"
  })
}



module.exports={
  getLogin
}