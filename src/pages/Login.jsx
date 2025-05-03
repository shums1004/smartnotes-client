import useAuth from "../store/useAuth";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import {signin} from "../API/UserAPI.jsx";

export default function Login(){
    const { isLoggedIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        } 
    }, [isLoggedIn, navigate]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateInputs();
        if (validationError) {
        setError(validationError);
        return;
        }
        try {
        await signin(email, password);
        navigate("/");
        } catch (err) {
        setError(err.message);
        }
    };

    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!emailRegex.test(email)) {
            window.alert("Enter a Valid Email Address");
            return "Please enter a valid email address.";
        }
    
        if (password.length < 6) {
            window.alert("Password Should be atleast 6 character long");
            return "Password must be at least 6 characters long.";
        }
    
        return null;
      };
    
    return (
        <div className="items-center justify-center px-4 py-12 flex flex-col gap-10 min-h-screen w-full">
        <h2 className="text-4xl" >Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center justify-center w-full ">
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className= "max-w-[40%] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition " type="submit">Login</button>
        </form>
        <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        </div>
    );
}