// external imports
const express=require("express")

// internal imports
const {getLogin}=require("../controller/loginController");

const decorateHtmlResponse=require("../middlewares/common/deorateHtmlResponse")

// router
const router=express.Router();

// login router
router.get("/",decorateHtmlResponse("Login"),getLogin)

module.exports=router;