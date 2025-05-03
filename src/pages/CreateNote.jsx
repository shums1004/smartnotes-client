import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNote } from '../API/NotesAPI.jsx';
import useNotes from '../store/notesStore.jsx';

export default function CreateNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addNote } = useNotes();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() && !content.trim()) {
      return setError('Title and content are required.');
    }

    const tagArray = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    try {
      const note = await createNote( title, content, tagArray);
      addNote(note); // add to Zustand store
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to create note');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Create New Note</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-3 rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="w-full border p-3 rounded-md h-40 resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          className="w-full border p-3 rounded-md"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold transition"
        >
          Create Note
        </button>
      </form>
    </div>
  );
}
