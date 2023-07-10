const express = require("express");

const app = express();

// const myMiddleWare=(req,res,next)=>{
//       console.log("I am logging 1")
//       next()
// }

// app.use(myMiddleWare)

// application level middleware
// const logger=(req,res,next)=>{
//   console.log(`${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol} - ${req.ip}`)
//   next()
// }

// app.use(logger)
// app.get('/about',(req,res)=>{
//   res.send("About");
//   res.end()
// })

// router level middleware

// const adminRouter=express.Router();

// const logger=(req,res,next)=>{
//   console.log(`${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol} - ${req.ip}`)
//   next()
// }

// adminRouter.use(logger)
// adminRouter.get('/dashboard',(req,res)=>{
//   res.send("Dashboard")
// })

// app.use("/admin",adminRouter)

// app.get('/about',(req,res)=>{
//   res.send("About");
//   res.end()
// })

// third party middleWare.
// const cookieParser=require('cookie-parser');
// app.use(cookieParser())

// app.get('/about',(req,res)=>{
//   res.send("About");
//   res.end()
// })

//error handling middleware

const adminRouter = express.Router();

// const logger = (req, res, next) => {
//   console.log(
//     `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${
//       req.originalUrl
//     } - ${req.protocol} - ${req.ip}`
//   );
//   // throw new Error("this is an error");
//   next()
// };

// adminRouter.use(logger);

const loggerWrapper=(options)=>{
    return function(req,res,next){
      if(options.log){
        console.log(
          `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${
            req.originalUrl
          } - ${req.protocol} - ${req.ip}`
        );
        next()
      }else{
        throw new Error("failed to log")
      }
    }
}

adminRouter.use(loggerWrapper({log:false}))

adminRouter.get("/dashboard", (req, res) => {
  res.send("Dashboard");
});

app.use("/admin", adminRouter);

const errorMiddleware = (err, req, res, next) => {
  console.log(err.message);
  res.status(500).send("there was a server side error");
};

adminRouter.use(errorMiddleware);

app.get("/about", (req, res) => {
  res.send("About");
  res.end();
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
