import Employee from "../models/Employee.js";
import User from "../models/Users.js";
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';

// Storage setup for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Add employee function
const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role
        } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "User already exists" });
        }

        if (!password) {
            return res.status(400).json({ success: false, error: "Password is required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage: req.file ? req.file.filename : ""
        });

        const savedUser = await newUser.save();

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        });

        await newEmployee.save();
        return res.status(200).json({ success: true, message: "Employee created successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "Server error while adding employee" });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('userId', { password: 0 }).populate('department') 
        // console.log("Controller ",employees);
        return res.status(200).json({ success: true, employees, message: "employee added." })
    } catch (error) {
        return res.status(500).json({ success: false, error: "get employee server error !" })
    }
}
// Method Use for Employee Profile Views Page In frontend
const getEmployee=async(req,res)=>{
    const {id}=req.params;
    try {
        const employees = await Employee.find({_id:id}).populate('userId', { password: 0 }).populate('department') 
        //  console.log("Views ",employees);
        return res.status(200).json({ success: true, employees, message: "employee added." })
    } catch (error) {
        return res.status(500).json({ success: false, error: "get employee view server error !" })
    }
}

export { addEmployee, upload, getEmployees,getEmployee };
