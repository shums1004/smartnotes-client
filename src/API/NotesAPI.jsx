
export const BaseUrl = 'http://localhost:5000/api';


export const getNotes = async (query, page, limit) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BaseUrl}/getnotes?search=${query}&page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    
    return data;
  }
  
  export const createNote = async (title, content, tags) => {
    const token = localStorage.getItem('token');
    console.log(title, content, tags);
    const response = await fetch(`${BaseUrl}/createnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, tags }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create note');
    }
  
    return await response.json();
  }

export const updateNote = async (id, note) => {
    console.log(note);
    const token = localStorage.getItem('token');
    const response = await fetch(`${BaseUrl}/editnote/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,

    },
    body: JSON.stringify({note}),
    });

    if (!response.ok) {
    throw new Error('Failed to update note');
    }

    return await response.json();
}

export const deleteNote = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BaseUrl}/deletenote/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    });

    if (!response.ok) {
    throw new Error('Failed to delete note');
    }

    return await response.json();
}
export const getNote = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BaseUrl}/getnote/${id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    });

    if (!response.ok) {
    throw new Error('Failed to fetch note');
    }

    return await response.json();
}