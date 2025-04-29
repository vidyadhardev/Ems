import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus: '',
        designation: '',
        salary: '',
        department: '',
    });
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch departments
    useEffect(() => {
        const getDepartment = async () => {
            const department = await fetchDepartments();
            setDepartments(department);
        };
        getDepartment();
    }, []);

    // Fetch employee data
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    // Access the first employee from the employees array
                    const empData = response.data.employees[0];
                    setEmployee({
                        name: empData.userId?.name || '',
                        maritalStatus: empData.maritalStatus || '',
                        designation: empData.designation || '',
                        salary: empData.salary || '',
                        department: empData.department?._id || ''
                    });
                }

            } catch (error) {
                console.log("Error fetching employee data:", error.response?.data?.error || error.message);
            }
        };

        fetchEmployees();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:5000/api/employee/${id}`,
                employee,
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
                <h2 className='text-2xl font-bold mb-4'>Edit Employee</h2>
                <div className='mt-4'>
                    <Link to='/admin-dashboard/employee'
                        className="w-full bg-teal-700 text-white px-4 py-2 no-underline rounded-md">Go Back</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className=' mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className='w-full'
                                placeholder="Enter Name"
                                value={employee.name}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div>
                            <label htmlFor='maritalStatus' className='block text-sm font-medium text-gray-700'>
                                Marital Status
                            </label>
                            <select 
                                name="maritalStatus"
                                className='w-full'
                                onChange={handleChange}
                                required
                                value={employee.maritalStatus}
                            >
                                <option value="">Select Marital Status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor='designation' className='block text-sm font-medium text-gray-700'>
                                Designation
                            </label>
                            <input
                                type="text"
                                className='w-full'
                                name="designation"
                                placeholder="Designation"
                                value={employee.designation}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='salary' className='block text-sm font-medium text-gray-700'>
                                Salary
                            </label>
                            <input 
                                type="number"
                                className='w-full'
                                name="salary"
                                placeholder="Salary"
                                value={employee.salary}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-span-2'>
                            <label htmlFor='department' className='block text-sm font-medium text-gray-700'>
                                Department
                            </label>
                            <select
                                name="department"
                                className='w-full'
                                onChange={handleChange}
                                required
                                value={employee.department}
                            >
                                <option value="">Select Department</option>
                                {departments.map((dep) => (
                                    <option key={dep._id} value={dep._id}>
                                        {dep.dep_name}
                                    </option>
                                ))}
                            </select>
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

export default Edit;