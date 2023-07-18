// external imports
const express =require("express");


// internal imports 
const {getInbox}=require("../controller/inboxController")
const decorateHtmlResponse=require("../middlewares/common/deorateHtmlResponse")

// router

const router=express.Router();


//
router.get('/',decorateHtmlResponse("Inbox"),getInbox) 

module.exports=router