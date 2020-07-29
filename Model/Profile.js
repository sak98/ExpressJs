// profile schema using mongoose
//to create schema ......
//install mongoose
//yarn add mongoose
//load mongoose modules
const mongoose = require("mongoose");
// init schema
const schema = mongoose.schema;

//create a new schema instance .....should be an OBJECT

const ProfileSchema = new Schema({
  //blueprint of the database ie:- schema
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phone: { type: String, required: true },
  data: {
    type: Date,
    default: Date.now,
  },
});

//export  schema
