import mongoose from "mongoose";
const departmentSchema = new mongoose.Schema({
    dep_name: { type: String, require: true },
    description: { type: String, require: true },
},
    { timestamps: true });
const Department = mongoose.model("Department", departmentSchema);

export default Department;