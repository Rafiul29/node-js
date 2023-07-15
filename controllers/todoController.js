const Todo = require("../models/todoSchema");

// get all the  todos
const getAllTodos = async (req, res) => {
  try{
    const alldata=  await Todo.find({status:"active"})
    .select({ _id:0, __v:0, date:0 })
    .limit(5)
    .sort({ createdAt: -1 });
    res.status(200).json({
      result:alldata,
      message: "Todos were inserted successfully",
    });
  }catch(error){
    res.status(500).json({
      error: "There was a server side error",
    });
  }
};

// get a single todo
const getSingleTodo = async (req, res) => { 
  try{
    const {id}=req.params
    const singledata=  await Todo.find({_id:id});
    res.status(200).json({
      result:singledata,
      message: "Todos were inserted successfully",
    });
  }catch(error){
    res.status(500).json({
      error: "There was a server side error",
    });
  }
};

//add single todo
const addSingeTodo = async (req, res) => {
  //const newTodo = new Todo(req.body);
  // const todo=await Todo.create(newTodo)
  try{
    // await newTodo.save();
    await Todo.create(req.body)
    res.status(200).json({
      message: "Todos were inserted successfully",
    });
  }catch(error){
    res.status(500).json({
      error: "There was a server side error",
    });
  }
};

//add multiple todos
const addMultipleTodo = async (req, res) => {
  try{
  const data=  await Todo.insertMany(req.body)
    res.status(201).json({
      message: "Todo was inserted successfully",
    });
    res.status(200).json(data)
  }catch(error){
    res.status(500).json({
      error: "There was a server side error",
    });
  }
};

//put todo
const updateTodo = async (req, res) => {
  try{
       // findByIdUpdate()  response dei 
    await Todo.updateOne({_id:req.params.id},
     {$set:{
      status:"active"
     }},{new:true})
     res.status(200).json({
      message: "Todo was update successfully",
    });
  }catch(error){
    res.status(500).json({
      error: "There was a server side error",
    });
  }
};

const deleteTodo = async (req, res) => {
  try{
    //deleteOne
 const result= await Todo.findByIdAndDelete({_id:req.params.id})
    res.status(200).json({
      result,
      message: "Todos were deleted successfully",
    });
  }catch(error){
    res.status(500).json({
      error: "There was a server side error",
    });
  }
};

module.exports = {
  getAllTodos,
  getSingleTodo,
  addSingeTodo,
  addMultipleTodo,
  updateTodo,
  deleteTodo,
};
