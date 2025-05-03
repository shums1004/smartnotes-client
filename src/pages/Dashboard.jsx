import { useEffect, useState } from 'react';
import useNotes from '../store/notesStore.jsx';
import useAuth from '../store/useAuth.jsx';
import { getNotes } from '../API/NotesAPI.jsx';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../API/UserAPI.jsx';

export default function Dashboard() {
  const { notes, setNotes } = useNotes();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { username, loading, isLoggedIn } = useAuth();

  const navigate = useNavigate();
  

  const fetchNotes = async () => {
    try {
      const res = await getNotes(query, page, 6); 
      setNotes(res.notes);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    }
  };

  const handleSelectNote = async (id) => {
    try {
        navigate(`/notes/${id}`);
    } catch (err) {
      console.error('Failed to load note:', err);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
        await fetchUser(); // wait for it to complete
      }
    checkAuth();
  }, []);

  useEffect(() => {
    const getNotes = async() => {
    if (!loading && isLoggedIn) {
      await fetchNotes();
    }
  }
  getNotes();
  }, [query, page, loading, isLoggedIn]);

  if(loading){
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!isLoggedIn) {
    return <div className="p-6 text-center">Unauthorized. Please log in.</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">

      
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700"> {username}'s Notes</h1>
        <button
            onClick={() => navigate('/create')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
    {/* <FaPlus className="text-sm" /> */}
    + New Note
  </button>
</div>
      {/* Search Bar */}
      <div className="flex items-center bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 mb-6">
        {/* <FaSearch className="text-gray-500 mr-2" /> */}
        <input
          type="text"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full focus:outline-none bg-transparent"
        />
      </div>

      {/* Notes List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className={`rounded-lg border p-4 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-blue-50`}
            onClick={() => handleSelectNote(note._id)}
          >
            <h2 className="text-lg font-semibold text-gray-800">{note.title}</h2>
            <p className="text-sm text-gray-500">
              {new Date(note.updatedAt).toLocaleDateString()}
            </p>
            <p className="text-sm mt-2 text-gray-700 line-clamp-3">{note.summary}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-between items-center">
        <button
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
