import React, { useEffect, useState } from 'react';
import { fetchDepartments, getDEmployees } from '../../utils/EmployeeHelper';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
    const [employee, setEmployee] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deducation: 0,
        payDate: null,
    });
    const [departments, setDepartments] = useState([]);
    const [salary, setSalary] = useState([]);
    const navigate = useNavigate();
    // const { id } = useParams();

    // Fetch departments
    useEffect(() => {
        const getDepartment = async () => {
            const department = await fetchDepartments();
            setDepartments(department);
        };
        getDepartment();
    }, []);

    // Fetch employee data
    // useEffect(() => {
    //     const fetchEmployees = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
    //                 headers: {
    //                     "Authorization": `Bearer ${localStorage.getItem('token')}`
    //                 }
    //             });

    //             if (response.data.success) {
    //                 // Access the first employee from the employees array
    //                 const empData = response.data.employees[0];
    //                 setEmployee({
    //                     name: empData.userId?.name || '',
    //                     maritalStatus: empData.maritalStatus || '',
    //                     designation: empData.designation || '',
    //                     salary: empData.salary || '',
    //                     department: empData.department?._id || ''
    //                 });
    //             }

    //         } catch (error) {
    //             console.log("Error fetching employee data:", error.response?.data?.error || error.message);
    //         }
    //     };

    //     fetchEmployees();
    // }, [id]);

    const handleDepartment = async (e) => {
        const emps = getDEmployees(e.target.value)
        setSalary(emps);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        debugger;
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:5000/api/salary/add/`,
                salary,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.data.success) {
                alert(response.data.message);
                navigate('/admin-dashboard/employee');
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    };

    return (
        <>{departments && employee ? (
            <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
                <h2 className='text-2xl font-bold mb-4'>Add Salary</h2>
                <div className='mt-4'>
                    <Link to='/admin-dashboard/employee'
                        className="w-full bg-teal-700 text-white px-4 py-2 no-underline rounded-md">Go Back</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className=' mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* Department */}
                        <div>
                            <label htmlFor='department' className='block text-sm font-medium text-gray-700'>
                                Department
                            </label>
                            <select
                                name="department"
                                className='w-full'
                                onChange={handleDepartment}
                                required
                            >
                                <option value="">Select Department</option>
                                {departments.map((dep) => (
                                    <option key={dep._id} value={dep._id}>
                                        {dep.dep_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Employee */}
                        <div>
                            <label htmlFor='employeeId' className='block text-sm font-medium text-gray-700'>
                                Employee
                            </label>
                            <select
                                name="employeeId"
                                className='w-full'
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Employee</option>
                                {salary.map((emp) => (
                                    <option key={emp._id} value={emp._id}>
                                        {emp.dep_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor='basicSalary' className='block text-sm font-medium text-gray-700'>
                                Basic Salary
                            </label>
                            <input
                                type="number"
                                className='w-full'
                                name="basicSalary"
                                placeholder="Salary"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='allowances' className='block text-sm font-medium text-gray-700'>
                                Allowances
                            </label>
                            <input
                                type="number"
                                className='w-full'
                                name="allowances"
                                placeholder="allowances"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='deducation' className='block text-sm font-medium text-gray-700'>
                                Deducation
                            </label>
                            <input
                                type="number"
                                className='w-full'
                                name="deducation"
                                placeholder="deducation"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='payDate' className='block text-sm font-medium text-gray-700'>
                                Pay Date
                            </label>
                            <input
                                type="number"
                                className='w-full'
                                name="payDate"
                                placeholder="DD/MM/YYYY"
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>
                    <div>
                        <button type="submit" className="w-full mt-6 mb-4 bg-teal-700 text-white px-4 py-2 rounded-md">
                            Update Employee
                        </button>
                    </div>
                </form>
            </div>
        ) : <div>Loading...</div>}</>
    );
};

export default Add;