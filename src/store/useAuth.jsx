import {create} from 'zustand';

const useAuth = create((set) => ({
    isLoggedIn: false,
    username:null,
    loading: true,
  
    login: ( username) => {
      set({ username, isLoggedIn: true, loading:false});
    },
  
    logout: () => {
      set({username:null});
      set({ isLoggedIn: false, loading: false });
    },

    finishLoading: () => set({loading : false}),
  }));

export default useAuth;