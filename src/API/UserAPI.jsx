import useAuth from "../store/useAuth";

const BASE_URL = import.meta.env.VITE_API_URL;

export const signin = async (email, password) => {
  try{
    const res =  await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
  
    if (!res.ok) {
      throw new Error('Login failed');
    }
    const data = await res.json();
    const {login} = useAuth.getState();
    login(data.username);
    return data;
  } catch(err) {
    console.log(err);
  }
 
  
}

export const signup = async (username, email, password) => {
  try{
    const response = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    const data = await response.json();
    // localStorage.setItem('token', data.token);
    return data;
  } catch (err){
    console.log(err);
  }
}

export const logout = async() => {

  try{
    const response = await fetch(`${BASE_URL}/api/logout`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Logout failed');
      }

      return "Logged Out Succesfully"
  } catch(err){
    console.log(err);
  }
  
};

export const fetchUser = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Not authenticated');
    const data = await res.json();
    const { login } = useAuth.getState();
    login(data.username);
  } catch(err) {
    const { logout } = useAuth.getState();
    logout(); 
    console.log(err);
  } finally{
    const {finishLoading} = useAuth.getState();
    finishLoading();
  }
};