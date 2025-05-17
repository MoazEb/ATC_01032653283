import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';


const useAuthStore = create(
    persist(
        (set) => ({
            isAuthenticated: false,
            role: null,

            login: (role) =>
                set({
                    isAuthenticated: true,
                    role,
                }),

            logout: () => {
                set({
                    isAuthenticated: false,
                    role: null,
                }),
                    Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
                Cookies.remove('fullId');
            }
        }),
        {
            name: 'auth-storage',
        }
    )
);

export default useAuthStore;