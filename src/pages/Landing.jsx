import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center px-4 py-8 min-h-screen w-full">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">
          Smart Notes
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10">
          Write freely. Let AI handle summarizing and tagging your notes. Stay organized and efficient.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-white border border-blue-600 text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
