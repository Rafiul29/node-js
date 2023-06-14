
const handle=(req,res)=>{
 res.set('it','banglait')
 console.log(
  res.get('it'))
  res.end()
}

module.exports=handle