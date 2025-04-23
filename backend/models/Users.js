import mongoose from "mongoose";
// Here Used Mongoose And Created Schema & Export
const UserSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  role: { type: String,enum:["admin","employee"], require: true },
  profileImage: { type: String},
  createAt: { type: Date, default: Date.now },
  updateAt: { type:Date, default:Date.now },

})
const User = mongoose.model("User", UserSchema);
console.log("dbs created .");

export default User;
