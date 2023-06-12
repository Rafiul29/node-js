const express=require('express');

const app=express();



// app.use(express.json())
// app.use(express.raw())
// app.use(express.text())
// app.use(express.urlencoded())
// app.use(express.static(`${__dirname}/public/`,{
//   index:'home.html',
// }))
const router=express.Router();
app.use(router)
router.get('/',(req,res)=>{
  res.send('hello world')
})


router.post('/',(req,res)=>{
  console.log(req.body)
  res.send("this is post")
})

app.listen(3000,()=>{
  console.log("server is running")
})
