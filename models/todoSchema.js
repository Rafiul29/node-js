const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//custom instance
todoSchema.methods={
  findActive:function(){
    return mongoose.model("Todo").find({status:"active"})
  },
  findActiveCallback:function(cb){
    return mongoose.model("Todo").find({status:"active"},cb)
  }
}
//static method
todoSchema.statics={
  findByJs:function(){
    this.find({title: /raf/ig})
  }
}

//query helpers
todoSchema.query={
  byLanguage:function(language){
      return this.find({title: new RegExp(language,"i")})
  }
}

module.exports=mongoose.model("Todo",todoSchema)
