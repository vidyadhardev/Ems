import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditDepartments = () => {
    const { id } = useParams();
    const [departments, setDepartment] = useState([]);
    const [depLoading, setDepLoading] = useState(true);

    useEffect(() => {
        const isConfirmedEdit = window.confirm("Are you sure you want to edit this record?");
        if (isConfirmedEdit) {
            const fetchDepartments = async () => {
                setDepLoading(true);
                try {
                    const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    if (response.data.success) {
                        setDepartment(response.data.departments)
                    }

                } catch (error) {
                    if (error.response && !error.response.data.success) {
                        alert(error.response.data.error)
                    }
                } finally {
                    setDepLoading(false);
                }
            }
            fetchDepartments();
        }

    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...departments, [name]: value })
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/api/department/${id}`, departments, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                navigate('/admin-dashboard/departments')
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }
    return (
        <>{depLoading ? <div>Loading ...</div> :
            <div className='max-w-3xl  mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96 '>
                <div className='font-bold mb-6'>
                    <h3> Edit Department</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor='dep_name'
                                className='text-sm font-medium text-gray-700'
                            >
                                Department Name
                            </label>
                            <input
                                type='text'
                                placeholder=' Enter Dep Name'
                                name='dep_name'
                                required
                                onChange={handleChange}
                                value={departments.dep_name}
                                className='mt-1 w-full p-2 font-medium border border-gray-300 rounded-md'
                            />
                        </div>
                        <div className='mt-3'>
                            <label
                                htmlFor='description'
                                className='block text-gray-700'
                            >
                                Description
                            </label>
                            <textarea
                                name='description'
                                onChange={handleChange}
                                placeholder='enter Description'
                                rows={4}
                                value={departments.description}
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            >
                            </textarea>
                        </div>
                        <button
                            type='submit'
                            className='w-full mt-6 bg-teal-700 text-white font-bold py-2 px-4 rounded-md'
                        >Submit</button>
                    </form>
                </div>
            </div>
        }</>
    );
}

export default EditDepartments;
