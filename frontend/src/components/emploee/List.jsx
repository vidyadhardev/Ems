import React from 'react';
import { Link } from 'react-router-dom';
const List = () => {
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
        </div>
    );
}

export default List;
