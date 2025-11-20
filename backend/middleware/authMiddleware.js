import jwt from "jsonwebtoken";
import User from "../models/Users.js";
const verifyUsers = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(404).json({ success: false, error: "Token Not Provideed !" })
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        if (!decoded) {
            return res.status(404).json({ success: false, error: "Token Not Vailed !" })

        }
        //  check id from authController store user id
        const user = await User.findById({ _id: decoded._id }).select('-password')
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found !" })
        }
        req.user = user
        next();
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            error: "Internal Server Error. Please try again later."
        });


    }
};
export default verifyUsers;