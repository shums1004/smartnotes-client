import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, updateNote } from '../API/NotesAPI';

export default function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editableNote, setEditableNote] = useState({ title: '', content: '', tags: [] });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await getNote(id);
        setNote(res);
        setEditableNote({ title: res.title, content: res.content, tags: res.tags || [] });
      } catch (err) {
        console.error('Failed to fetch note:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, isEditing]);

  const handleAddTag = () => {
  const trimmed = newTag.trim();
  if (trimmed && !editableNote.tags.includes(trimmed)) {
    setEditableNote({ ...editableNote, tags: [...editableNote.tags, trimmed] });
  }
  setNewTag('');
};

const handleRemoveTag = (tagToRemove) => {
  setEditableNote({
    ...editableNote,
    tags: editableNote.tags.filter((tag) => tag !== tagToRemove),
  });
};

const handleTagKeyDown = (e) => {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    handleAddTag();
  }
};

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await deleteNote(id);
      navigate('/dashboard');
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleSave = async () => {
    try {
      console.log('Saving note:', editableNote);
      const updated = await updateNote(id, editableNote);
      setNote(updated);
      setIsEditing(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleCancel = () => {
    setEditableNote({ title: note.title, content: note.content, tags: note.tags || [] });
    setIsEditing(false);
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        {isEditing ? (
          <input
            type="text"
            value={editableNote.title}
            onChange={(e) => setEditableNote({ ...editableNote, title: e.target.value })}
            className="text-3xl font-bold border-b-2 w-full"
          />
        ) : (
          <h1 className="text-3xl font-bold">{note.title}</h1>
        )}
        <div className="flex gap-2 ml-4">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="bg-green-500 px-4 py-2 rounded text-white">Save</button>
              <button onClick={handleCancel} className="bg-gray-500 px-4 py-2 rounded text-white">Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="bg-blue-600 px-4 py-2 rounded text-white">Edit</button>
              <button onClick={handleDelete} className="bg-orange-500 px-4 py-2 rounded text-white">Delete</button>
            </>
          )}
        </div>
      </div>
      <p className="text-gray-500 text-sm mb-2">
        Last updated: {new Date(note.updatedAt).toLocaleString()}
      </p>

      <div className="mb-4">
        <h3 className="mt-4">Tags:</h3>
        {isEditing ? (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {editableNote.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {tag}
                <button onClick={() => handleRemoveTag(tag)} className="text-blue-500 hover:text-red-500">×</button>
              </span>
            ))}
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Add tag"
              className="border px-2 py-1 rounded"
            />
            <button onClick={handleAddTag} className="bg-blue-500 text-white px-2 py-1 rounded">Add</button>
          </div>
        ) : (
          <div className="flex gap-2 flex-wrap mb-4">
            {note.tags?.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
  </div>
)}
      </div>

      <h3>Summary:</h3>
      <p className="text-gray-600 ml-5 italic">{note.summary}</p>

      <br />
      <h3>Content:</h3>
      {isEditing ? (
        <textarea
          value={editableNote.content}
          onChange={(e) => setEditableNote({ ...editableNote, content: e.target.value })}
          className="w-full p-2 border rounded text-gray-800 whitespace-pre-wrap"
          rows={10}
        />
      ) : (
        <p className="text-gray-800 whitespace-pre-wrap ml-5">{note.content}</p>
      )}
    </div>
  );
}
