const express=require('express');
const {getAllTodos,getSingleTodo,addSingeTodo,addMultipleTodo,updateTodo,deleteTodo,activeTodo,findByJs,queryLanguge}=require('../controllers/todoController')
const checkLogin=require('../middleware/checkLogin')



const router=express.Router();


//get active language
// router.get('/language',queryLanguge)

// router.get('/js',findByJs)
// active todo callback
// router.get("/active-callback",activeTodoCallback)

//active todo
// router.get("/active-no",activeTodo)


//get all the todos
router.get('/',checkLogin, getAllTodos);

// // get a single todos
router.get("/:id",getSingleTodo)

//post  single todo
router.post('/',checkLogin,addSingeTodo)

//post multiple todos
router.post('/all',addMultipleTodo);

//put todo
router.put('/:id',updateTodo);

//delete todo
router.delete("/:id",deleteTodo)

module.exports =router