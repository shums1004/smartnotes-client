import {create} from 'zustand';

const useAuth = create((set) => ({
    isLoggedIn: false,
    username:null,
  
    login: ( username) => {
      set({ isLoggedIn: true });
      set({ username: username });
    },


  
    logout: () => {
      set({username:null});
      set({ isLoggedIn: false });
    }
  }));

export default useAuth;