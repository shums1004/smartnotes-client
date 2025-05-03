import {create} from 'zustand';

const useAuth = create((set) => ({
    isLoggedIn: !!localStorage.getItem('token'),
    username:null,
  
    login: (token, username) => {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      set({ isLoggedIn: true });
      set({ username: username });
    },


  
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      set({ isLoggedIn: false });
    }
  }));

export default useAuth;