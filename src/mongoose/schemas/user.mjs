import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username :{
        type : mongoose.Schema.Types.String,
        unique : true,
        required : true
    },
    displayName : mongoose.Schema.Types.String,
    password : {
        type : mongoose.Schema.Types.String,
        required : true
    }
})
  

export const User = mongoose.model("user", UserSchema)