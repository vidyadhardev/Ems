import { useNavigate } from "react-router-dom"
import axios from "axios";
export const columns = [
    {
        name: "Sr No.",
        selector: (row) => row.sno,
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.action
    },
]
export const DepartmentButtons = ({ _id }) => {
    const navigate = useNavigate();
    // <------- Delete Method Create From Frontend----->
    const handleDelete = async (_id, onDepartmentDelete) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this record?");
        if (isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/department/${_id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                debugger;
                if (response.data.success) {
                    // onDepartmentDelete(_id);
                    window.location.reload();
                } else {
                    alert("Failed to delete the record. Please try again later.");
                }

            } catch (error) {
                if (error.response) {
                    alert(error.response.data.error || "An error occurred while deleting.");
                } else {
                    alert("Network or server error. Please try again later.");
                }
            }
        }
    }

    return (
        <div className="flex space-x-3 font-bold">
            <button className="px-3 py-1 bg-teal-500 rounded-sm"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >Edit</button>
            <button className="px-3 py-1 bg-red-500 rounded-sm" onClick={() => handleDelete(_id)}>Delete</button>
        </div>
    )
}
