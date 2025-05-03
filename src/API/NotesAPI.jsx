
const BASE_URL = import.meta.env.VITE_API_URL;


export const getNotes = async (query, page, limit) => {
    
    const response = await fetch(`${BASE_URL}/api/getnotes?search=${query}&page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    const data = await response.json();
    
    return data;
  }
  
  export const createNote = async (title, content, tags) => {
    
    
    const response = await fetch(`${BASE_URL}/api/createnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ title, content, tags }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create note');
    }
  
    return await response.json();
  }

export const updateNote = async (id, note) => {
    
    
    const response = await fetch(`${BASE_URL}/api/editnote/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({note}),
    });

    if (!response.ok) {
    throw new Error('Failed to update note');
    }

    return await response.json();
}

export const deleteNote = async (id) => {
    // const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/api/deletenote/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include'
    });

    if (!response.ok) {
    throw new Error('Failed to delete note');
    }

    return await response.json();
}
export const getNote = async (id) => {
    
    const response = await fetch(`${BASE_URL}/api/getnote/${id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include'
    });

    if (!response.ok) {
    throw new Error('Failed to fetch note');
    }

    return await response.json();
}