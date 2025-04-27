import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { columns, EmplyeeButtons } from '../../utils/EmployeeHelper.jsx';
import DataTable from 'react-data-table-component';
import axios from 'axios';
const List = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/employee', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.employees.map((emp) => ({
                        _id: emp._id,
                        sno: sno++,
                        dep_name: emp.department.dep_name ? emp.department.dep_name.toLowerCase()
                            .split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ') : "Not Assigned",
                        name: emp.userId.name,
                        dob: new Date(emp.dob).toLocaleDateString(),
                        profileImage: <img src={`http://localhost:5000/${emp.userId.profileImage}`} className='w-12 h-12 rounded-full object-cover' />,
                        action: (<EmplyeeButtons Id={emp._id} />),
                    }));

                    setEmployees(data);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error, "Error")
                }
            } finally {
                setEmpLoading(false);
            }
        }
        fetchEmployees();
    }, [])

    return (
        <div className='p-3'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'> Manage Employee</h3>
            </div>
            <div className='flex justify-between items-center '>
                <input
                    type='text'
                    placeholder='Search By Emp Name'
                    className='px-4 py-0.5 border shadow-xl bg-transparent border-stone-500 text-green-500 rounded-md'
                />
                <Link to='/admin-dashboard/add-employee'
                    className='px-4 py-1 bg-teal-600 text-white no-underline rounded-lg'
                >
                    Add New Employee
                </Link>
            </div>
            <div className='mt-4'>
                <DataTable columns={columns} data={employees} pagination={true} />
            </div>
        </div>
    );
}

export default List;
