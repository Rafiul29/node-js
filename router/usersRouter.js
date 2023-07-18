// external imports
const express=require("express");

//internal import 
const {getUsers}=require("../controller/userControler")
const decorateHtmlResponse=require("../middlewares/common/deorateHtmlResponse")


//router
const router=express.Router();

router.get("/",decorateHtmlResponse("Users"),getUsers)

module.exports=router