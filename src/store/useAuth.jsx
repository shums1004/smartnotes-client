import {create} from 'zustand';

const useAuth = create((set) => ({
    isLoggedIn: !!localStorage.getItem('token'),
    username:null,
  
    login: ( username) => {
      localStorage.setItem('username', username);
      set({ isLoggedIn: true });
      set({ username: username });
    },


  
    logout: () => {
      localStorage.removeItem('username');
      set({ isLoggedIn: false });
    }
  }));

export default useAuth;