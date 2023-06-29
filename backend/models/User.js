import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  phoneNumber: { type: String, required: true, unique: true },
  name: { type: String },
  email:{type:String},
  verificationCode :{type:String},
  verificationDate:{type:Date},
  refreshToken:[String],
   
},{timestamps : true});


const User = mongoose.model("User",userSchema)

export default User;