import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../store/useAuth.jsx';
import logo from '../assets/Logo.png'; // Adjust the path to your logo image


export default function NavBar() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const handleLogout = () => {
    useAuth.getState().logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-gray-800">
         <img src= {logo} alt="Logo" className="h-[7vh] w-[8vw] " />
      </Link>

      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 font-medium bg-gradient-to-br from-purple-500 via-blue-300 to-white m-2 px-4 py-2 rounded-md transition"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-br from-white-500 via-red-200 to-red-600 hover:bg-red-600 text-black px-4 py-2 rounded-md font-medium transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
