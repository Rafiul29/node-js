const express=require('express');
const multer=require('multer')
const path=require('path')
const app=express();

// file uploads folder
const UPLOAD_FOLDER="./uploads/"


// define the storage
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,UPLOAD_FOLDER)
  },
  filename:(req,file,cb)=>{
      const fileExt=path.extname(file.originalname)
      const fileName=file.originalname
                          .replace(fileExt,"")
                          .toLowerCase()
                          .split(" ")
                          .join("-")+"-"+Date.now()
    cb(null,fileName+fileExt)
  }
})

// prapre the final multer upload object
var upload =multer({
  // dest:UPLOAD_FOLDER,
  storage:storage,
  limits:{
    fileSize:2000000, //1MB
  },
  fileFilter:(req,file,cb)=>{

    if(file.fieldname==="avatar"){
      if(
        file.mimetype==="image/png" ||
        file.mimetype==="image/jpg" ||
        file.mimetype==="image/jpeg"
       ){
        cb(null,true)
       }else{
        cb(new Error("only .jpg .png or .jpeg format allowed!"))
       }
    }
     if(file.filename==='doc'){
      if(
        file.mimetype==="application/pdf"
       ){
        cb(null,true)
       }else{
        cb(new Error("only .pdf format allowed!"))
       }
    }
  }
})

//application route

//single fine upload
// app.post("/",upload.single("avatar"),(req,res)=>{
//     res.send("hello word ")
//   })
  
// multiple file upload
// app.post("/",upload.array("avatar",3),(req,res)=>{
//   res.send("hello word ")
// })

//multi file upload

// app.post("/",upload.fields([
// {name:"avatar",maxcount:1},
// {name:"gallery",maxcount:2},
// ]),(req,res)=>{
//   res.send("hello word ")
// })

// error handle 
// app.use((err,req,res,next)=>{
//   if(err){
//     if(err instanceof multer.MulterError){
//       res.status(500).send("There was an upload error!")
//     }else{
//       res.status(500).send(err.message)
//     }
//   }else{
//     res.send("success")
//   }
// })


app.post("/",upload.fields([
  {name:"avatar",maxcount:1},
  {name:"doc",maxcount:1},
  ]),(req,res)=>{
    // multiple file
    console.log(req.files)
    
    res.send("hello word ")
  })

app.listen(3000,()=>{
  console.log('listening on port 3000')
})