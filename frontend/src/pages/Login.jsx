import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post("http://localhost:5000/api/auth/login",
                { email, password});
            // console.log(response);
            if (response.data.success) {
                // alert(response.data.message);
                login(response.data.user)
                console.log(response.data.user);
                
                localStorage.setItem("token", response.data.token);
                if (response.data.user.role == "admin") {
                    navigate('/admin-dashboard');
                }else{
                    navigate('/employee-dashboard')
                }
            }
        } catch (error) {
            // if(error.response.status == 500){
            //     alert(code);
            if (error.response && !error.response.data) {
                setError(error.response.data.success);  // Set the error state
                alert(error.response.data.message);     // Show the alert with the error message
            } else {
                alert(error.response.data.error);
            }
        }
    };

    return (

        <div className='flex flex-col items-center h-screen justify-center 
        bg-gradient-to-b from-indigo-200 from-50% to-indigo-100 to-50% space-y-6'>
            <h2 className=' font-Ga+Maaml text-3xl '>Employee Managment System</h2>
            
            <div className='border shadow p-6 w-96 bg-white rounded-md border-l-rose-900'>
                <h2 className=' text-2xl font-bold mb-4'>
                    Login User
                </h2>
                {error && <p className='text-red-500 mb-4'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className=' mb-4'>
                        <label htmlFor='email'
                            className=' block text-gray-700'>E-mail</label>
                        <input type='email'
                            className='w-full px-3 py-2 border'
                            placeholder='Enter E-Mail'
                            value={email}
                            // required
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'
                            className=' block text-gray-700'
                        >Password</label>
                        <input type='password'
                            className='w-full px-3 py-2 border'
                            placeholder='*******'
                            value={password}
                            required
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </div>
                    <div className='mb-4 flex items-center justify-between'>
                        <label className='inline-flex items-center'>
                            <input type='checkbox' className='form-checkbox' />
                            <span className='ml-2 text-gray-700 '>Remember Me</span>
                        </label>
                        <a href='#' className='text-teal-600'>Forgate Password</a>
                    </div>
                    <div className='mb-4'>
                        <button className='w-full bg-teal-600 py-2 btn btn-outline-success'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AtalAwasiyaData = () => {
//   const [data, setData] = useState(null); // for storing response data
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//         debugger;
//       try {
//         const formDataObj = {
//           LabregNo: "09485598236429"
//         };

//         const response = await axios.post(
//           "http://65.0.224.140:8060/api/AtalAwasiya/GetDataForAtalAwasiya",
//           formDataObj,
//           {
//             headers: {
//               "Content-Type": "application/json", // since you're sending JSON
//               "Authorization": `Bearer` // optional if needed
//             }
//           }
//         );

//         console.log("API Response:", response.data);
//         setData(response.data);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData(); // run on load
//     console.log(fetchData);
    
//   }, []); // empty dependency = run once on mount

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
// console.log(error);

//   return (
//     <div>
//       <h2>Atal Awasiya API Data</h2>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export default AtalAwasiyaData;
