const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fname: {
      type: String,
      
    },
    mname: {
      type: String,
      required: false,
    },
    lname: {
      type: String,
      
      trim: true,

    },
    lpurpose: {
      type: String,
      
      trim: true,
    },
    city: {
      type: String,
      
      trim: true,
    },
    zip: {
      type: Number,
      
      trim: true,
    },
    statess: {
      type: String,
      trim: true,
    },
    lamount: {
      type: Number,
      

      trim: true,
    },
    dob: {
      type: Date,
      
      trim: true,
    },
    email: {
      type: String,
      
      trim: true,
      unique: true,
    },
    hphone: {
      type: String,
      
      trim: true,
      unique: true,
    },
    mphone: {
      type: String,
      
      trim: true,
      unique: true,
    },
    ssn: {
      type: String,
      
      trim: true,
      unique: true,
    },
    sa1: {
      type: String,
    },
    sa2: {
      type: String,
      required: false,
    },
    rd: {
      type: Date,
      

      trim: true,
    },
    rt: {
      type: String,
      
    },
    status: {
      type: String,
      default:'Pending'
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
