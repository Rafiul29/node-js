
const express=require('express')

const app=express();

const admin=express();
// const handle=require('./handles')

// app.locals.title="My app"

// app.get('/',handle)

// admin.on('mount', function (parent) {
//   console.log('Admin Mounted')
//   console.log(parent) // refers to the parent app
// })

// admin.get('/',(req,res)=>{
//   console.log(admin.mountpath);
//   res.send('Admin Homepage')
// })

// app.use('/admin',admin)

//app.all

// app.enable("case sensitive routing")

// app.all('/',(req,res)=>{
//   res.send("hello")
// })


// app.get('/about',(req,res)=>{
//   res.send("app page")
// })


// app params

// app.param("id",(req,res,next,id)=>{
//   let user={
//     userId:id
//   }
//   req.userDetails=user
//   next();
// })

// app.get('/user/:id',(req,res)=>{
//   console.log(req.userDetails)
//   res.send("params id")
// })


// app routes
app.route('/about/mission')
  .get((req,res)=>{
    res.send("welcome to application get")
  }
  )
  .post((req,res)=>{
    res.send("welcome to application post")
  })
  .put((req,res)=>{
    res.send("welcome to application put")
  })
  .delete((req,res)=>{
    res.send("welcome to application delete")
  })

app.listen(3000,()=>{
  console.log("server running")
})