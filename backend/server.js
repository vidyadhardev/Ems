import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDataBase from './Db/db.js';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import userRegister from "./UserSeed.js"
// Load environment variables
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth',authRouter)
app.use('/api/department',departmentRouter)
app.use('/api/employee',employeeRouter)
userRegister();
connectToDataBase()

app.get('/', (req, res) => {
  res.send('Server is running ...');
});
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});

