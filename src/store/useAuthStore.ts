import {create} from 'zustand';

type Store = {
  auth: boolean;
  login: (value: boolean) => void; 
  logout: (value:boolean) => void ;
};


// Create a store instance
export const useLoggedIn = create<Store>((set) => ({
  auth: false,
  login: (value: boolean ) => set(() => ({ auth: value })),
  logout: (value:boolean) => set(()=>({auth:value})),
   
}));



