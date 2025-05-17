import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import api from "./config";
import toast from 'react-hot-toast';

export const login = async (credentials, auth_store, setIsLoading, navigate) => {
    setIsLoading(true);

    try {

        const res = await api.post('/auth/login', credentials);

        const { accessToken, refreshToken } = res.data;

        if (!accessToken || !refreshToken) {
            const errorMessage = 'Invalid authentication response from server';
            toast.error(errorMessage);
            throw new Error(errorMessage);
        }

        const CookieOptions = {
            secure: true,
            sameSite: 'strict'
        };

        Cookies.set('accessToken', accessToken, { ...CookieOptions, expires: 15 / (60 * 24) });
        Cookies.set('refreshToken', refreshToken, { ...CookieOptions, expires: 7 });

        const decoded_token = jwtDecode(accessToken);
        if (!decoded_token.user.role || !decoded_token.user.id) {
            const errorMessage = 'Invalid accessToken received from server';
            toast.error(errorMessage);
            throw new Error(errorMessage);
        }

        const { role, id } = decoded_token.user;

        Cookies.set('fullId', id, CookieOptions);

        auth_store.login(role);

        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        role === 'user' ? navigate('/') : navigate('/panel');

    } catch (err) {
        toast.error(err.response?.data?.msg || 'Authentication failed');
        console.error('Login error:', err);
        throw err;
    } finally {
        setIsLoading(false);
    }
};

export const register = async (credentials, auth_store, setIsLoading, navigate) => {
    setIsLoading(true);

    try {
        const res = await api.post('/auth/register', credentials);

        const { accessToken, refreshToken } = res.data;

        if (!accessToken || !refreshToken) {
            const errorMessage = 'Invalid authentication response from server';
            toast.error(errorMessage);
            throw new Error(errorMessage);
        }

        const CookieOptions = {
            secure: true,
            sameSite: 'strict'
        };

        Cookies.set('accessToken', accessToken, { ...CookieOptions, expires: 15 / (60 * 24) });
        Cookies.set('refreshToken', refreshToken, { ...CookieOptions, expires: 7 });

        const decoded_token = jwtDecode(accessToken);
        if (!decoded_token.user.role || !decoded_token.user.id) {
            const errorMessage = 'Invalid accessToken received from server';
            toast.error(errorMessage);
            throw new Error(errorMessage);
        }

        const { role, id } = decoded_token.user;

        Cookies.set('fullId', id, CookieOptions);

        auth_store.login(role);

        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        role === 'user' ? navigate('/') : navigate('/panel');

    } catch (err) {
        toast.error(err.response?.data?.msg || 'Authentication failed');
        console.error('Login error:', err);
        throw err;
    } finally {
        setIsLoading(false);
    }
};

