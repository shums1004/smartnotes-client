import useAuth from "../store/useAuth";
const BaseUrl = 'http://localhost:5000/api';

export const signin = async (email, password) => {
 const res =  await fetch(`${BaseUrl}/login`, {
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
  console.log(data);
  const {login} = useAuth.getState();
  login(data.token, data.username);
  
  return data;
  
}

export const signup = async (username, email, password) => {
  const response = await fetch(`${BaseUrl}/register`, {
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

