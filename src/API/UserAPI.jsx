import useAuth from "../store/useAuth";


const BASE_URL = import.meta.env.VITE_API_URL;




export const signin = async (email, password) => {

 const res =  await fetch(`${BASE_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }
  const data = await res.json();
  const {login} = useAuth.getState();
  login(data.token, data.username);
  
  return data;
  
}

export const signup = async (username, email, password) => {
  const response = await fetch(`${BASE_URL}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    throw new Error('Signup failed');
  }

  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
}

