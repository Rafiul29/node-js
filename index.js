const express=require('express');
const cors=require('cors')
const app=express();

app.use(cors());

const users=[
  {id:1,name:"rafiul",email:"rafi@gmial.com"},
  {id:2,name:"pavel",email:"pavel@gmial.com"}
]


app.get("/",(req,res)=>{
  res.send("Users Management Server running")
})
app.get('/users',(req,res)=>{
  res.json(users)
})


const port = process.env.PORT || 5000
app.listen(port,()=>{
  console.log(`Server is running on Port:${port}`)
})

