// import React, { useState, useEffect } from 'react';

// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// const View = () => {
//     const [employee, setEmployee] = useState([]);
//     const [depLoading, setDepLoading] = useState(true);
//     const { id } = useParams();
//     useEffect(() => {
//         const fetchEmployees = async () => {
//             setDepLoading(true);
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
//                     headers: {
//                         "Authorization": `Bearer ${localStorage.getItem('token')}`
//                     }
//                 });
//                 if (response.data.success) {
//                     console.log(response.data);  
//                     setEmployee(response.data.employees)

//                 }
//             } catch (error) {
//                 if (error.response && !error.response.data.success) {
//                     console.log("View From Employee =", employee);
//                     console.log(error.response.data.error);

//                 }
//             }
//         }
//         fetchEmployees();
//     }, [id])
//     return (
//         <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
//             <h2 className='text-2xl font-bold mb-8 text-center'>
//                 Employee Details
//             </h2>
//             <div className='flex justify-center mb-8'>
//                 <img
//                     src={`http://localhost:5000/${employee.userId?.profileImage}`}
//                     alt='Employee Profile'
//                     className='rounded-full border w-40 h-40 object-cover'
//                 />
//             </div>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//                 <div className='space-y-4'>
//                     <InfoRow label="Name" value={employee.userId?.name} />
//                     <InfoRow label="Employee ID" value={employee.employeeId} />
//                     <InfoRow label="Date of Birth" value={new Date(employee.dob).toLocaleDateString()} />
//                     <InfoRow label="Gender" value={employee.gender} />
//                 </div>
//                 <div className='space-y-4'>
//                     <InfoRow label="Department" value={employee.department?.dep_name} />
//                     <InfoRow label="Designation" value={employee.designation} />
//                     <InfoRow label="Salary" value={`₹ ${employee.salary}`} />
//                     <InfoRow label="Marital Status" value={employee.maritalStatus} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// const InfoRow = ({ label, value }) => (
//     <div className='flex space-x-3'>
//         <p className='text-lg font-bold'>{label}:</p>
//         <p className='font-medium'>{value || 'N/A'}</p>
//     </div>
// );

// export default View;


import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const View = () => {
    const [employee, setEmployee] = useState([]);
    const [depLoading, setDepLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchEmployees = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    // Access the first employee from the employees array
                    console.log(response.data.employees);
                    setEmployee(response.data.employees[0]);
                }

            } catch (error) {
                console.log("Error fetching employee data:", error.response?.data?.error || error.message);
            } finally {
                setDepLoading(false);
            }
        };

        fetchEmployees();
    }, [id]);

    if (depLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-8 text-center'>
                Employee Details
            </h2>
            <div className='flex justify-center mb-8'>
                <img
                    src={`http://localhost:5000/${employee.userId?.profileImage}`}
                    alt='Employee Profile'
                    className='rounded-full border w-40 h-40 object-cover'
                />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 ms-5'>
                <div className='space-y-1'>
                    <InfoRow label="Name" value={employee.userId?.name} />
                    <InfoRow label="Employee ID" value={employee.employeeId} />
                    <InfoRow label="Date of Birth" value={employee.dob ? new Date(employee.dob).toLocaleDateString() : 'N/A'} />
                    <InfoRow label="Gender" value={employee.gender} />
                </div>
                <div className='space-y-1'>
                    <InfoRow label="Department" value={employee.department?.dep_name || 'N/A'} />
                    <InfoRow label="Designation" value={employee.designation || 'N/A'} />
                    {/* <InfoRow label="Description" value={employee.department?.description || 'N/A'} /> */}
                    <InfoRow label="Salary" value={`₹ ${employee.salary}`} />
                    <InfoRow label="Marital Status" value={employee.maritalStatus ? employee.maritalStatus : 'N/A'} />
                </div>
            </div>
           <div className='ms-5 mt-4 w-60'>
           <Link to="/admin-dashboard/employee"
                className="flex bg-teal-700 text-white px-4 text-center justify-center py-2 no-underline rounded-md">
                Back
            </Link>
           </div>
        </div>
    );
};

const InfoRow = ({ label, value }) => (
    <div className='flex space-x-3'>
        <p className='text-lg font-bold'>{label}:</p>
        <p className='font-medium'>{value || 'N/A'}</p>
    </div>
);

export default View;
