const express=require('express');

const app=express();

//request propertices
//res.locals
// app.set('view engine', 'ejs')
// app.get("/about",(req,res)=>{
//   res.render('pages/about',{
//     name:"bangladesh"
//   })
// })

//req headers send
// app.set('view engine', 'ejs')
// app.get("/about",(req,res)=>{
//   console.log(res.headersSent)
//   res.render('pages/about',{
//     name:"bangladesh"
//   })
//   console.log(res.headersSent)
// })




//request methods

//res.json()
// app.get("/about",(req,res)=>{
//  res.json({name:"Rafiul"})
// })


//res.status()
// app.get("/about",(req,res)=>{
//   res.status(200);
//   res.end()
//  })
 

// //res.format()
// app.get("/about",(req,res)=>{
// res.format({
//   text: function () {
//     res.send('text')
//   },

//   html: function () {
//     res.send('<p>html</p>')
//   },

//   json: function () {
//     res.send({ message: 'json' })
//   }
// })
//  })

//cookie
// app.get('/about',(req,res)=>{
//   res.cookie('name','es',{
//     maxAge:86400 * 1000,
//     httpOnly:true,
//     secure:true
//   })
//   res.end()
// })



// //res.location()
// app.get('/about',(req,res)=>{
//   res.location('/test')
//   res.end()
// })



//res.redirect()
// app.get('/test',(req,res)=>{
//   res.send("hello ")
// })
// app.get('/about',(req,res)=>{
//   res.redirect('/test')
//   res.end()
// })


//res.set() res.get()

// app.get('/about',(req,res)=>{
//   res.set("platform",'it')
//   console.log(res.get('platform'))
//   res.end()
// })

const handle=require('./handle')
app.get('/about',handle)


 
app.listen(3000,()=>{
  console.log('listening on port 3000')
})