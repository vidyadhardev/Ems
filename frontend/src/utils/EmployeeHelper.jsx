import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const columns = [
    {
        name: "Sr No.",
        selector: (row) => row.sno,
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true
    },
    {
        name: "Image",
        selector: (row) => row.profileImage
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "DOB",
        selector: (row) => row.dob
    },
    {
        name: "Action",
        selector: (row) => row.action
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
        }
    }
    return departments;
};

export const EmplyeeButtons = ({ _id }) => {
    const navigate = useNavigate();
    return (
        <div className="flex space-x-3 font-bold">
            <button
                className="px-3 py-1 bg-green-500 rounded-sm"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >
                View
            </button>
            <button
                className="px-3 py-1 bg-blue-500 rounded-sm"
            >
                Edit
            </button>
            <button
                className="px-3 py-1 bg-yellow-500 rounded-sm"
            >
                Salary
            </button>
            <button
                className="px-3 py-1 bg-red-500 rounded-sm"
            >
                Leave
            </button>

        </div>
    )
}