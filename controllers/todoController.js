const { error } = require("console");
const Todo = require("../models/todoSchema");

// get all the  todos
const getAllTodos = async (req, res) => {};

// get a single todo
const getSingleTodo = async (req, res) => {};

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
    // findByIdUpdate()
    // insertMany()
  const data=  await Todo.findByIdUpdate(req.body)
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
    await Todo.updateOne({_id:req.params.id},
     {$set:{
      status:"active"
     }} )
     res.status(200).json({
      message: "Todo was update successfully",
    });
  }catch(error){
    res.status(500).json({
      error: "There was a server side error",
    });
  }
};

const deleteTodo = async (req, res) => {};

module.exports = {
  getAllTodos,
  getSingleTodo,
  addSingeTodo,
  addMultipleTodo,
  updateTodo,
  deleteTodo,
};
