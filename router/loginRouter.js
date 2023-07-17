// internal imports
const express=require("express")

// external imports
const {getLogin}=require("../controller/loginController");
const { model, models } = require("mongoose");

// router
const router=express.Router();


// login router
router.get("/",getLogin)



module.exports=router;