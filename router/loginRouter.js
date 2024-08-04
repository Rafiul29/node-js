// external imports
const express=require("express")

// internal imports
const {getLogin,login, logout}=require("../controller/loginController");

const decorateHtmlResponse=require("../middlewares/common/deorateHtmlResponse");
const { doLoginValidators, doLoginValidationHandler } = require("../middlewares/login/loginValidate");

// set page title
const page_title="Login"
// router
const router=express.Router();

// login router
router.get("/",decorateHtmlResponse(page_title),getLogin)

router.post('/',decorateHtmlResponse(page_title),doLoginValidators,doLoginValidationHandler,login)

router.delete("/", logout);

module.exports=router;