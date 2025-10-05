import User from "./models/Users.js";
import bcrypt from "bcrypt";
// import connectToDataBase from "./Db/db.js";
const userRegister = async () => {
  
  try {
    // password encripted by bcrypt
    const hashPassword = await bcrypt.hash("vidya", 10)
    //  Here User imported From Model 
    const newUser = new User({
      name: "Admin",
      email: "vidya@zohomail.com",
      password: hashPassword,
      role: "admin"
    });
    await newUser.save()
  } catch (error) {
    console.log(error);
  }
};
export default userRegister;