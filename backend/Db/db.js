import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Successfully Connected.");
  } catch (error) {
    console.error("Error while connecting to database:", error);
  }
};
export default connectToDataBase;
