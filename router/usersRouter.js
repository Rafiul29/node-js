// external imports
const express=require("express");

//internal import 
const {getUsers,addUser,removeUser}=require("../controller/userControler")
const decorateHtmlResponse=require("../middlewares/common/deorateHtmlResponse")
const avatarUploads=require('../middlewares/users/avatarUploads')
const  {addUserValidators,addUserValidationHandlers}=require("../middlewares/users/usersValidator")

//router
const router=express.Router();

// get all user
router.get("/",decorateHtmlResponse("Users"),getUsers)

// post a new user
router.post('/', avatarUploads, addUserValidators, addUserValidationHandlers, addUser )

// delete a single user
router.delete('/:id',removeUser)


module.exports=router