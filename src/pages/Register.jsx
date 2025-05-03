
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {signup} from '../API/UserAPI.jsx';

export default function Register(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
        await signup(username, email, password);
        navigate('/login');
        window.alert('Registration successful! Please log in.');
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed');
        console.error('Registration error:', error);
      }
    };
    return (
        <div className = 'items-center justify-center px-4 py-12 flex flex-col gap-10 min-h-screen w-full'>
            <h1 className='text-4xl'>Register</h1>

            <form onSubmit={handleSignup} className = 'flex flex-col gap-4 items-center justify-center w-full'>
                <input onChange={(e) => setUsername(e.target.value)}  type="text" placeholder="Username"  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <input  onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input  onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="submit" className= "max-w-[40%] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition ">Register</button>
            </form>
        </div>
    );
}