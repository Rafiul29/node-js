const express=require('express');
const {signup,login,getAllUsers}=require('../controllers/userController')
const router=express.Router()


//signup route
router.post("/signup",signup)

// login route
router.post('/login',login)

// get all users
router.get('/all',getAllUsers)
module.exports=router;