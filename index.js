const express=require('express');

const app=express();


app.use(express.json())

//base Url
const admin=express()

// admin.get('/:id',(req,res)=>{
//   console.log(req.baseUrl)
//   res.send("admin")
// })
// app.use("/admin",admin)

// app.get("/user/:id",(req,res)=>{
//   console.log(req.baseUrl)
//   res.send("hello word ")
// })


//orginal Url

// admin.get('/dashboard/:id',(req,res)=>{
//   console.log(req.originalUrl)
//   console.log(req.url)
//   res.send("admin")
// })
// app.use("/admin",admin)

// app.get("/user/:id",(req,res)=>{
//   console.log(req.originalUrl)
//   console.log(req.url)
//   res.send("hello word ")
// })


// req path
// admin.get('/dashboard/:id',(req,res)=>{
//   console.log(req.path)
//   res.send("admin")
// })
// app.use("/admin",admin)

// app.get("/user/:id",(req,res)=>{
//   console.log(req.path)
//   res.send("hello word ")
// })



//req hostname

// admin.get('/dashboard/:id',(req,res)=>{
//   console.log(req.hostname)
//   res.send("admin")
// })
// app.use("/admin",admin)

// app.get("/user/:id",(req,res)=>{
//   console.log(req.hostname)
//   res.send("hello word ")
// })

//req.ip

// admin.get('/dashboard/:id',(req,res)=>{
//   console.log(req.ip)
//   res.send("admin")
// })

// app.use("/admin",admin)

// app.get("/user/:id",(req,res)=>{
//   console.log(req.ip)
//   res.send("hello word ")
// })


// req method

// admin.get('/dashboard/:id',(req,res)=>{
//   console.log(req.method)
//   res.send("admin")
// })
// app.use("/admin",admin)

// app.get("/user/:id",(req,res)=>{
//   console.log(req.method)
//   res.send("hello word ")
// })

//req potocol

// admin.get('/dashboard/:id',(req,res)=>{
//   console.log(req.protocol)
//   res.send("admin")
// })
// app.use("/admin",admin)

// app.get("/user/:id",(req,res)=>{
//   console.log(req.protocol)
//   res.send("hello word ")
// })


// req params

// admin.get('/dashboard/:id',(req,res)=>{
//   console.log(req.params)
//   res.send("admin")
// })
// app.use("/admin",admin)

// app.get("/user/:id",(req,res)=>{
//   console.log(req.params)
//   res.send("hello word ")
// })

//req query

// admin.get('/dashboard/:id',(req,res)=>{
//   console.log(req.query)
//   res.send("admin")
// })

// app.use("/admin",admin)

// app.get("/user/:id",(req,res)=>{
//   console.log(req.query)
//   res.send("hello word ")
// })


//req.body

// app.use(express.json())
// admin.get('/dashboard/:id',(req,res)=>{
//   console.log(req.params)
//   res.send("admin")
// })
// app.use("/admin",admin)

// app.get("/user/:id",(req,res)=>{
//   console.log(req.params)
//   res.send("hello word ")
// })

// app.post('/user/',(req,res)=>{
//   console.log(req.body)
//   res.send("hello post method");
// })


//req cookies

// const cookieParser=require('cookie-parser')
// app.use(cookieParser())
// app.get('/user/:1',(req,res)=>{
//   console.log(req.cookies)
//   res.send("hello post method");
// })



//req secure
// app.get('/user/:1',(req,res)=>{
//   console.log(req.secure)
//   res.send("hello post method");
// })

//req.route
// app.get('/user/',(req,res)=>{
//   console.log(req.route)
//   res.send("hello get method");
// })

// app.post('/user/',(req,res)=>{
//   console.log(req.route)
//   res.send("hello post method");
// })

//req.app
// const handle=require('./handle')
// app.get('/user/:id',handle)

// app.get('/user/',(req,res)=>{
//   console.log(req.query)
//   res.send("hello get method");
// })


// request methods

//req.accepts()

// app.get('/user/',(req,res)=>{
//   console.log(req.accepts('html'))
//   res.send("hello get method");
// })


app.get('/user/',(req,res)=>{
  // console.log(req.get('content-type'))
  // console.log(req.get('accept'))
  console.log(req.is('html'))
  console.log(req.is('json'))
  res.send("hello get method");
})

app.listen(3000,()=>{
  console.log('listening on port 3000')
})

