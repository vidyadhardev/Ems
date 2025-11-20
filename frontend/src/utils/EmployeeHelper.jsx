import axios from 'axios';
import { Form, useNavigate } from 'react-router-dom';

// export const EmplyeeButtons = ({id }) => {
//     const navigate = useNavigate();
//     return (
//         <div className="flex space-x-3 font-bold">
//             <button
//                 className="px-3 py-1 bg-green-500 rounded-sm"
//                 onClick={() => navigate(`/admin-dashboard/employee/${id}`)}
//             >
//                 View
//             </button>
//             <button
//                 className="px-3 py-1 bg-blue-500 rounded-sm"
//             >
//                 Edit
//             </button>
//             <button
//                 className="px-3 py-1 bg-yellow-500 rounded-sm"
//             >
//                 Salary
//             </button>
//             <button
//                 className="px-3 py-1 bg-red-500 rounded-sm"
//             >
//                 Leave
//             </button>

//         </div>
//     )
// }

export const EmplyeeButtons = ({ id }) => {
    const navigate = useNavigate();

    return (
        <div className="flex space-x-8 font-bold">
            <button
                className="px-3 py-1 bg-green-500 rounded-sm"
                onClick={() => navigate(`/admin-dashboard/employee/${id}`)}
            >
                View
            </button>
            <button
                className="px-3 py-1 bg-blue-500 rounded-sm"
                onClick={() => navigate(`/admin-dashboard/employee/edit/${id}`)}
            >
                Edit
            </button>
            <button
                className="px-3 py-1 bg-yellow-500 rounded-sm"
                onClick={() => navigate(`/admin-dashboard/employee/salary/${id}`)}
            >
                Salary
            </button>
            <button
                className="px-3 py-1 bg-red-500 rounded-sm"
                onClick={() => navigate(`/admin-dashboard/employee/leave/${id}`)}
            >
                Leave
            </button>
        </div>
    );
};

export const columns = [
    {
        name: "Sr No.",
        selector: (row) => row.sno,
        width: "90px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "200px"
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "110px"
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        sortable: true,
        width: "200px"
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        width: "120px"
    },
    // {
    //     name: "Marital Status",
    //     selector: (row) => row.maritalStatus,
    //     width: "140px"
    // },
    {
        name: "Action",
        cell: (row) => <EmplyeeButtons id={row._id} />,
        center: "true"
    },


]

export const fetchDepartments = async () => {
    let departments
    try {
        const response = await axios.get('http://localhost:5000/api/department', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.data.success) {
            departments = response.data.departments
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error)
            console.log(error.response.data.error);


        }
    }
    return departments;
};
//  Employees For Salary Form
export const getDEmployees = async () => {
    let employees
    try {
        const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.data.success) {
            employees = response.data.employees
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error)
            console.log(error.response.data.error);


        }
    }
    return employees;
};
